import Link from 'next/link';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
	return (
		<div className="h-svh font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-end pb-8">
					<div className="flex w-full flex-row items-center justify-start bg-slate-100 p-8 pb-4 dark:bg-slate-950">
						<Link
							href="/account"
							className="material-symbols-rounded material-symbols-fill mt-1.5 !text-3xl"
						>
							arrow_back_ios
						</Link>

						<h1 className="mt-[7px] text-xl font-medium">
							Settings
						</h1>
					</div>

					<div className="h-4 w-screen bg-linear-to-b from-slate-100 to-transparent dark:from-slate-950"></div>
				</div>

				<div className="mt-30 flex h-full w-screen flex-col items-center gap-12">
					<div className="flex h-full w-full flex-col gap-2 px-8">
						<h2 className="opacity-60">Notifications</h2>

						<div className="flex h-full w-full flex-col items-start justify-start gap-4 rounded-xl bg-slate-200 p-4 dark:bg-slate-900">
							<div className="flex h-full w-full flex-row items-center justify-between">
								<h2>Scheduled events</h2>
								<Switch className="me-1 scale-110" />
							</div>

							<div className="w-full border border-b-[0.5px] opacity-5" />

							<div className="flex h-full w-full flex-row items-center justify-between">
								<h2>New friends requests</h2>
								<Switch className="me-1 scale-110" />
							</div>

							<div className="w-full border border-b-[0.5px] opacity-5" />

							<div className="flex h-full w-full flex-row items-center justify-between">
								<h2>New messages</h2>
								<Switch className="me-1 scale-110" />
							</div>
						</div>
					</div>

					<div className="flex h-full w-full flex-col gap-2 px-8">
						<h2 className="opacity-60">Privacy</h2>

						<div className="flex h-full w-full flex-col items-start justify-start gap-4 rounded-xl bg-slate-200 p-4 dark:bg-slate-900">
							<div className="flex h-full w-full flex-row items-center justify-between">
								<h2>Show your status</h2>
								<Switch className="me-1 scale-110" />
							</div>

							<div className="w-full border border-b-[0.5px] opacity-5" />

							<div className="flex h-full w-full flex-row items-center justify-between">
								<h2>Allow invitations</h2>
								<Switch className="me-1 scale-110" />
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
