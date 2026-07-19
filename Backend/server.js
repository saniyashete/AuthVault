import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoute.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(chalk.yellowBright(`App listening on PORT ${PORT}`));
    });
  } catch (error) {
    console.log(`Error in connecting to MongoDB ${error.message}`);
    process.exit(1);
  }
};
startServer();
