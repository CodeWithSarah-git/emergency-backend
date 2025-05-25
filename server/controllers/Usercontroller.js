const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, phone, password, email, address, role } = req.body;

    if (!firstname || !lastname || !phone || !password || !email || !role) {
      return res.status(400).json({ message: "required fields missing" });
    }

    const user = new User({ firstname, lastname, phone, password, email, address, role });
    await user.save();

    res.status(201).json({ message: "New user created", user });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 
const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fields = ['firstname', 'lastname', 'phone', 'password', 'email', 'address', 'role'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    user.updatedAt = Date.now();
    await user.save();

    res.json({ message: `'${user.firstname}' updated`, user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


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
