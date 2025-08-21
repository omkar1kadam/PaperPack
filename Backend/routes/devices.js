const express = require('express');
const auth = require('../middleware/auth');
const Device = require('../models/Device');
const SensorData = require('../models/SensorData');

const router = express.Router();

// Create device - POST /api/devices
router.post('/', auth, async (req, res) => {
  const { deviceId, company, installationDate, lastMaintenanceDate, area, gps, xHoursInterval, meta } = req.body;
  try {
    let dev = await Device.findOne({ deviceId });
    if (dev) return res.status(400).json({ msg: 'Device already exists' });

    dev = new Device({
      deviceId,
      company,
      installationDate,
      lastMaintenanceDate,
      area,
      gps,
      xHoursInterval,
      meta,
      owner: req.user.id,
      createdBy: req.user.id
    });

    await dev.save();
    res.status(201).json(dev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update device - PUT /api/devices/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Device not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get device by id + latest N readings
router.get('/:id', auth, async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ msg: 'Device not found' });
    }

    // Fetch latest N sensor readings (default: 50)
    const limit = Math.min(parseInt(req.query.limit || '50'), 1000);
    const readings = await SensorData.find({ deviceId: device.deviceId })
      .sort({ timestamp: -1 })
      .limit(limit);

    res.json({
      device,
      latestReadings: readings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// List devices - GET /api/devices
router.get('/', auth, async (req, res) => {
  try {
    const devices = await Device.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
