import { useFavorites } from '@/app/context/favorites';
import { Toggle } from '@/components/ui/toggle';
import Image from 'next/image';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import Link from 'next/link';

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
			className={`flex h-full flex-col gap-y-2 font-sans ${fullWidth ? 'w-full' : ''}`}
		>
			<div
				className={`relative h-52 ${fullWidth ? 'w-full' : 'w-80'} shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-lg dark:border-slate-900 dark:shadow-neutral-900/20`}
			>
				<Link href={`/schedule/${encodeURIComponent(eventName)}`}>
					<Image
						src={eventImg}
						alt={eventName}
						fill
						className="object-cover"
					/>

					<div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent px-3 py-2 text-slate-100">
						<div className="flex h-full flex-col justify-end">
							<h1 className="text-lg font-semibold">
								{eventName}
							</h1>
							<h3 className="text-sm font-medium opacity-50">
								{formatEventDate(eventTime)}
							</h3>
						</div>
					</div>
				</Link>

				<Toggle
					variant="default"
					onClick={() => toggleFavorite(eventName)}
					className="group absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-slate-900/60 dark:text-white"
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
		</div>
	);
}
