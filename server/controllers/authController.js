const jwt= require('jsonwebtoken')
const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { firstname, lastname, phone, password,  email,  address,  role } = req.body;
  // בדיקת שדות חובה
  if (!firstname || !lastname || !phone || !password || !email || !address || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // בדיקת ייחודיות למייל או טלפון
  const duplicate = await User.findOne({ email }).lean();
  if (duplicate) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // הצפנת סיסמה
  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = {firstname, lastname, phone, password: hashedPwd, email, address, role };
  try {
    const user = await User.create(userObject);
    return res.status(201).json({ message: `New user ${user.email} created` });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data", error });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({email}).lean()
    if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
}
const match = await bcrypt.compare(password,foundUser.password)
if(!match)return res.status(401).json({ message:'Unauthorized'})

const userInfo= {_id:foundUser._id,name:foundUser.name,
roles:foundUser.roles, username:foundUser.username,
email:foundUser.email}
const accessToken=
jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
res.json({accessToken:accessToken})
};

module.exports = { register, login };
