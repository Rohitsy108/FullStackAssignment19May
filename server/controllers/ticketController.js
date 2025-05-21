// ticketController.js
console.log("Email user:", process.env.EMAIL_USER);
console.log("Email pass:", process.env.EMAIL_PASS);

const submitEmail = async (req, res) => {
  const { email, link } = req.body;
  if (!email || !link) return res.status(400).json({ msg: 'Invalid data' });
  console.log('User email:', email); // Optional: store it
  res.json({ message: 'Redirecting...', link });
};

const nodemailer = require("nodemailer");
const { sendMail } = require("../mailer/sendEmail");

const bookTicket = async (req, res) => {
  const { email, event } = req.body;

  if (!email || !event) {
    return res.status(400).json({ message: "Missing data" });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"EventHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🎫 Your Ticket Confirmation for ${event.title}`,
    text: `
Hi there,

🎉 Thank you for booking a ticket for:

📌 ${event.title}
📅 ${event.date}
📍 ${event.location}

Enjoy the event!

For more info or location: ${event.link}

— Team EventHub
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", email);
    sendMail(email,"Ticket Conformation Mail",'Hi', 'Thank You for registering')
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookTicket };
