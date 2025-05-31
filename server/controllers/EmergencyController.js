const nodemailer = require("nodemailer");
const EmergencyCall = require("../models/EmergencyCall");
const User = require('../models/User');
// יצירת קריאה חדשה
const createEmergency = async (req, res) => {
  try {
    const { category, description, location, createdBy } = req.body;

    if (!category || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newCall = new EmergencyCall({
      category,
      description,
      location,
      ...(createdBy && { createdBy }), // רק אם יש, תכניס את createdBy
    });

    await newCall.save();

    // מציאת מתנדב קרוב
    const volunteer = await User.findOne({
      role: 'volunteer',
      active: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          $maxDistance: 10000,
        }
      }
    });
    if (!volunteer) {
      //למחוק
  console.log("לא נמצא מתנדב קרוב");
} else {
  console.log("נמצא מתנדב:", volunteer.email);
}

    if (volunteer) {
      newCall.assignedVolunteer = volunteer._id;
      await newCall.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: volunteer.email,
        subject: "התראה על פנייה דחופה",
        text: `שלום ${volunteer.firstname}, יש פנייה דחופה בקרבתך. אנא בדוק את המערכת והגש לעזרה.`,
      });
    }

    res.status(201).json({ message: "New Call created", call: newCall });
  } catch (err) {
    console.error("Error creating Call:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// עדכון קריאה לפי ID
const updateEmergency = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCall = await EmergencyCall.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCall) {
      return res.status(404).json({ message: "Call not found" });
    }

    res.json({ message: "Call updated", call: updatedCall });
  } catch (err) {
    console.error("Error updating Call:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// מחיקת קריאה לפי ID
const deleteEmergency = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EmergencyCall.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Call not found" });
    }

    res.json({ message: "Call deleted" });
  } catch (error) {
    console.error("Error deleting Call:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// שליפת כל הקריאות
const getAllEmergencies = async (req, res) => {
  try {
    const calls = await EmergencyCall.find();

    if (!calls.length) {
      return res.status(404).json({ message: "No calls found" });
    }

    res.json(calls);
  } catch (err) {
    console.error("Error fetching calls:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// שליפת קריאה לפי ID
const getEmergencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const call = await EmergencyCall.findById(id);

    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }

    res.json(call);
  } catch (err) {
    console.error("Error fetching call:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCall = await EmergencyCall.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedCall) return res.status(404).json({ message: 'קריאה לא נמצאה' });

    res.json({ call: updatedCall });
  } catch (error) {
    console.error('שגיאה בעדכון סטטוס:', error);
    res.status(500).json({ message: 'שגיאה בעדכון הסטטוס' });
  }
};

module.exports = {
  createEmergency,
  updateEmergency,
  deleteEmergency,
  getAllEmergencies,
  getEmergencyById,
  updateStatus
};
