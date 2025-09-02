import mongoose from "mongoose";

let connected = false;

export async function connectDB(uri: string) {
  if (connected) return;
  await mongoose.connect(uri);
  connected = true;
}
