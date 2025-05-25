const Notification = require("../models/Notificationmodels");

// יצירת התראה חדשה
const createNotification = async (req, res) => {
  try {
    console.log('Notification body:', req.body);
    const { user, call, message } = req.body;
    if ( !call || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newNotification = new Notification({ user, call, message });
    await newNotification.save();

    res.status(201).json({ message: "Notification created", notification: newNotification });
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// עדכון התראה
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Notification.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification updated", notification: updated });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('call user');
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching all notifications:", err);
    res.status(500).json({ error: "Server error" });
  }
}
// מחיקת התראה
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createNotification,
  updateNotification,
  getAllNotifications,
  deleteNotification
};