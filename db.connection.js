import mongoose from "mongoose";
const dbName = "mini-amazon";
const dbUserName = "pramodtharu";
const dbPassword = encodeURIComponent("pramodtharu123");
const dbHost = "pramod.49wcu.mongodb.net";
const dbOptions = "retryWrites=true&w=majority&appName=pramod";

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`;
    await mongoose.connect(url);
    console.log("connect database successful.....");
  } catch (error) {
    console.log("db connection failed....");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
