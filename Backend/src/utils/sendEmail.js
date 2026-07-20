import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, resetURL) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Password",
    html: `
      <h3>Password Reset</h3>
      <p>Click the button below to reset your password.</p>

      <a href="${resetURL}">
        Reset Password
      </a>
    `,
  });
};

export default sendEmail;
