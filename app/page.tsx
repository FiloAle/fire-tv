'use client';

import RoundButton from '@/app/components/round-button';
import EventCard from '@/app/components/event-card';
import { pressKey } from '@/app/utils/pressKey';
import { useFavorites } from '@/app/context/favorites';
import Link from 'next/link';

export default function Home() {
	const { events, toggleFavorite } = useFavorites();

	return (
		<div className="h-full font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="flex w-full flex-row items-center justify-between p-8 pb-0">
					<span
						onClick={() => pressKey('o')}
						className="material-symbols-rounded material-symbols-fill !text-5xl"
					>
						power_settings_circle
					</span>

					<Link
						href="/notifications"
						className="material-symbols-rounded mt-1 !text-4xl"
					>
						notifications_unread
					</Link>
				</div>

				<div className="grid h-80 w-80 grid-cols-3 grid-rows-3 rounded-full bg-slate-200 dark:bg-slate-900">
					<div
						onClick={() => pressKey('a')}
						className="col-start-1 row-start-2 flex items-center justify-start p-2 ps-3"
					>
						<span className="material-symbols-rounded !text-6xl text-orange-600">
							keyboard_arrow_left
						</span>
					</div>

					<div
						onClick={() => pressKey('d')}
						className="col-start-3 row-start-2 flex items-center justify-end p-2 pe-3"
					>
						<span className="material-symbols-rounded !text-6xl text-orange-600">
							keyboard_arrow_right
						</span>
					</div>

					<div className="col-start-2 row-start-2 flex items-center justify-center">
						<button
							onClick={() => pressKey('k')}
							className="h-full w-full scale-[1.4] rounded-full bg-slate-300 dark:bg-slate-800"
						/>
					</div>

					<div
						onClick={() => pressKey('w')}
						className="col-start-2 row-start-1 flex items-start justify-center p-2 pt-3"
					>
						<span className="material-symbols-rounded !text-6xl text-orange-600">
							keyboard_arrow_up
						</span>
					</div>

					<div
						onClick={() => pressKey('s')}
						className="col-start-2 row-start-3 flex items-end justify-center p-2 pb-3"
					>
						<span className="material-symbols-rounded !text-6xl text-orange-600">
							keyboard_arrow_down
						</span>
					</div>
				</div>

				<div className="flex w-72 flex-col gap-y-4 px-8">
					<div className="flex w-full flex-row items-center justify-between">
						<RoundButton icon="undo" keyStroke="b" />

						<RoundButton
							icon="home"
							keyStroke="h"
							className="!bg-orange-600 !text-slate-100"
						/>

						<RoundButton icon="menu" keyStroke="m" />
					</div>

					<div className="flex w-full flex-row items-center justify-between rounded-full bg-slate-200 dark:bg-slate-900">
						<button
							onClick={() => pressKey('-')}
							className="flex h-14 w-14 items-center justify-center"
						>
							<span className="material-symbols-rounded !text-4xl">
								volume_down
							</span>
						</button>

						<button
							onClick={() => pressKey('.')}
							className="flex h-14 w-14 items-center justify-center"
						>
							<span className="material-symbols-rounded !text-4xl">
								volume_off
							</span>
						</button>

						<button
							onClick={() => pressKey('+')}
							className="flex h-14 w-14 items-center justify-center"
						>
							<span className="material-symbols-rounded !text-4xl">
								volume_up
							</span>
						</button>
					</div>
				</div>

				<div className="flex w-full flex-col gap-y-4">
					<div className="flex flex-row items-center justify-between px-8">
						<h1 className="text-xl font-bold">Upcoming events</h1>

						<Link
							href="/schedule"
							className="flex flex-row items-center justify-center text-sm opacity-30"
						>
							<h3>See schedule</h3>

							<span className="material-symbols-rounded !text-[1rem]">
								keyboard_arrow_right
							</span>
						</Link>
					</div>

					<div className="no-scrollbar overflow-x-scroll pb-8">
						<div className="inline-flex gap-x-4 px-8">
							{events
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
			</main>
		</div>
	);
}
