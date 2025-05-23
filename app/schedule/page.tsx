'use client';

import EventCard from '@/app/components/event-card';
import Link from 'next/link';
import { useFavorites } from '@/app/context/favorites';
import { format, isThisWeek, addDays } from 'date-fns';
// Helper to generate group labels for dates
function getDateGroupLabel(date: Date) {
	const today = new Date();
	// Set start of today to midnight for accurate comparison
	const baseToday = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);
	// Start of next week (Monday)
	const startOfNextWeek = addDays(
		baseToday,
		7 - (baseToday.getDay() === 0 ? 6 : baseToday.getDay() - 1)
	);
	// Start of next month
	const startOfNextMonth = new Date(
		baseToday.getFullYear(),
		baseToday.getMonth() + 1,
		1
	);

	if (isThisWeek(date, { weekStartsOn: 1 })) {
		return 'This Week';
	}
	if (date >= startOfNextWeek && date < startOfNextMonth) {
		return 'Next Week';
	}
	if (
		date.getMonth() === baseToday.getMonth() &&
		date.getFullYear() === baseToday.getFullYear()
	) {
		return 'This Month';
	}
	return format(date, 'MMMM');
}

export default function Schedule() {
	const { events, toggleFavorite } = useFavorites();

	return (
		<div className="h-full pb-12 font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-end gap-x-8 pb-8">
					<div className="flex w-full flex-row items-center justify-start bg-slate-100 p-8 pb-4 dark:bg-slate-950">
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

					<div className="h-4 w-screen bg-linear-to-b from-slate-100 to-transparent dark:from-slate-950"></div>
				</div>

				<div className="mt-30 flex h-full w-screen flex-col items-center gap-4">
					<div className="flex w-screen flex-col items-center gap-y-8 px-8">
						{Object.entries(
							events.reduce(
								(acc, event) => {
									const dateKey = format(
										new Date(event.eventTime),
										'yyyy-MM-dd'
									);
									if (!acc[dateKey]) acc[dateKey] = [];
									acc[dateKey].push(event);
									return acc;
								},
								{} as Record<string, typeof events>
							)
						)
							.sort(
								([a], [b]) =>
									new Date(a).getTime() -
									new Date(b).getTime()
							)
							.map(([dateKey, groupedEvents]) => {
								const label = getDateGroupLabel(
									new Date(dateKey)
								);
								return (
									<div
										key={dateKey}
										className="flex w-full flex-col gap-y-4"
									>
										<h2 className="pl-1 text-sm font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-600">
											{label}
										</h2>
										{groupedEvents.map((event, index) => (
											<EventCard
												key={index}
												eventImg={event.eventImg}
												eventName={event.eventName}
												eventTime={event.eventTime}
												fullWidth={true}
											/>
										))}
									</div>
								);
							})}
					</div>
				</div>
			</main>
		</div>
	);
}
