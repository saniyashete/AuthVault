import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    await mongoose.connect(process.env.CONNECTION_STRING);

    console.log("Database Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    console.log(chalk.greenBright.bold("Connected to mongoDB successfully"));
  } catch (error) {
    console.log(chalk.redBright.bold("Diconnected from MongoDb..."));
    process.exit(1);
  }
};
