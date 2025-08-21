const express = require('express');
const SensorData = require('../models/SensorData');
const Device = require('../models/Device');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/sensors - push single sensor data (device -> server)
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.deviceId) return res.status(400).json({ msg: 'deviceId required' });

    const doc = new SensorData({
      deviceId: payload.deviceId,
      timestamp: payload.timestamp ? new Date(payload.timestamp) : undefined,
      proximityCounts: payload.proximityCounts || {},
      proximityHighTimeSeconds: payload.proximityHighTimeSeconds || {},
      motors: payload.motors || {},
      faultAlarm: payload.faultAlarm || false,
      errorSignal: payload.errorSignal || false,
      tempSensors: payload.tempSensors || {},
      gps: payload.gps || {},
      raw: payload
    });

    await doc.save();
    return res.status(201).json({ msg: 'Sensor data saved' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/sensors/bulk - push array of sensor payloads
router.post('/bulk', async (req, res) => {
  try {
    const arr = req.body;
    if (!Array.isArray(arr)) return res.status(400).json({ msg: 'Array of sensor payloads expected' });

    const docs = arr.map(p => ({
      deviceId: p.deviceId,
      timestamp: p.timestamp ? new Date(p.timestamp) : undefined,
      proximityCounts: p.proximityCounts || {},
      proximityHighTimeSeconds: p.proximityHighTimeSeconds || {},
      motors: p.motors || {},
      faultAlarm: p.faultAlarm || false,
      errorSignal: p.errorSignal || false,
      tempSensors: p.tempSensors || {},
      gps: p.gps || {},
      raw: p
    }));

    await SensorData.insertMany(docs);
    res.status(201).json({ msg: `Inserted ${docs.length} documents` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * GET aggregated counts for a device over a time range
 * GET /api/sensors/:deviceId/aggregate?from=YYYY-MM-DD&to=YYYY-MM-DD
 * (Placed before the single-reading route)
 */
router.get('/:deviceId/aggregate', auth, async (req, res) => {
  try {
    const { from, to } = req.query;

    // verify device exists and ownership / admin
    const device = await Device.findOne({ deviceId: req.params.deviceId });
    if (!device) return res.status(404).json({ msg: 'Device not found' });

    // If role not present in token, this check will still work if req.user.id exists.
    if (req.user.role !== 'admin' && device.owner?.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const match = { deviceId: req.params.deviceId };
    if (from || to) {
      match.timestamp = {};
      if (from) match.timestamp.$gte = new Date(from);
      if (to) match.timestamp.$lte = new Date(to);
    }

    const agg = await SensorData.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$deviceId',
          countDocs: { $sum: 1 },
          prox1_count: { $sum: '$proximityCounts.proxy1' },
          prox2_count: { $sum: '$proximityCounts.proxy2' },
          prox3_count: { $sum: '$proximityCounts.proxy3' },
          prox1_time: { $sum: '$proximityHighTimeSeconds.proxy1' },
          prox2_time: { $sum: '$proximityHighTimeSeconds.proxy2' },
          prox3_time: { $sum: '$proximityHighTimeSeconds.proxy3' },
          motor1_time: { $sum: '$motors.motor1RunSeconds' },
          motor2_time: { $sum: '$motors.motor2RunSeconds' }
        }
      }
    ]);

    res.json(agg[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

/**
 * GET latest N readings for a device - GET /api/sensors/:deviceId?limit=50
 */
router.get('/:deviceId', auth, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '100', 10), 1000);

    // verify device exists and ownership / admin
    const device = await Device.findOne({ deviceId: req.params.deviceId });
    if (!device) return res.status(404).json({ msg: 'Device not found' });

    if (req.user.role !== 'admin' && device.owner?.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const data = await SensorData.find({ deviceId: req.params.deviceId })
      .sort({ timestamp: -1 })
      .limit(limit);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
