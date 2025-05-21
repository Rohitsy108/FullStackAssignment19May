const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Event = require("./models/Event");

const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
//const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


mongoose.connect("mongodb://localhost:27017/eventhub")
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));

  require("dotenv").config();
  
