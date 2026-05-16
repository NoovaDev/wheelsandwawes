const nodemailer = require("nodemailer");

const sendEmail = async ({ subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"W&W Travels Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
};

module.exports = sendEmail;