import { User, X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../components/button.tsx";

export function ConfirmTripModal({
	closeConfirmTripModal,
	createTrip,
	setOwnerEmail,
	setOwnerName,
}: ConfirmTripModalProps) {
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>

						<button onClick={closeConfirmTripModal} type="button">
							<X className="size-5 text-zinc-400" />
						</button>
					</div>

					<p className="text-left text-sm text-zinc-400">
						Para concluir a criação da viagem para{" "}
						<span className="font-semibold text-zinc-100">Algarve, Portugal</span>, nas datas{" "}
						<span className="font-semibold text-zinc-100">25 a 29 de Julho de 2024</span>, preencha os campos abaixo.
					</p>
				</div>

				<form onSubmit={createTrip} className="space-y-3">
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<User className="text-zinc-400 size-5" />

						<input
							className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
							placeholder="Nome completo"
							name="name"
							onChange={(event) => setOwnerName(event.target.value)}
						/>
					</div>

					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<User className="text-zinc-400 size-5" />

						<input
							className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
							placeholder="E-mail pessoal"
							name="full_name"
							type="email"
							onChange={(event) => setOwnerEmail(event.target.value)}
						/>
					</div>

					<Button type="submit" size="full">
						Confirmar criação da viagem
					</Button>
				</form>
			</div>
		</div>
	);
}

interface ConfirmTripModalProps {
	closeConfirmTripModal: () => void;
	createTrip: (event: FormEvent<HTMLFormElement>) => void;
	setOwnerName: (name: string) => void;
	setOwnerEmail: (email: string) => void;
}
