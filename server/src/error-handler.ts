import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Bad request",
			errors: error.flatten().fieldErrors,
		});
	}

	console.error("Internal server error", error);

	return reply.status(500).send({ message: "Internal server error" });
};
