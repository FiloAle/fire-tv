'use client';

import RoundButton from '@/app/components/round-button';
import EventCard from '@/app/components/event-card';
import { pressKey } from '@/app/utils/pressKey';

export default function Home() {
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

					<span className="material-symbols-rounded mt-1 !text-4xl">
						notifications_unread
					</span>
				</div>

				<div className="grid h-80 w-80 grid-cols-3 grid-rows-3 rounded-full bg-neutral-100 dark:bg-neutral-900">
					<div
						onClick={() => pressKey('a')}
						className="col-start-1 row-start-2 flex items-center justify-start p-2 ps-3"
					>
						<span className="material-symbols-rounded !text-6xl">
							keyboard_arrow_left
						</span>
					</div>

					<div
						onClick={() => pressKey('d')}
						className="col-start-3 row-start-2 flex items-center justify-end p-2 pe-3"
					>
						<span className="material-symbols-rounded !text-6xl">
							keyboard_arrow_right
						</span>
					</div>

					<div className="col-start-2 row-start-2 flex items-center justify-center">
						<button
							onClick={() => pressKey('k')}
							className="h-full w-full scale-[1.4] rounded-full bg-neutral-300 dark:bg-neutral-800"
						/>
					</div>

					<div
						onClick={() => pressKey('w')}
						className="col-start-2 row-start-1 flex items-start justify-center p-2 pt-3"
					>
						<span className="material-symbols-rounded !text-6xl">
							keyboard_arrow_up
						</span>
					</div>

					<div
						onClick={() => pressKey('s')}
						className="col-start-2 row-start-3 flex items-end justify-center p-2 pb-3"
					>
						<span className="material-symbols-rounded !text-6xl">
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
							className="!bg-sky-500 !text-white"
						/>

						<RoundButton icon="menu" keyStroke="m" />
					</div>

					<div className="flex w-full flex-row items-center justify-between rounded-full bg-neutral-100 dark:bg-neutral-900">
						<button className="flex h-14 w-14 items-center justify-center">
							<span className="material-symbols-rounded !text-4xl">
								volume_down
							</span>
						</button>

						<button className="flex h-14 w-14 items-center justify-center">
							<span className="material-symbols-rounded !text-4xl">
								volume_off
							</span>
						</button>

						<button className="flex h-14 w-14 items-center justify-center">
							<span className="material-symbols-rounded !text-4xl">
								volume_up
							</span>
						</button>
					</div>
				</div>

				<div className="flex w-full flex-col gap-y-4">
					<div className="flex flex-row items-center justify-between px-8">
						<h1 className="text-xl font-bold">Upcoming events</h1>

						<div className="flex flex-row items-center justify-center text-sm opacity-20">
							<h3>See schedule</h3>

							<span className="material-symbols-rounded !text-[1rem]">
								keyboard_arrow_right
							</span>
						</div>
					</div>

					<div className="no-scrollbar overflow-x-scroll pb-8">
						<div className="inline-flex gap-x-4 px-8">
							<EventCard
								eventImg="/imgs/juve.avif"
								eventName="Juventus - Monza"
								eventTime="Today, 20:45"
							/>

							<EventCard
								eventImg="/imgs/f1.avif"
								eventName="Formula 1"
								eventTime="Today, 21:00"
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
