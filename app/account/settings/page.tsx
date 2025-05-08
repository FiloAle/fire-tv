import Link from 'next/link';

export default function Settings() {
	return (
		<div className="h-svh font-sans">
			<main className="flex flex-col items-center gap-10">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-end pb-8">
					<div className="mt-1.5 flex w-full flex-row items-center justify-start p-8 pb-0">
						<Link
							href="/account"
							className="material-symbols-rounded material-symbols-fill !text-3xl"
						>
							arrow_back_ios
						</Link>

						<h1 className="mt-[1px] text-xl font-medium">
							Settings
						</h1>
					</div>

					<div className="h-4 w-screen bg-linear-to-b from-white to-transparent dark:from-[#0a0a0a]"></div>
				</div>
			</main>
		</div>
	);
}
