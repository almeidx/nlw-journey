import fastify from "fastify";
import { createTrip } from "./routes/create-trip.js";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { fastifySensible } from "@fastify/sensible";
import { confirmTrip } from "./routes/confirm-trip.js";
import { fastifyCors } from "@fastify/cors";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySensible);

await app.register(fastifyCors, { origin: "*" });

await app.register(createTrip);
await app.register(confirmTrip);

await app.listen({ port: 3_333 });

console.info("Server is running on http://localhost:3333");
