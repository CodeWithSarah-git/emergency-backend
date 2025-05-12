//היסטוריית טיפול של מתנדב
const mongoose = require('mongoose');

const callHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  call: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyCall' },
  status: { type: String, enum: ['accepted', 'rejected', 'completed'] },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallHistory', callHistorySchema);