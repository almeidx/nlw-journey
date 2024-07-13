import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button.tsx";
import { displayDatesToRange } from "../../../utils/display-dates-to-range.ts";

export function DestinationAndDateStep({
	isGuestsInputOpen,
	openGuestsInput,
	closeGuestsInput,
	setDestination,
	eventDates,
	setEventDates,
}: DestinationAndDateStepProps) {
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	function openDatePicker() {
		setIsDatePickerOpen(true);
	}

	function closeDatePicker() {
		setIsDatePickerOpen(false);
	}

	const displayedRange = eventDates?.from && eventDates.to && displayDatesToRange(eventDates.from, eventDates.to);

	return (
		<div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
			<div className="flex items-center gap-2 flex-1">
				<MapPin className="size-5 text-zinc-400" />
				<input
					className="bg-transparent text-lg placeholder:text-zinc-400 border-none outline-none flex-1"
					placeholder="Para onde vai?"
					disabled={isGuestsInputOpen}
					onChange={(event) => setDestination(event.target.value)}
				/>
			</div>

			<button
				className="flex items-center gap-2 w-56"
				disabled={isGuestsInputOpen}
				onClick={openDatePicker}
				type="button"
			>
				<Calendar className="size-5 text-zinc-400" />
				<span className="bg-transparent text-left text-lg text-zinc-400 border-none w-40 outline-none flex-1">
					{displayedRange ?? "Quando?"}
				</span>
			</button>

			{isDatePickerOpen && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
					<div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold">Selecione a data</h2>

								<button onClick={closeDatePicker} type="button">
									<X className="size-5 text-zinc-400" />
								</button>
							</div>
						</div>

						<DayPicker mode="range" onSelect={(range) => setEventDates(range)} selected={eventDates} />
					</div>
				</div>
			)}

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
	setDestination: (destination: string) => void;
	eventDates: DateRange | undefined;
	setEventDates: (eventDates: DateRange | undefined) => void;
}
