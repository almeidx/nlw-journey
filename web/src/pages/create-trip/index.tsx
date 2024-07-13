import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmTripModal } from "./confirm-trip-modal.tsx";
import { InviteGuestsModal } from "./invite-guests-modal.tsx";
import { DestinationAndDateStep } from "./steps/destination-and-date-step.tsx";
import { InviteGuestsStep } from "./steps/invite-guests-step.tsx";
import type { DateRange } from "react-day-picker";

export function CreateTripPage() {
	const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
	const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
	const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

	const [destination, setDestination] = useState("");
	const [ownerName, setOwnerName] = useState("");
	const [ownerEmail, setOwnerEmail] = useState("");
	const [eventDates, setEventDates] = useState<DateRange | undefined>();
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

	async function createTrip(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (
			!destination ||
			!ownerName ||
			!ownerEmail ||
			!eventDates?.from ||
			!eventDates?.to ||
			emailsToInvite.length === 0
		) {
			alert("Preencha todos os campos para criar a viagem.");
			return;
		}

		const response = await fetch(`${import.meta.env.VITE_API_URL}/trips`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				destination,
				ownerName,
				ownerEmail,
				startsAt: eventDates.from,
				endsAt: eventDates.to,
				emailsToInvite,
			}),
		});

		if (!response.ok) {
			alert("Erro ao criar a viagem. Tente novamente.");
			return;
		}

		const { tripId } = (await response.json()) as { tripId: string };

		navigate(`/trips/${tripId}`);
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
						setDestination={setDestination}
						eventDates={eventDates}
						setEventDates={setEventDates}
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
					<a href="/terms" className="text-zinc-300 underline">
						termos de serviço
					</a>{" "}
					e{" "}
					<a href="/privacy" className="text-zinc-300 underline">
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
					<ConfirmTripModal
						closeConfirmTripModal={closeConfirmTripModal}
						createTrip={createTrip}
						setOwnerName={setOwnerName}
						setOwnerEmail={setOwnerEmail}
					/>
				)}
			</div>
		</div>
	);
}
