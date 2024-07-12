import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function getParticipants(app: FastifyInstanceWithZod) {
	app.get(
		"/trips/:tripId/participants",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						participants: z.array(
							z.object({
								id: z.string().uuid(),
								name: z.string().nullable(),
								email: z.string().email(),
								isConfirmed: z.boolean(),
							}),
						),
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
					startsAt: true,
					endsAt: true,

					participants: {
						select: {
							id: true,
							name: true,
							email: true,
							isConfirmed: true,
						},
					},
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			return { participants: trip.participants };
		},
	);
}
