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

export const sendWelcomeEmail = async (to, fullName) => {
  console.log("Here : SEND: ", to);
  const subject = "Thank You for Joining the BookedPlus Waitlist!";
  const emailContent = `
    <p>Dear ${fullName},</p>
    <p>Thank you for joining TeachHud</p>
    
  `;

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"TeachHud" <your-email@gmail.com>',
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

export const sendOtpForRegistration = async (to, otp) => {

  const subject = "OTP for Email Verification";
  const emailContent = `
    <p>Dear User,</p>
    <p>Here is your OTP for Email Verification: ${otp}</p>
    
  `;

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"TeachHud" <your-email@gmail.com>',
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
export const sendOtpForForgotPassword = async (to, otp) => {

  const subject = "OTP for Password Changing";
  const emailContent = `
    <p>Dear User,</p>
    <p>Here is your OTP for Password Changing: ${otp}</p>
    
  `;

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"TeachHud" <your-email@gmail.com>',
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

