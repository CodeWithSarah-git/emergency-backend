const User = require("../models/User");
const axios = require('axios');


// פונקציית עזר לביצוע גיאוקודינג
async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  const res = await axios.get(url, { headers: { "User-Agent": "emergency-app" } });
  console.log('Geocode response:', res.data);  // הדפסה!
  if (res.data && res.data.length > 0) {
    const { lon, lat } = res.data[0];
    return [parseFloat(lon), parseFloat(lat)];
  }
  return [0, 0];
}

// יצירת משתמש חדש
const createUser = async (req, res) => {
  console.log("createUser called");
  try {
    const {
      firstname, lastname, phone, password,
      email, address, role
    } = req.body;

    console.log("Address to geocode:", address);

    if (!firstname || !lastname || !phone || !password || !email || !role || !address) {
      return res.status(400).json({ message: "required fields missing" });
    }

    const coordinates = await geocodeAddress(address);

    console.log("Coordinates received:", coordinates);

    const user = new User({
      firstname,
      lastname,
      phone,
      password,
      email,
      address,
      role,
      location: {
        type: "Point",
        coordinates: coordinates,
      }
    });

    await user.save();

    res.status(201).json({ message: "New user created", user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// עדכון משתמש קיים
const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fields = ['firstname', 'lastname', 'phone', 'password', 'email', 'address', 'role'];
    let addressWasUpdated = false;

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
        if (field === 'address') addressWasUpdated = true;
      }
    });

    // אם location נשלח - לעדכן גם אותו
    if (req.body.location) {
      user.location = req.body.location;
    } else if (addressWasUpdated && user.address) {
      // אם העדכנת כתובת, בצע גיאוקודינג חדש
      user.location.coordinates = await geocodeAddress(user.address);
    }

    user.updatedAt = Date.now();
    await user.save();

    res.json({ message: `${user.firstname} updated`, user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// מחיקת משתמש
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// הצגת כל המשתמשים
const showUser = async (req, res) => {
  try {
    const users = await User.find().lean();
    if (!users.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  showUser
};