import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";
import { prisma } from "../lib/prisma.js";
import { getMailClient } from "../lib/mail.js";
import { dayjs } from "../lib/dayjs.js";
import { getTestMessageUrl } from "nodemailer";

export async function confirmTrip(app: FastifyInstanceWithZod) {
	app.get(
		"/trips/:tripId/confirm",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
				response: {
					"3xx": z.null(),
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
					isConfirmed: true,
					startsAt: true,
					endsAt: true,
					destination: true,
					id: true,

					participants: {
						select: {
							email: true,
							id: true,
						},
						where: {
							isOwner: false,
						},
					},
				},
			});

			if (!trip) {
				throw app.httpErrors.notFound("Trip not found");
			}

			if (trip.isConfirmed) {
				await reply.redirect(`http://localhost:3000/trips/${tripId}`);
				return;
			}

			await prisma.trip.update({
				where: {
					id: tripId,
				},
				data: {
					isConfirmed: true,
				},
			});

			const formattedStartDate = dayjs(trip.startsAt).format("LLL");
			const formattedEndDate = dayjs(trip.endsAt).format("LLL");

			const mail = await getMailClient();

			await Promise.all(
				trip.participants.map(async (participant) => {
					const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`;

					const message = await mail.sendMail({
						from: {
							name: "plann.er team",
							address: "root@plann.er",
						},
						to: participant.email,
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
				}),
			);

			await reply.redirect(`http://localhost:3000/trips/${tripId}`);
		},
	);
}
