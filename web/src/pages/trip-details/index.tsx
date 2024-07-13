import { useState } from "react";
import { Activities } from "./activities.tsx";
import { CreateActivityModal } from "./create-activity-modal.tsx";
import { DestinationAndDateHeader } from "./destination-and-date-header.tsx";
import { Guests } from "./guests.tsx";
import { ImportantLinks } from "./important-links.tsx";
import { Plus } from "lucide-react";

export function TripDetailsPage() {
	const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

	function openCreateActivityModal() {
		setIsCreateActivityModalOpen(true);
	}

	function closeCreateActivityModal() {
		setIsCreateActivityModalOpen(false);
	}

	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<DestinationAndDateHeader />

			<main className="flex gap-16 px-4">
				<div className="flex-1 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-3xl font-semibold">Atividades</h2>

						<button
							className="flex items-center gap-2 bg-lime-300 text-zinc-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
							onClick={openCreateActivityModal}
							type="button"
						>
							<Plus className="size-5" />
							Criar atividade
						</button>
					</div>

					<Activities />
				</div>

				<aside className="w-80 space-y-6">
					<ImportantLinks />

					<div className="w-full h-px bg-zinc-800" />

					<Guests />
				</aside>
			</main>

			{isCreateActivityModalOpen && <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />}
		</div>
	);
}
