import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.EMAIL_KEY);
const sendOtpEmail = async (email, otp) => {
  const res = await resend.emails.send({
    to: email,
    from: "Sarvesh@resend.dev",
    subject: "Your OTP",
    text: `Your OTP is ${otp} of forget password`,
  });
  console.log(res);
};
export { sendOtpEmail };
