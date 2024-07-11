import { useState } from "react";
import { Activities } from "./activities.tsx";
import { CreateActivityModal } from "./create-activity-modal.tsx";
import { DestinationAndDateHeader } from "./destination-and-date-header.tsx";
import { Guests } from "./guests.tsx";
import { ImportantLinks } from "./important-links.tsx";

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
				<Activities openCreateActivityModal={openCreateActivityModal} />

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
