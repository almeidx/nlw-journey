import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button.tsx";

export function InviteGuestsStep({ emailsToInvite, openConfirmTripModal, openGuestsModal }: InviteGuestsStepProps) {
	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<button className="flex items-center gap-2 flex-1" onClick={openGuestsModal} type="button">
				<UserRoundPlus className="size-5 text-zinc-400" />
				{emailsToInvite.length ? (
					<span className="bg-transparent text-lg text-zinc-100">
						{emailsToInvite.length} {emailsToInvite.length === 1 ? "pessoa convidada" : "pessoas convidadas"}
					</span>
				) : (
					<span className="bg-transparent text-lg text-zinc-400">Quem vai estar na viagem?</span>
				)}
			</button>

			<div className="w-px h-6 bg-zinc-800" />

			<Button onClick={openConfirmTripModal}>
				Confirmar viagem
				<ArrowRight className="size-5" />
			</Button>
		</div>
	);
}

interface InviteGuestsStepProps {
	openGuestsModal: () => void;
	emailsToInvite: string[];
	openConfirmTripModal: () => void;
}
