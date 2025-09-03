import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "dotenv";
import { connectDB } from "./plugins/db.js";
import { tripRoutes } from "./routes/trips.js";

config();

const app = Fastify({ logger: false });

await app.register(cors, { origin: true });
await connectDB(process.env.MONGO_URI ?? "mongodb://localhost:27017/trip_assignment");

await app.register(tripRoutes);

const port = Number(process.env.PORT ?? 4000);
app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
