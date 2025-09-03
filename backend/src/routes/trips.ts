import { FastifyInstance } from "fastify";
import { TripPlan } from "../models/TripPlan";
import { tripPlanSchema, paginationQuerySchema } from "../schemas/trip";

export async function tripRoutes(app: FastifyInstance) {
  app.post("/api/trips", async (request, reply) => {
    try {
      const parsed = tripPlanSchema.parse(request.body);
      const created = await TripPlan.create(parsed);
      return reply.code(201).send(created);
    } catch (err: any) {
      return reply.code(400).send({ error: "Invalid input", details: err?.errors ?? String(err) });
    }
  });

  app.get("/api/trips", async (request, reply) => {
    try {
      const q = paginationQuerySchema.parse(request.query);
      const filter: any = {};
      if (q.destination) filter.destination = new RegExp(q.destination, "i");
      if (q.minBudget != null || q.maxBudget != null) {
        filter.budget = {};
        if (q.minBudget != null) filter.budget.$gte = q.minBudget;
        if (q.maxBudget != null) filter.budget.$lte = q.maxBudget;
      }

      const page = q.page ?? 1;
      const limit = q.limit ?? 20;
      const skip = (page - 1) * limit;
      console.log('Filter:', filter, 'Page:', page, 'Limit:', limit, 'Skip:', skip);
      const [items, total] = await Promise.all([
        TripPlan.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        TripPlan.countDocuments(filter)
      ]);
      console.log(`Found ${JSON.stringify(items)} items out of total ${total}`);
      return { items, page, limit, total, pages: Math.ceil(total / limit) };
    } catch (err: any) {
      return reply.code(400).send({ error: "Invalid query", details: err?.errors ?? String(err) });
    }
  });

  app.put("/api/trips/:id", async (request, reply) => {
    try {
      const parsed = tripPlanSchema.parse(request.body);
      const { id } = request.params as { id: string };
      const updated = await TripPlan.findByIdAndUpdate(id, parsed, { new: true });
      if (!updated) return reply.code(404).send({ error: "Trip not found" });
      return updated;
    } catch (err: any) {
      return reply.code(400).send({ error: "Invalid input", details: err?.errors ?? String(err) });
    }
  });
}
