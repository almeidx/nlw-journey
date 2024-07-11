import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmTripModal } from "./confirm-trip-modal.tsx";
import { InviteGuestsModal } from "./invite-guests-modal.tsx";
import { DestinationAndDateStep } from "./steps/destination-and-date-step.tsx";
import { InviteGuestsStep } from "./steps/invite-guests-step.tsx";

export function CreateTripPage() {
	const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
	const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
	const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

	const [emailsToInvite, setEmailsToInvite] = useState(["tracer@gmail.com"]);

	const navigate = useNavigate();

	function openGuestsInput() {
		setIsGuestsInputOpen(true);
	}

	function closeGuestsInput() {
		setIsGuestsInputOpen(false);
	}

	function openGuestsModal() {
		setIsGuestsModalOpen(true);
	}

	function closeGuestsModal() {
		setIsGuestsModalOpen(false);
	}

	function openConfirmTripModal() {
		setIsConfirmTripModalOpen(true);
	}

	function closeConfirmTripModal() {
		setIsConfirmTripModalOpen(false);
	}

	function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		let email = formData.get("email")?.toString();

		if (!email) {
			return;
		}

		email = email.toLowerCase();

		if (!emailsToInvite.includes(email)) {
			setEmailsToInvite((prevEmails) => [...prevEmails, email]);
		}

		event.currentTarget.reset();
	}

	function removeEmailToInvite(email: string) {
		setEmailsToInvite((prevEmails) => prevEmails.filter((prevEmail) => prevEmail !== email));
	}

	function createTrip(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// const formData = new FormData(event.currentTarget);
		// const name = formData.get("name")?.toString();
		// const email = formData.get("email")?.toString();

		// if (!name || !email) {
		// 	return;
		// }

		// console.log({ name, email });

		navigate("/trips/1");
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-pattern bg-no-repeat bg-center">
			<div className="max-w-3xl w-full px-6 text-center space-y-10">
				<div className="flex flex-col items-center gap-3">
					<img src="/logo.svg" alt="plann.er" />

					<p className="text-zinc-300 text-lg">Convide os seus amigos e planeie a sua próxima viagem!</p>
				</div>

				<div className="space-y-4">
					<DestinationAndDateStep
						isGuestsInputOpen={isGuestsInputOpen}
						openGuestsInput={openGuestsInput}
						closeGuestsInput={closeGuestsInput}
					/>

					{isGuestsInputOpen && (
						<InviteGuestsStep
							emailsToInvite={emailsToInvite}
							openConfirmTripModal={openConfirmTripModal}
							openGuestsModal={openGuestsModal}
						/>
					)}
				</div>

				<p className="text-sm text-zinc-500">
					Ao planear a sua viagem pela plann.er, automaticamente concorda
					<br />
					com os nossos{" "}
					<a href="#" className="text-zinc-300 underline">
						termos de serviço
					</a>{" "}
					e{" "}
					<a href="#" className="text-zinc-300 underline">
						políticas de privacidade
					</a>
					.
				</p>

				{isGuestsModalOpen && (
					<InviteGuestsModal
						closeGuestsModal={closeGuestsModal}
						emailsToInvite={emailsToInvite}
						addNewEmailToInvite={addNewEmailToInvite}
						removeEmailToInvite={removeEmailToInvite}
					/>
				)}

				{isConfirmTripModalOpen && (
					<ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} />
				)}
			</div>
		</div>
	);
}
