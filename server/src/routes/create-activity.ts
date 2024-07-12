import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";
import { prisma } from "../lib/prisma.js";
import { dayjs } from "../lib/dayjs.js";

export async function createActivity(app: FastifyInstanceWithZod) {
	app.post(
		"/trips/:tripId/activities",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				body: z.object({
					title: z.string().min(4),
					occursAt: z.coerce.date(),
				}),
				response: {
					201: z.object({
						activityId: z.string().uuid(),
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
			const { title, occursAt } = request.body;

			const trip = await prisma.trip.findUnique({
				where: {
					id: tripId,
				},
				select: {
					id: true,
					endsAt: true,
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			if (dayjs(occursAt).isBefore(dayjs())) {
				throw app.httpErrors.badRequest("Activity occurs in the past");
			}

			if (dayjs(occursAt).isAfter(dayjs(trip.endsAt))) {
				throw app.httpErrors.badRequest("Activity occurs after trip ends");
			}

			const activity = await prisma.activity.create({
				data: {
					title,
					occursAt,
					tripId,
				},
				select: {
					id: true,
				},
			});

			reply.statusCode = 201;
			return { activityId: activity.id };
		},
	);
}
