'use client';

import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

import { usePathname } from 'next/navigation';

import Navbar from '@/app/components/navbar';
import SplashScreen from '@/app/components/splash-screen';

const dmSans = DM_Sans({
	variable: '--font-dm-sans',
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
				className={`${dmSans.variable} ${dmMono.variable} antialiased`}
			>
				<SplashScreen />
				{children}
				{!hideNavbar && <Navbar />}
			</body>
		</html>
	);
}
