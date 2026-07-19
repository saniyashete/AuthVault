import nodemailer from "nodemailer";

const sendEmail = async (email, resetURL) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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
};

export default sendEmail;
