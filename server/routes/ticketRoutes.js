// ticketRoutes.js
const express = require('express');
const router = express.Router();
const { bookTicket } = require('../controllers/ticketController');

router.post('/', bookTicket);

module.exports = router;
