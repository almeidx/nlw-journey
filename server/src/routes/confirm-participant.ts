import { z } from "zod";
import { env } from "../env.js";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function confirmParticipant(app: FastifyInstanceWithZod) {
	app.get(
		"/participants/:participantId/confirm",
		{
			schema: {
				params: z.object({
					participantId: z.string().uuid(),
				}),
			},
		},
		async (request, reply) => {
			const { participantId } = request.params;

			const participant = await prisma.participant.findUnique({
				where: {
					id: participantId,
				},
				select: {
					isConfirmed: true,
					tripId: true,
				},
			});

			if (!participant) {
				throw app.httpErrors.notFound("Participant not found");
			}

			if (participant.isConfirmed) {
				await reply.redirect(`${env.WEB_BASE_URL}/trips/${participant.tripId}`);
				return;
			}

			await prisma.participant.update({
				where: {
					id: participantId,
				},
				data: {
					isConfirmed: true,
				},
			});

			await reply.redirect(`${env.WEB_BASE_URL}/trips/${participant.tripId}`);
		},
	);
}
