import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function getTripDetails(app: FastifyInstanceWithZod) {
	app.get(
		"/trips/:tripId",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						trip: z.object({
							id: z.string().uuid(),
							destination: z.string(),
							startsAt: z.date(),
							endsAt: z.date(),
							isConfirmed: z.boolean(),
						}),
					}),
					"4xx": z.object({
						error: z.string(),
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { tripId } = request.params;

			const trip = await prisma.trip.findUnique({
				where: {
					id: tripId,
				},
				select: {
					id: true,
					destination: true,
					startsAt: true,
					endsAt: true,
					isConfirmed: true,
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			return { trip };
		},
	);
}
