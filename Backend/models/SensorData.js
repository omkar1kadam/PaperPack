const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
  // digital counts and time-high fields (sum/count fields)
  proximityCounts: {
    proxy1: { type: Number, default: 0 },
    proxy2: { type: Number, default: 0 },
    proxy3: { type: Number, default: 0 }
  },
  proximityHighTimeSeconds: {
    proxy1: { type: Number, default: 0 }, // total seconds high during period/report
    proxy2: { type: Number, default: 0 },
    proxy3: { type: Number, default: 0 }
  },
  motors: {
    motor1RunSeconds: { type: Number, default: 0 },
    motor2RunSeconds: { type: Number, default: 0 }
  },
  faultAlarm: { type: Boolean, default: false },
  errorSignal: { type: Boolean, default: false },
  tempSensors: {
    temp1: Number,
    temp2: Number
  },
  gps: {
    lat: Number,
    lng: Number
  },
  raw: { type: Object } // store full raw payload if needed
});

// TTL: expire after 90 days (90 * 24 * 3600 seconds)
SensorDataSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 3600 });

module.exports = mongoose.model('SensorData', SensorDataSchema);
