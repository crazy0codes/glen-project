import mongoose from "mongoose";
import dbConfig from "../config/dbConfig";

export const initializeDB = async () => {
  try {
    console.info("Connecting to MongoDB...");
    if(!dbConfig.uri) throw Error("MongoDB URI not found")
    await mongoose.connect(dbConfig.uri);
    console.info("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.info("MongoDB disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};
