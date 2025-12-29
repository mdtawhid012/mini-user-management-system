import express from "express";
import authRouter from "./routes/auth.route.ts";
import { connectDB } from "./config/db.ts";
import userRouter from "./routes/user.route.ts";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;

const startServer = () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
};

startServer();
