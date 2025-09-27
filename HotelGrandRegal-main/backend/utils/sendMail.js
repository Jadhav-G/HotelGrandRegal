require("dotenv").config();
const nodemailer = require('nodemailer');

async function sendMail(to, subject, content) {
  console.log(process.env.EMAIL, process.env.APP_PASSWORD)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Hotel Grand Regal" <${process.env.EMAIL}>`,
      to: to,
      subject: subject,
      text: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

module.exports = sendMail;
