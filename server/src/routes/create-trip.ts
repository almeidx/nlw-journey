import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";
import { prisma } from "../lib/prisma.js";
import { getMailClient } from "../lib/mail.js";
import { getTestMessageUrl } from "nodemailer";
import { dayjs } from "../lib/dayjs.js";

export async function createTrip(app: FastifyInstanceWithZod) {
	app.post(
		"/trips",
		{
			schema: {
				body: z.object({
					destination: z.string().min(4),
					startsAt: z.coerce.date(),
					endsAt: z.coerce.date(),
					ownerName: z.string(),
					ownerEmail: z.string().email(),
					emailsToInvite: z.array(z.string().email()),
				}),
				response: {
					201: z.object({
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
			const { destination, startsAt, endsAt, ownerEmail, ownerName, emailsToInvite } = request.body;

			if (dayjs(startsAt).isBefore(dayjs())) {
				throw app.httpErrors.badRequest("startsAt must be in the future");
			}

			if (dayjs(startsAt).isAfter(endsAt)) {
				throw app.httpErrors.badRequest("startsAt must be before endsAt");
			}

			const trip = await prisma.trip.create({
				data: {
					destination,
					startsAt,
					endsAt,
					participants: {
						createMany: {
							data: [
								{
									email: ownerEmail,
									name: ownerName,
									isOwner: true,
									isConfirmed: true,
								},
								...emailsToInvite.map((email) => ({ email })),
							],
						},
					},
				},
				select: { id: true },
			});

			const formattedStartDate = dayjs(startsAt).format("LLL");
			const formattedEndDate = dayjs(endsAt).format("LLL");

			const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`;

			const mail = await getMailClient();

			const message = await mail.sendMail({
				from: {
					name: "plann.er team",
					address: "root@plann.er",
				},
				to: {
					name: ownerName,
					address: ownerEmail,
				},
				subject: `Confirme a sua viagem para ${destination}`,
				html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Iniciou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
          <p></p>
          <p>Para confirmar a sua viagem, clique no link abaixo:</p>
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

			return { tripId: trip.id };
		},
	);
}
