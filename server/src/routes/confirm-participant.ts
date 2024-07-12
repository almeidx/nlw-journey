import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";
import { prisma } from "../lib/prisma.js";

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
				await reply.redirect(`http://localhost:3000/trips/${participant.tripId}`);
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

			await reply.redirect(`http://localhost:3000/trips/${participant.tripId}`);
		},
	);
}
