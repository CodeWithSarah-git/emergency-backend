const jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const axios = require('axios');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// פונקציה לגיאוקודינג (תרגום כתובת לקואורדינטות)
async function geocodeAddress(address) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await axios.get(url, { headers: { "User-Agent": "emergency-app" } });
    if (res.data && res.data.length > 0) {
      const { lon, lat } = res.data[0];
      return [parseFloat(lon), parseFloat(lat)];
    }
  } catch (err) {
    console.error("Geocoding error:", err);
  }
  return [0, 0];
}

const register = async (req, res) => {
  const { firstname, lastname, phone, password, email, address, role, adminCode } = req.body;

  if (!firstname || !lastname || !phone || !password || !email || !address || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role === 'admin' && adminCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(403).json({ message: "Invalid admin access code" });
  }

  const duplicate = await User.findOne({ email }).lean();
  if (duplicate) {
    return res.status(409).json({ message: "Email already registered" });
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const coordinates = await geocodeAddress(address);

    const userObject = {
      firstname,
      lastname,
      phone,
      password: hashedPwd,
      email,
      address,
      role,
      location: {
        type: "Point",
        coordinates,
      }
    };

    const user = await User.create(userObject);

    const userInfo = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Registration Successful',
      text: `Hello ${user.firstname},\n\nThank you for registering! Welcome aboard.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Error sending mail:', error);
      else console.log('Email sent: ' + info.response);
    });

    return res.status(201).json({ accessToken, user: userInfo });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await User.findOne({ email }).lean();
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'Unauthorized' });

  const userInfo = {
    _id: foundUser._id,
    email: foundUser.email,
    role: foundUser.role,
  };

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  console.log('accessToken', accessToken);

  res.json({ accessToken, user: userInfo });
};

module.exports = { register, login };