import nodemailer from "nodemailer";

const sendEmail = async (email, resetURL) => {
  console.log("Starting email send...");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  console.log("Transporter created");

  // 👇 ADD THESE TWO LINES HERE
  console.log("Verifying SMTP...");
  await transporter.verify();
  console.log("SMTP verified");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h3>Password Reset</h3>
      <p>Click below to reset your password</p>

      <a href="${resetURL}">
        Reset Password
      </a>
    `,
  });

  console.log("Email sent successfully");
};

export default sendEmail;
