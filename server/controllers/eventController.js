const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { getAllEvents };
