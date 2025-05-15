import { useFavorites } from '@/app/context/favorites';
import { Toggle } from '@/components/ui/toggle';
import Image from 'next/image';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';

export default function EventCard({
	eventImg,
	eventName,
	eventTime,
	fullWidth = false
}: {
	eventImg: string;
	eventName: string;
	eventTime: string;
	fullWidth?: boolean;
}) {
	const { events, toggleFavorite } = useFavorites();

	// Trova l'evento attuale nello stato globale
	const event = events.find((e) => e.eventName === eventName);
	const isFavorite = event?.isFavorite ?? false;

	function formatEventDate(dateString: string) {
		const date = new Date(dateString);

		if (isToday(date)) {
			return `Today, ${format(date, 'HH:mm')}`;
		}

		if (isTomorrow(date)) {
			return `Tomorrow, ${format(date, 'HH:mm')}`;
		}

		if (isThisWeek(date, { weekStartsOn: 1 })) {
			return `This ${format(date, 'eeee')}, ${format(date, 'HH:mm')}`;
		}

		return format(date, 'MMM do, HH:mm');
	}

	return (
		<div
			className={`flex h-64 flex-col gap-y-2 ${fullWidth ? 'h-full w-full' : ''}`}
		>
			<div
				className={`relative h-52 ${fullWidth ? 'h-64 w-full' : 'w-80'} shrink-0 overflow-hidden rounded-xl shadow-lg dark:shadow-neutral-900/20`}
			>
				<Image
					src={eventImg}
					alt={eventName}
					fill
					className="pointer-events-none object-cover"
				/>

				<Toggle
					variant="default"
					onClick={() => toggleFavorite(eventName)}
					className="group absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-neutral-900/80 dark:text-white"
				>
					<span
						className={`material-symbols-rounded !text-[1.4rem] text-white transition-all group-hover:text-black ${
							isFavorite ? 'material-symbols-fill' : ''
						}`}
					>
						favorite
					</span>
				</Toggle>
			</div>

			<div className="flex flex-col">
				<h1 className="text-lg font-semibold opacity-80">
					{eventName}
				</h1>
				<h3 className="text-sm font-medium opacity-20">
					{formatEventDate(eventTime)}
				</h3>
			</div>
		</div>
	);
}
