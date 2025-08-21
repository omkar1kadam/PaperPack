const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  company: String,
  installationDate: Date,
  lastMaintenanceDate: Date,
  area: String,
  gps: {
    lat: Number,
    lng: Number
  },
  xHoursInterval: { type: Number, default: 24 },
  meta: { type: Object }, // additional info if needed
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerEmail: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', DeviceSchema);
