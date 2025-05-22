'use client';

import EventCard from '@/app/components/event-card';
import Link from 'next/link';
import CircularBadge from '@/app/components/circular-badge';
import { useFavorites } from '@/app/context/favorites';

export default function Account() {
	const { events, toggleFavorite } = useFavorites();

	const favoriteEvents = events
		.filter((event) => event.isFavorite)
		.sort(
			(a, b) =>
				new Date(a.eventTime).getTime() -
				new Date(b.eventTime).getTime()
		);

	return (
		<div className="h-full font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-end gap-x-8 pb-8">
					<Link
						href="/account/settings"
						className="flex w-screen flex-row items-center justify-end gap-x-8 bg-slate-100 px-8 pt-8 pb-4 dark:bg-slate-950"
					>
						<span className="material-symbols-rounded mt-1.5 !text-4xl">
							settings
						</span>
					</Link>

					<div className="h-4 w-screen bg-linear-to-b from-slate-100 to-transparent dark:from-slate-950"></div>
				</div>

				<div className="mt-30 flex h-full w-screen flex-col items-center gap-4">
					<div className="h-full w-full">
						<div className="flex h-full w-full flex-col items-center justify-start gap-4">
							<div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-800">
								<span className="material-symbols-rounded pb-1 !text-6xl">
									person
								</span>
							</div>

							<div className="flex flex-col items-center">
								<h1 className="text-3xl font-bold">
									Alessio Furlani
								</h1>
								<p className="text-md opacity-60">
									@ale.furlani9
								</p>
							</div>
						</div>
					</div>

					<div className="flex h-full w-full flex-row items-center justify-center gap-4 px-4">
						<button className="rounded-full border px-5 py-1.5 font-medium">
							Edit
						</button>
					</div>

					<div className="flex w-full flex-col gap-y-4 pt-6">
						<div className="flex flex-row items-center justify-between px-8">
							<h1 className="text-xl font-bold">Interests</h1>
						</div>

						<div className="no-scrollbar overflow-x-scroll pb-8">
							<div className="inline-flex gap-x-4 px-8">
								<CircularBadge
									imgSrc="/imgs/football.svg"
									imgWidth={52}
									imgHeight={52}
									divClassName="bg-gradient-to-br from-green-400 to-emerald-700"
									imgClassName="invert"
									title="Football"
								/>

								<CircularBadge
									imgSrc="/imgs/ucl.svg"
									imgWidth={48}
									imgHeight={48}
									divClassName="bg-gradient-to-br from-fuchsia-400 to-blue-700"
									imgClassName="invert"
									title="UEFA Champions League"
								/>

								<CircularBadge
									imgSrc="/imgs/serie_a.svg"
									imgWidth={48}
									imgHeight={48}
									divClassName="bg-white"
									title="Serie A"
								/>

								<CircularBadge
									imgSrc="/imgs/juve.svg"
									imgWidth={80}
									imgHeight={48}
									divClassName="bg-black"
									imgClassName="invert"
									title="Juventus FC"
								/>

								<CircularBadge
									imgSrc="/imgs/tennis.svg"
									imgWidth={52}
									imgHeight={52}
									divClassName="bg-gradient-to-br from-yellow-400 to-amber-600"
									imgClassName="invert"
									title="Tennis"
								/>

								<CircularBadge
									imgSrc="/imgs/ao.svg"
									imgWidth={56}
									imgHeight={56}
									divClassName="bg-white"
									title="Australian Open"
								/>

								<CircularBadge
									imgSrc="/imgs/sinner.avif"
									imgWidth={600}
									imgHeight={600}
									divClassName="overflow-hidden"
									imgClassName="scale-[1.4]"
									title="Jannik Sinner"
								/>

								<div className="flex h-max w-max flex-col gap-3">
									<div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
										<span className="material-symbols-rounded !text-5xl opacity-40">
											add
										</span>
									</div>
									<h1 className="w-24 text-center text-xs">
										Add interest
									</h1>
								</div>
							</div>
						</div>
					</div>

					<div className="flex w-full flex-col gap-y-4">
						<div className="flex flex-row items-center justify-between px-8">
							<h1 className="text-xl font-bold">Saved events</h1>
						</div>

						<div className="no-scrollbar overflow-x-scroll pb-2">
							<div className="inline-flex gap-x-4 px-8">
								{favoriteEvents.length === 0 ? (
									<p className="text-neutral-500 dark:text-neutral-400">
										You haven't saved any event yet.
									</p>
								) : (
									favoriteEvents.map((event, index) => (
										<EventCard
											key={index}
											eventImg={event.eventImg}
											eventName={event.eventName}
											eventTime={event.eventTime}
										/>
									))
								)}
							</div>
						</div>
					</div>

					<div className="flex w-full flex-col gap-y-4 pt-6">
						<div className="flex flex-row items-center justify-between px-8">
							<h1 className="text-xl font-bold">Friends</h1>
						</div>

						<div className="no-scrollbar overflow-x-scroll pb-8">
							<div className="inline-flex gap-x-4 px-8">
								<CircularBadge
									imgSrc="/imgs/tommaso.avif"
									imgWidth={128}
									imgHeight={128}
									divClassName="overflow-hidden"
									title="Tommaso Elli"
								/>

								<CircularBadge
									imgSrc="/imgs/daniela.avif"
									imgWidth={128}
									imgHeight={128}
									divClassName="overflow-hidden"
									title="Daniela Petrelli"
								/>

								<CircularBadge
									imgSrc="/imgs/football.svg"
									imgWidth={128}
									imgHeight={128}
									divClassName="overflow-hidden bg-slate-800"
									imgClassName="scale-50 invert"
									title="Alessandro Quets"
								/>

								<CircularBadge
									imgSrc="/imgs/football.svg"
									imgWidth={128}
									imgHeight={128}
									divClassName="overflow-hidden bg-slate-800"
									imgClassName="scale-50 invert"
									title="Filippo Alessandrini"
								/>

								<div className="flex h-max w-max flex-col gap-3">
									<div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
										<span className="material-symbols-rounded !text-5xl opacity-40">
											add
										</span>
									</div>
									<h1 className="w-24 text-center text-xs">
										Add friend
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
