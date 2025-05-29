'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="fixed !bottom-0 left-0 z-40 flex w-full justify-center bg-slate-200/60 pt-2 pb-6 font-sans text-slate-900 backdrop-blur-2xl md:px-4 dark:bg-slate-800/50 dark:text-slate-100">
			<div className="flex flex-row gap-x-18 py-2">
				<Link
					href="/"
					className={`${pathname === '/' || pathname.startsWith('/schedule') || pathname === '/notifications' ? 'opacity-100' : 'opacity-40 dark:opacity-30'} flex h-full flex-col items-center gap-y-0.5 text-xs transition-opacity duration-200`}
				>
					<span className="material-symbols-rounded !text-3xl">
						tv_remote
					</span>
					Remote
				</Link>

				<Link
					href="/tvgether"
					className={`${pathname.startsWith('/tvgether') ? 'opacity-100' : 'opacity-40 dark:opacity-30'} flex h-full flex-col items-center gap-y-0.5 text-xs transition-opacity duration-200`}
				>
					<span className="material-symbols-rounded !text-3xl">
						tv_gen
					</span>
					TVgether
				</Link>

				<Link
					href="/account"
					className={`${pathname.startsWith('/account') ? 'opacity-100' : 'opacity-40 dark:opacity-30'} flex h-full flex-col items-center gap-y-0.5 text-xs transition-opacity duration-200`}
				>
					<span className="material-symbols-rounded !text-3xl">
						person
					</span>
					Account
				</Link>
			</div>
		</nav>
	);
}
