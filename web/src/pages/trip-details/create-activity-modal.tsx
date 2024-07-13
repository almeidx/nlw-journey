import { Calendar, Tag, X } from "lucide-react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button.tsx";

export function CreateActivityModal({ closeCreateActivityModal }: CreateActivityModalProps) {
	const { tripId } = useParams();

	async function createActivity(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const title = formData.get("title")?.toString();
		const occursAt = formData.get("occurs_at")?.toString();

		await fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}/activities`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				occursAt,
			}),
		});

		window.location.reload();
	}

	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
			<div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Criar atividade</h2>

						<button onClick={closeCreateActivityModal} type="button">
							<X className="size-5 text-zinc-400" />
						</button>
					</div>

					<p className="text-left text-sm text-zinc-400">Todos os convidados podem ver as atividades criadas.</p>
				</div>

				<form className="space-y-3" onSubmit={createActivity}>
					<div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<Tag className="text-zinc-400 size-5" />

						<input
							className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
							placeholder="Qual é a atividade?"
							name="title"
						/>
					</div>

					<div className="h-14 px-4 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
						<Calendar className="text-zinc-400 size-5" />

						<input
							className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
							placeholder="Data e hora da atividade"
							name="occurs_at"
							type="datetime-local"
						/>
					</div>

					<Button size="full" type="submit">
						Guardar atividade
					</Button>
				</form>
			</div>
		</div>
	);
}

interface CreateActivityModalProps {
	closeCreateActivityModal: () => void;
}
