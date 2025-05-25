'use client';

import { notifications } from '@/app/data/notifications';
import Link from 'next/link';

export default function Notifications() {
	return (
		<div className="h-full min-h-svh pb-12 font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-end gap-x-8">
					<div className="z-50 bg-slate-100 pt-8 pb-4 dark:bg-slate-950">
						<div className="flex w-screen flex-row items-center justify-start px-8">
							<Link
								href="/"
								className="material-symbols-rounded material-symbols-fill mt-1.5 !text-3xl"
							>
								arrow_back_ios
							</Link>

							<h1 className="mt-[7px] text-xl font-medium">
								Notifications
							</h1>
						</div>
					</div>

					<div className="h-4 w-screen bg-linear-to-b from-slate-100 to-transparent dark:from-slate-950" />
				</div>

				<div className="mt-28 flex h-full w-screen flex-col items-center gap-4">
					<div className="flex w-screen flex-col items-center gap-y-4 px-8">
						{notifications.map((notification, index) => (
							<Link
								key={index}
								href={
									notification.event &&
									typeof notification.sender === 'string'
										? `/schedule/${encodeURIComponent(notification.event?.[0].eventName ?? '')}`
										: typeof notification.sender ===
											  'object'
											? `/tvgether/${notification.sender[0].slug}`
											: `/`
								}
								className={`flex w-full items-center gap-4 rounded-xl p-4 shadow-sm ${
									notification.isInvitation
										? 'border border-orange-500 bg-gradient-to-b from-[#FF3501] to-[#E11700]'
										: 'border border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
								}`}
							>
								<div
									className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border bg-slate-200 dark:bg-slate-800 ${notification.isInvitation ? 'border-orange-400' : 'border-slate-300 dark:border-slate-700'}`}
								>
									{notification.sender === 'System' ? (
										<span className="material-symbols-rounded text-xl text-slate-800 dark:text-slate-100">
											notifications
										</span>
									) : (
										<img
											src={notification.sender[0].imgSrc}
											alt=""
											className="h-full w-full object-cover"
										/>
									)}
								</div>

								<div>
									<h2
										className={`line-clamp-1 font-semibold ${notification.isInvitation ? 'text-slate-50' : ''}`}
									>
										{notification.title}
									</h2>
									<p
										className={`line-clamp-1 text-sm ${notification.isInvitation ? 'text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}
									>
										{notification.desc}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
