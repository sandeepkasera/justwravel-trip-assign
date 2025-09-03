import mongoose from "mongoose";

let connected = false;

export async function connectDB(uri: string) {
  if (connected) return;

  try {
    console.log("Connecting to MongoDB..." + uri);
    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 30000 // 30 seconds
      });
    connected = true;

    const connection = mongoose.connection;

    console.log("✅ Connected to MongoDB");
    if (connection.db) {
      console.log("Database name:", connection.db.databaseName);
    } else {
      console.warn("Warning: connection.db is undefined.");
    }

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
