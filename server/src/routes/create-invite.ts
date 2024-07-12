import { getTestMessageUrl } from "nodemailer";
import { z } from "zod";
import { env } from "../env.js";
import { dayjs } from "../lib/dayjs.js";
import { getMailClient } from "../lib/mail.js";
import { prisma } from "../lib/prisma.js";
import type { FastifyInstanceWithZod } from "../lib/zod.js";

export async function createInvite(app: FastifyInstanceWithZod) {
	app.post(
		"/trips/:tripId/invites",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				body: z.object({
					email: z.string().email(),
				}),
				response: {
					201: z.object({
						participantId: z.string().uuid(),
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
			const { email } = request.body;

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

			const participant = await prisma.participant.create({
				data: {
					email,
					tripId,
				},
				select: {
					id: true,
				},
			});

			const formattedStartDate = dayjs(trip.startsAt).format("LLL");
			const formattedEndDate = dayjs(trip.endsAt).format("LLL");

			const mail = await getMailClient();

			const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

			const message = await mail.sendMail({
				from: {
					name: "plann.er team",
					address: "root@plann.er",
				},
				to: email,
				subject: `Confirme a sua presença na viagem para ${trip.destination}`,
				html: `
				<div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
					<p>Foi convidado(a) para participar numa viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
					<p></p>
					<p>Para confirmar a sua presença na viagem, clique no link abaixo:</p>
					<p></p>
					<p>
						<a href="${confirmationLink}">Confirmar viagem</a>
					</p>
					<p></p>
					<p>Caso não saiba do que se trata este e-mail, pode ignorá-lo.</p>
				</div>`.trim(),
			});

			console.log(getTestMessageUrl(message));

			reply.statusCode = 201;
			return { participantId: participant.id };
		},
	);
}
