import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER_MAIL,
    pass: process.env.EMAIL_SENDER_MAIL_PASS,
  },
});

export const teacherRegistrationEmail = async (to, firstname, password) => {
  console.log("Here : SEND: ", to);
  const subject = "Thank You for Registering as a Teacher!";
  const emailContent = `
    <p>Dear ${firstname},</p>
    <p>Login Credentials as Teacher:</p>
    <p>Email: ${to}</p>
    <p>Password: ${password}</p>
  `;

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"TechHub" <your-email@gmail.com>',
      to: to,
      subject: subject,
      html: emailContent,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

