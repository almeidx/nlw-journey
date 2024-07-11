import { z } from "zod";
import { FastifyInstanceWithZod } from "../lib/zod.js";

export async function confirmTrip(app: FastifyInstanceWithZod) {
	app.get(
		"/trips/:tripId/confirm",
		{
			schema: {
				params: z.object({
					tripId: z.string().uuid(),
				}),
			},
		},
		async (request, reply) => {
			return { tripId: request.params.tripId };
		},
	);
}
