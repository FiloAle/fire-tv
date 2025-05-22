'use client';

import { DM_Mono, Figtree } from 'next/font/google';
import './globals.css';

import { usePathname } from 'next/navigation';

import Navbar from '@/app/components/navbar';
import SplashScreen from '@/app/components/splash-screen';
import { FavoritesProvider } from '@/app/context/favorites';

const figtree = Figtree({
	variable: '--font-figtree',
	subsets: ['latin']
});

const dmMono = DM_Mono({
	variable: '--font-dm-mono',
	subsets: ['latin'],
	weight: ['300', '400', '500']
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const hideNavbar =
		pathname.startsWith('/tvgether/') && pathname.split('/').length === 3;

	return (
		<html lang="en" className="no-scrollbar">
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0..1,0"
				/>
			</head>

			<body
				className={`${figtree.variable} ${dmMono.variable} antialiased`}
			>
				<SplashScreen />

				<FavoritesProvider>{children}</FavoritesProvider>

				{!hideNavbar && <Navbar />}
			</body>
		</html>
	);
}
