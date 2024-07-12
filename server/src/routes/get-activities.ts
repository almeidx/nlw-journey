import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";
import { prisma } from "../lib/prisma.js";
import { dayjs } from "../lib/dayjs.js";

export async function getActivities(app: FastifyInstanceWithZod) {
	app.get(
		"/trips/:tripId/activities",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						activities: z.array(
							z.object({
								date: z.date(),
								activities: z.array(
									z.object({
										id: z.string().uuid(),
										title: z.string(),
										occursAt: z.date(),
									}),
								),
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

					activities: {
						select: {
							id: true,
							title: true,
							occursAt: true,
						},
						orderBy: {
							occursAt: "asc",
						},
					},
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			const tripDuration = dayjs(trip.endsAt).diff(trip.startsAt, "days");

			const activities = Array.from({ length: tripDuration + 1 }).map((_, index) => {
				const date = dayjs(trip.startsAt).add(index, "days");

				return {
					date: date.toDate(),
					activities: trip.activities.filter((activity) => {
						return dayjs(activity.occursAt).isSame(date, "day");
					}),
				};
			});

			return { activities };
		},
	);
}
