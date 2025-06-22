import dotenv from "dotenv"

dotenv.config()

const { MONGO_URI } = process.env

const dbConfig = {
  uri: MONGO_URI, // URI
};

export default dbConfig;
