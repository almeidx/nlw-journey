import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button.tsx";

export function Guests() {
	const { tripId } = useParams();
	const [participants, setParticipants] = useState<Guest[] | undefined>();

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}/participants`)
			.then((response) => response.json())
			.then((data) => setParticipants(data.participants));
	}, [tripId]);

	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-xl">Convidados</h2>

			<div className="space-y-5">
				{participants?.map((participant, index) => (
					<div className="flex items-center justify-between gap-4" key={participant.id}>
						<div className="space-y-1.5 flex-1">
							<span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index + 1}`}</span>
							<span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
						</div>

						{participant.isConfirmed ? (
							<CheckCircle2 className="size-5 shrink-0 text-green-400" />
						) : (
							<CircleDashed className="size-5 text-zinc-400" />
						)}
					</div>
				))}
			</div>

			<Button size="full" variant="secondary">
				<UserCog className="size-5" />
				Gerir convidados
			</Button>
		</div>
	);
}

interface Guest {
	id: string;
	name: string;
	email: string;
	isConfirmed: boolean;
}
