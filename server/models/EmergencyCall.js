//קריאות חרום
const mongoose = require('mongoose');

const emergencyCallSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String }, 
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      default: 'Point',
    },
    coordinates: {
      type: [Number], 
      required: true
    }
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

emergencyCallSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('EmergencyCall', emergencyCallSchema);

