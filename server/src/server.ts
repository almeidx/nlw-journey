import { fastifyCors } from "@fastify/cors";
import { fastifySensible } from "@fastify/sensible";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./env.js";
import { errorHandler } from "./error-handler.js";
import { confirmParticipant } from "./routes/confirm-participant.js";
import { confirmTrip } from "./routes/confirm-trip.js";
import { createActivity } from "./routes/create-activity.js";
import { createInvite } from "./routes/create-invite.js";
import { createLink } from "./routes/create-link.js";
import { createTrip } from "./routes/create-trip.js";
import { getActivities } from "./routes/get-activities.js";
import { getLinks } from "./routes/get-links.js";
import { getParticipant } from "./routes/get-participant.js";
import { getParticipants } from "./routes/get-participants.js";
import { getTripDetails } from "./routes/get-trip-details.js";
import { updateTrip } from "./routes/update-trip.js";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

await app.register(fastifySensible);

await app.register(fastifyCors, { origin: "*" });

await app.register(createTrip);
await app.register(confirmTrip);
await app.register(confirmParticipant);
await app.register(createActivity);
await app.register(getActivities);
await app.register(createLink);
await app.register(getLinks);
await app.register(getParticipants);
await app.register(createInvite);
await app.register(updateTrip);
await app.register(getTripDetails);
await app.register(getParticipant);

await app.listen({ port: env.PORT });

console.info(`Server is running on http://localhost:${env.PORT}`);
