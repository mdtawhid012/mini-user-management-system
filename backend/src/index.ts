import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

const PORT = process.env.PORT;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
};

startServer();
