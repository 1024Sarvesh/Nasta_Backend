import "dotenv/config";
import express from "express";
import { userRouter } from "./users/route.mjs";
import { menuRouter } from "./menu/route.mjs";
const app = express();
const port = 5000;

app.use(express.json()); // body parser
app.use((req, res, next) => {
  console.log(" global middleware");
  next();
});
app.use("/users", userRouter);
app.use("/menus", menuRouter);

app.listen(port, () => {
  console.log(`server started on ${port} `);
});
