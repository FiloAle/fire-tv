'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
	const [showSplash, setShowSplash] = useState(true);
	const duration = 1200;
	const [animationFinished, setAnimationFinished] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowSplash(false);
		}, duration);

		const animTimeout = setTimeout(() => {
			setAnimationFinished(true);
		}, duration + 500);

		return () => {
			clearTimeout(timeout);
			clearTimeout(animTimeout);
		};
	}, []);

	return (
		<div
			className={`${showSplash ? 'opacity-100' : 'opacity-0'} ${animationFinished ? 'hidden' : ''} fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-100 transition-opacity duration-500 dark:bg-slate-950`}
		>
			<Image
				className="-mt-18 dark:invert"
				src="/firetv.svg"
				alt="Fire TV logo"
				width={180}
				height={38}
				priority
			/>
		</div>
	);
}
