import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button.tsx";

export function DestinationAndDateStep({
	isGuestsInputOpen,
	openGuestsInput,
	closeGuestsInput,
}: DestinationAndDateStepProps) {
	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<div className="flex items-center gap-2 flex-1">
				<MapPin className="size-5 text-zinc-400" />
				<input
					className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
					placeholder="Para onde vai?"
					disabled={isGuestsInputOpen}
				/>
			</div>

			<div className="flex items-center gap-2">
				<Calendar className="size-5 text-zinc-400" />
				<input
					className="bg-transparent text-lg placeholder:text-zinc-400 border-none w-40 outline-none"
					placeholder="Quando?"
					disabled={isGuestsInputOpen}
				/>
			</div>

			<div className="w-px h-6 bg-zinc-800" />

			{isGuestsInputOpen ? (
				<Button variant="secondary" onClick={closeGuestsInput}>
					Alterar local/hora
					<Settings2 className="size-5" />
				</Button>
			) : (
				<Button onClick={openGuestsInput}>
					Continuar
					<ArrowRight className="size-5" />
				</Button>
			)}
		</div>
	);
}

interface DestinationAndDateStepProps {
	isGuestsInputOpen: boolean;
	openGuestsInput: () => void;
	closeGuestsInput: () => void;
}
