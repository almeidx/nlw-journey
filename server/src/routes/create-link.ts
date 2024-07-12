import { z } from "zod";
import { dayjs } from "../lib/dayjs.js";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function createLink(app: FastifyInstanceWithZod) {
	app.post(
		"/trips/:tripId/links",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				body: z.object({
					title: z.string().min(4),
					url: z.string().url(),
				}),
				response: {
					201: z.object({
						linkId: z.string().uuid(),
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
			const { title, url } = request.body;

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

			const link = await prisma.link.create({
				data: {
					title,
					url,
					tripId,
				},
				select: {
					id: true,
				},
			});

			reply.statusCode = 201;
			return { linkId: link.id };
		},
	);
}
