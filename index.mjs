import "dotenv/config";
import { sendOtpEmail } from "./resend.mjs";
import express from "express";
import { prisma } from "./Prisma/prisma_client.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const app = express();
const port = 5000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: hashedpassword,
    },
  });
  res.json({ user });
});

app.post("/login", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(404).json({
      error: "user not found",
    });
    return;
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res.status(401).json({
      error: "password not found",
    });
    return;
  }
  const token = jwt.sign(
    { name: user.name, email: user.email },
    process.env.TOKEN_SECRET,
  );
  res.json({ massage: `login successfull welcome ${user.name}`, token: token });
});
app.patch("/forget_password", async (req, res) => {
  // 1.find user in db in via email
  const email = req.body.email;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(404).json({
      error: "user not found",
    });
    return;
  }
  // 2. genrate otp
  const otp = Math.floor(Math.random() * 899999 + 100000);
  const StrOtp = `${otp}`;
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: { otp: StrOtp },
  });
  await sendOtpEmail(user.email, StrOtp);
  res.json({ message: "OTP sent successfully Please Check Your Email" });
});

app.listen(port, () => {
  console.log(`server started on ${port} `);
});
