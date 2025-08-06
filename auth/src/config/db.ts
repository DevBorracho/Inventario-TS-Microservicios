import mongoose from "mongoose";

async function connectDb(): Promise<void> {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("DB is Conected");
  } catch (error) {
    console.error(error);
  }
}
export default connectDb;
