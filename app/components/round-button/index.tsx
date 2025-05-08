'use client';

import { pressKey } from '@/app/utils/pressKey';

type IconChar = 'b' | 'h' | 'm';

export default function RoundButton({
	icon,
	keyStroke,
	className
}: {
	icon: string;
	keyStroke?: IconChar;
	className?: string;
}) {
	return (
		<button
			onClick={keyStroke ? () => pressKey(keyStroke) : undefined}
			className={`${className} flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900`}
		>
			<span className="material-symbols-rounded !text-[2rem]">
				{icon}
			</span>
		</button>
	);
}
