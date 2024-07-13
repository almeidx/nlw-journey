import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button.tsx";

export function ImportantLinks() {
	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-xl">Links importantes</h2>

			<div className="space-y-5">
				<div className="flex items-center justify-between gap-4">
					<div className="space-y-1.5 flex-1">
						<span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
						<a
							className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
							href="https://www.airbnb.pt/rooms/1187812680552063705?adults=1&category_tag=Tag%3A8851&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&source_impression_id=p3_1720730806_P3jfX0qmwKPJf7Xq&previous_page_section_name=1000&federated_search_id=a163ee3c-e1ea-4802-b837-7932ee70b268"
							target="_blank"
							rel="noreferrer noopener external"
						>
							https://www.airbnb.pt/rooms/1187812680552063705?adults=1&category_tag=Tag%3A8851&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&source_impression_id=p3_1720730806_P3jfX0qmwKPJf7Xq&previous_page_section_name=1000&federated_search_id=a163ee3c-e1ea-4802-b837-7932ee70b268
						</a>
					</div>

					<Link2 className="size-5 text-zinc-400" />
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="space-y-1.5 flex-1">
						<span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
						<a
							className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
							href="https://www.airbnb.pt/rooms/1187812680552063705?adults=1&category_tag=Tag%3A8851&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&source_impression_id=p3_1720730806_P3jfX0qmwKPJf7Xq&previous_page_section_name=1000&federated_search_id=a163ee3c-e1ea-4802-b837-7932ee70b268"
							target="_blank"
							rel="noreferrer noopener external"
						>
							https://www.airbnb.pt/rooms/1187812680552063705?adults=1&category_tag=Tag%3A8851&children=0&enable_m3_private_room=true&infants=0&pets=0&search_mode=flex_destinations_search&source_impression_id=p3_1720730806_P3jfX0qmwKPJf7Xq&previous_page_section_name=1000&federated_search_id=a163ee3c-e1ea-4802-b837-7932ee70b268
						</a>
					</div>

					<Link2 className="size-5 text-zinc-400" />
				</div>
			</div>

			<Button size="full" variant="secondary">
				<Plus className="size-5" />
				Criar link
			</Button>
		</div>
	);
}
