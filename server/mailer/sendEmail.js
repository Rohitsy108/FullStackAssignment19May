const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for 465, false for other ports
  auth: {
    user: "rajnarayansingh4848@gmail.com",
    pass: "pnagfpczgwvhwihi",
  },
});

// Wrap in an async IIFE so we can use await.
(async function sendMail(to,subject,text) {
  const info = await transporter.sendMail({
    from: '"rajnarayansingh4848@gmail.com',
    to: "rohitsy5858@gmail.com",
    subject: "Ticket Conformation",
    text: "Hello ", // plain‑text body
    // html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
})();

// module.exports ={sendMail}