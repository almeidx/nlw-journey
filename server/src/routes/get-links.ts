import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";
import { prisma } from "../lib/prisma.js";

export async function getLinks(app: FastifyInstanceWithZod) {
	app.get(
		"/trips/:tripId/links",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						links: z.array(
							z.object({
								id: z.string().uuid(),
								title: z.string(),
								url: z.string().url(),
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

					links: {
						select: {
							id: true,
							title: true,
							url: true,
						},
					},
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			return { links: trip.links };
		},
	);
}
