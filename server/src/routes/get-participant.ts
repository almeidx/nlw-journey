import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function getParticipant(app: FastifyInstanceWithZod) {
	app.get(
		"/participants/:participantId",
		{
			schema: {
				params: z.object({
					participantId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						participant: z.object({
							id: z.string().uuid(),
							name: z.string().nullable(),
							email: z.string().email(),
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
			const { participantId } = request.params;

			const participant = await prisma.participant.findUnique({
				where: {
					id: participantId,
				},
				select: {
					id: true,
					name: true,
					email: true,
					isConfirmed: true,
				},
			});

			if (!participant) {
				throw app.httpErrors.notFound("Participant not found");
			}

			return { participant };
		},
	);
}
