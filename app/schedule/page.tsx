'use client';

import EventCard from '@/app/components/event-card';
import Link from 'next/link';
import { useFavorites } from '@/app/context/favorites';

export default function Schedule() {
	const { events, toggleFavorite } = useFavorites();

	return (
		<div className="h-full pb-12 font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-end gap-x-8 pb-8">
					<div className="flex w-full flex-row items-center justify-start bg-white p-8 pb-4 dark:bg-[#0a0a0a]">
						<Link
							href="/"
							className="material-symbols-rounded material-symbols-fill mt-1.5 !text-3xl"
						>
							arrow_back_ios
						</Link>

						<h1 className="mt-[7px] text-xl font-medium">
							Schedule
						</h1>
					</div>

					<div className="h-4 w-screen bg-linear-to-b from-white to-transparent dark:from-[#0a0a0a]"></div>
				</div>

				<div className="mt-30 flex h-full w-screen flex-col items-center gap-4">
					<div className="flex w-screen flex-col items-center gap-y-8 px-8">
						{events.map((event, index) => (
							<EventCard
								key={index}
								eventImg={event.eventImg}
								eventName={event.eventName}
								eventTime={event.eventTime}
								fullWidth={true}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
