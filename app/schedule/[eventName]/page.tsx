'use client';

import { useParams } from 'next/navigation';
import { useFavorites } from '@/app/context/favorites';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import EventCard from '@/app/components/event-card';
import { Toggle } from '@/components/ui/toggle';

export default function EventDetailPage() {
	const { eventName } = useParams();
	const { events: stateEvents, toggleFavorite } = useFavorites();

	const decodedName = decodeURIComponent(eventName as string).toLowerCase();
	const event = stateEvents.find(
		(e) => e.eventName.toLowerCase() === decodedName
	);

	if (!event)
		return <p className="p-8 text-sm text-neutral-500">Event not found.</p>;

	const formattedTime = format(
		new Date(event.eventTime),
		'eeee, MMMM do yyyy, HH:mm'
	);

	return (
		<div className="flex h-full flex-col gap-y-4 font-sans">
			<div className="fixed z-30 flex w-screen flex-col items-center justify-end gap-x-8 pb-8">
				<div className="flex w-full flex-row items-center justify-start p-8 pb-4">
					<Link
						href="/schedule"
						className="material-symbols-rounded material-symbols-fill mt-1.5 !text-3xl"
					>
						arrow_back_ios
					</Link>

					<h1 className="mt-[7px] text-xl font-medium">Schedule</h1>
				</div>

				<div className="h-4 w-screen"></div>
			</div>

			<div className="relative h-full w-full overflow-hidden shadow-lg dark:shadow-neutral-900/30">
				<div className="fixed top-0 h-40 w-full bg-gradient-to-b from-black to-transparent"></div>

				<Image
					src={event.eventImg}
					alt={event.eventName}
					width={2000}
					height={2000}
					className="h-[36rem] w-full object-cover"
				/>

				<Toggle
					variant="default"
					onClick={() => toggleFavorite(event.eventName)}
					className="group fixed top-8.5 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-slate-900/60 dark:text-white"
				>
					<span
						className={`material-symbols-rounded !text-[1.4rem] text-white transition-all group-hover:text-black ${
							event.isFavorite ? 'material-symbols-fill' : ''
						}`}
					>
						favorite
					</span>
				</Toggle>

				<div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-y-2 p-8">
					<div className="flex h-32 w-full flex-col items-center justify-center overflow-clip rounded-2xl border border-slate-100 bg-slate-200/70 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75 dark:shadow-neutral-900/20">
						<p className="w-full text-center text-neutral-500 dark:text-neutral-400">
							{event.eventName} • {event.eventInfo}
							<br />
							{formattedTime}
						</p>
					</div>

					<div className="mt-4 flex h-14 w-full flex-col items-center justify-center overflow-clip rounded-2xl border border-orange-500 bg-gradient-to-b from-[#FF3501] to-[#E11700] shadow-lg dark:shadow-neutral-900/20">
						<p className="w-full text-center text-2xl font-bold text-neutral-100">
							Co-watch
						</p>
					</div>

					<div className="flex h-14 w-full flex-col items-center justify-center overflow-clip rounded-2xl border border-slate-100 bg-slate-200/70 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75 dark:shadow-neutral-900/20">
						<p className="w-full text-center text-2xl font-bold text-neutral-100">
							Watch
						</p>
					</div>
				</div>
			</div>

			<div className="w-full px-8 pt-4 pb-2">
				<p className="opacity-60">{event.eventDesc}</p>
			</div>

			<div className="flex w-full flex-col gap-y-4 pt-4">
				<div className="flex flex-row items-center justify-between px-8">
					<h1 className="text-xl font-bold">You may also like</h1>
				</div>

				<div className="no-scrollbar overflow-x-scroll pb-8">
					<div className="inline-flex gap-x-4 px-8">
						{stateEvents
							.filter(
								(e) =>
									e.eventName.toLowerCase() !==
									decodeURIComponent(
										eventName as string
									).toLowerCase()
							)
							.sort(
								(a, b) =>
									new Date(a.eventTime).getTime() -
									new Date(b.eventTime).getTime()
							)
							.slice(0, 5)
							.map((event, index) => (
								<EventCard
									key={index}
									eventImg={event.eventImg}
									eventName={event.eventName}
									eventTime={event.eventTime}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
