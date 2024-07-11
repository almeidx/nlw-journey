import { AtSign, Plus, X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../components/button.tsx";

export function InviteGuestsModal({
	closeGuestsModal,
	emailsToInvite,
	addNewEmailToInvite,
	removeEmailToInvite,
}: InviteGuestsModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Selecionar convidados</h2>

						<button onClick={closeGuestsModal} type="button">
							<X className="size-5 text-zinc-400" />
						</button>
					</div>

					<p className="text-left text-sm text-zinc-400">
						Os convidados irão receber e-mails para poderem confirmar a sua participação na viagem.
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{emailsToInvite.map((email) => (
						<div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
							<span className="text-zinc-300">{email}</span>
							<button onClick={() => removeEmailToInvite(email)} type="button">
								<X className="size-4 text-zinc-400" />
							</button>
						</div>
					))}
				</div>

				<div className="w-full h-px bg-zinc-800" />

				<form
					className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
					onSubmit={addNewEmailToInvite}
				>
					<div className="px-2 flex items-center flex-1 gap-2">
						<AtSign className="text-zinc-400 size-5" />

						<input
							className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
							placeholder="Escreva o e-mail do convidado"
							name="email"
							type="email"
						/>
					</div>

					<Button type="submit">
						Convidar
						<Plus className="size-5" />
					</Button>
				</form>
			</div>
		</div>
	);
}

interface InviteGuestsModalProps {
	closeGuestsModal: () => void;
	emailsToInvite: string[];
	addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
	removeEmailToInvite: (email: string) => void;
}
