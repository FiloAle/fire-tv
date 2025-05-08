'use client';

import { useState } from 'react';
import ChatListEntry from '@/app/components/chat-list-entry';
import { chatMessages } from '@/app/data/messages';

export default function TVgether() {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredChats = Object.entries(chatMessages).filter(([slug, data]) =>
		data.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="h-svh font-sans">
			<main className="flex flex-col items-center gap-4">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-start gap-x-8 pb-8">
					<div className="flex w-screen flex-row items-center justify-end gap-x-8 bg-white px-8 pt-8 pb-4 dark:bg-[#0a0a0a]">
						<div className="ms-1 mt-1 flex h-12 w-full flex-row items-center justify-start gap-x-2 rounded-full bg-neutral-200 px-4 dark:bg-neutral-800">
							<span className="material-symbols-rounded !text-2xl opacity-55">
								search
							</span>
							<input
								className="text-md w-full bg-transparent !outline-none"
								placeholder="Search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<span className="material-symbols-rounded mt-1 !text-4xl">
							filter_list
						</span>
					</div>
					<div className="h-4 w-screen bg-linear-to-b from-white to-transparent dark:from-[#0a0a0a]"></div>
				</div>

				<div className="mt-24 flex h-full w-full flex-col">
					{filteredChats.map(([slug, chatData], index) => (
						<ChatListEntry
							key={index}
							icon={chatData.icon}
							chatName={chatData.name}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
