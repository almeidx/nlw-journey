import { createTestAccount, createTransport } from "nodemailer";

export async function getMailClient() {
	const account = await createTestAccount();

	return createTransport({
		host: account.smtp.host,
		port: account.smtp.port,
		secure: account.smtp.secure,
		auth: {
			user: account.user,
			pass: account.pass,
		},
	});
}
