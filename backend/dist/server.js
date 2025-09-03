import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "dotenv";
import { connectDB } from "./plugins/db.js";
import { tripRoutes } from "./routes/trips.js";
config();
const app = Fastify({ logger: false });
await app.register(cors, { origin: true });
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
await connectDB(process.env.MONGO_URI);
await app.register(tripRoutes);
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen({ port, host: "0.0.0.0" }).catch((err) => {
    app.log.error(err);
    process.exit(1);
});
