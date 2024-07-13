import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { displayDatesToRange } from "../../utils/display-dates-to-range.ts";

export function DestinationAndDateHeader() {
	const { tripId } = useParams();
	const [trip, setTrip] = useState<Trip | undefined>();

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}`)
			.then((response) => response.json())
			.then((data) => setTrip(data.trip));
	}, [tripId]);

	const displayedRange = trip && displayDatesToRange(trip.startsAt, trip.endsAt);

	return (
		<div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
			<div className="flex items-center gap-2">
				<MapPin className="size-5 text-zinc-400" />
				<span className="text-zinc-100">{trip?.destination}</span>
			</div>

			<div className="flex items-center gap-5">
				<div className="flex items-center gap-2">
					<Calendar className="size-5 text-zinc-400" />
					<span className="text-zinc-100">{displayedRange}</span>
				</div>

				<div className="w-px h-6 bg-zinc-800" />

				<Button variant="secondary">
					Alterar local/hora
					<Settings2 className="size-5" />
				</Button>
			</div>
		</div>
	);
}

interface Trip {
	id: string;
	destination: string;
	startsAt: string;
	endsAt: string;
	isConfirmed: boolean;
}
