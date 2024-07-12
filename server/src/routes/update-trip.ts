import { z } from "zod";
import { dayjs } from "../lib/dayjs.js";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function updateTrip(app: FastifyInstanceWithZod) {
	app.put(
		"/trips/:tripId",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				body: z.object({
					destination: z.string().min(4),
					startsAt: z.coerce.date(),
					endsAt: z.coerce.date(),
				}),
				response: {
					200: z.object({
						tripId: z.string().uuid(),
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
			const { destination, startsAt, endsAt } = request.body;

			if (dayjs(startsAt).isBefore(dayjs())) {
				throw app.httpErrors.badRequest("startsAt must be in the future");
			}

			if (dayjs(startsAt).isAfter(endsAt)) {
				throw app.httpErrors.badRequest("startsAt must be before endsAt");
			}

			const trip = await prisma.trip.findUnique({
				where: {
					id: tripId,
				},
				select: {
					id: true,
					endsAt: true,
					startsAt: true,
					destination: true,
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			await prisma.trip.update({
				where: {
					id: tripId,
				},
				data: {
					destination,
					startsAt,
					endsAt,
				},
			});

			return { tripId };
		},
	);
}
