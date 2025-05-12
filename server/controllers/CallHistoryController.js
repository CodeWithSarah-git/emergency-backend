const CallHistory = require('../models/CallHistory');

// יצירת רשומת היסטוריה חדשה
const createCallHistory = async (req, res) => {
  try {
    const { user, call, status } = req.body;
    if (!user || !call || !status) {
      return res.status(400).json({ message: "יש למלא את כל השדות" });
    }

    const callHistory = new CallHistory({ user, call, status });
    await callHistory.save();
    res.status(201).json({ message: "הרשומה נוצרה בהצלחה", callHistory });
  } catch (error) {
    console.error("שגיאה ביצירת היסטוריה:", error);
    res.status(500).json({ message: "שגיאת שרת" });
  }
};

// שליפת כל ההיסטוריה
const getAllCallHistories = async (req, res) => {
  try {
    const histories = await CallHistory.find().populate('user').populate('call');
    res.json(histories);
  } catch (error) {
    console.error("שגיאה בשליפת כל ההיסטוריה:", error);
    res.status(500).json({ message: "שגיאת שרת" });
  }
};

// שליפת היסטוריה לפי מזהה מתנדב
const getByVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const histories = await CallHistory.find({ user: volunteerId }).populate('call');
    res.json(histories);
  } catch (error) {
    console.error("שגיאה בשליפת היסטוריה לפי מתנדב:", error);
    res.status(500).json({ message: "שגיאת שרת" });
  }
};

// שליפת היסטוריה לפי מזהה קריאה
const getByEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    const histories = await CallHistory.find({ call: emergencyId }).populate('user');
    res.json(histories);
  } catch (error) {
    console.error("שגיאה בשליפת היסטוריה לפי קריאה:", error);
    res.status(500).json({ message: "שגיאת שרת" });
  }
};

module.exports = {
  createCallHistory,
  getAllCallHistories,
  getByVolunteer,
  getByEmergency
};
