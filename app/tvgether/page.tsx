'use client';

import { useState } from 'react';
import ChatListEntry from '@/app/components/chat-list-entry';
import { chatMessages } from '@/app/data/messages';

export default function TVgether() {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredChats = Object.entries(chatMessages)
		.filter(([_, data]) =>
			data.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort(([, a], [, b]) => {
			const aTime = a.messages.at(-1)?.timestamp ?? '';
			const bTime = b.messages.at(-1)?.timestamp ?? '';
			return bTime.localeCompare(aTime); // descending
		});

	return (
		<div className="h-svh font-sans">
			<main className="flex flex-col items-center gap-4">
				<div className="fixed z-30 flex w-screen flex-col items-center justify-start gap-x-8 pb-8">
					<div className="flex w-screen flex-row items-center justify-end gap-x-8 bg-slate-100 px-8 pt-8 pb-4 dark:bg-slate-950">
						<div className="ms-1 mt-1 flex h-12 w-full flex-row items-center justify-start gap-x-2 rounded-full bg-slate-200 px-4 dark:bg-slate-800">
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
					<div className="h-4 w-screen bg-linear-to-b from-slate-100 to-transparent dark:from-slate-950"></div>
				</div>

				<div className="mt-24 flex h-full w-full flex-col">
					{filteredChats.map(([slug, chatData], index) => (
						<ChatListEntry
							key={index}
							imgSrc={chatData.img}
							chatName={chatData.name}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
