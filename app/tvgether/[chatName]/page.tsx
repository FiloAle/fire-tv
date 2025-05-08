'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';
import { chatMessages } from '@/app/data/messages';
import Link from 'next/link';

export default function ChatPage() {
	const params = useParams();
	const slug = params.chatName;

	const chatIcon = chatMessages[slug as string].icon;
	const chatName = chatMessages[slug as string].name;
	const chatInfo = chatMessages[slug as string].info;
	var messages = chatMessages[slug as string].messages;

	const [inputValue, setInputValue] = useState('');
	const [showReactionPopup, setShowReactionPopup] = useState(false);

	if (!messages) {
		return <p>Chat not found.</p>;
	}

	return (
		<div className="flex h-screen w-screen flex-col justify-between p-8">
			<div className="flex flex-row items-center justify-start gap-4">
				<Link
					href="/tvgether"
					className="material-symbols-rounded -ms-3 -me-5 !text-5xl"
				>
					keyboard_arrow_left
				</Link>

				<span className="material-symbols-rounded !text-5xl">
					{chatIcon}
				</span>

				<div className="flex flex-col">
					<h1 className="text-xl font-bold">{chatName}</h1>
					<p className="text-sm opacity-60">{chatInfo}</p>
				</div>
			</div>

			<div className="flex flex-col">
				<div className="flex flex-col justify-end gap-y-2">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`${msg.sender === 'You' ? 'justify-end' : 'justify-start'} font-sm flex w-full`}
						>
							<div
								className={`${msg.sender === 'You' ? 'rounded-bl-3xl bg-sky-500 text-white' : 'rounded-br-3xl bg-neutral-200 dark:bg-neutral-800'} flex flex-col gap-x-1 rounded-t-3xl px-3.5 py-2`}
							>
								<span
									className={`${msg.sender === 'You' || msg.sender === chatName ? 'hidden' : ''} font-semibold opacity-60`}
								>
									{msg.sender}
								</span>
								{msg.text}
							</div>
						</div>
					))}
				</div>

				<div className="relative w-full pt-6 pb-4">
					<div className="flex h-full w-full flex-row items-center gap-4">
						<input
							className={`${showReactionPopup ? '!pointer-events-none' : ''} h-10 w-full rounded-full border border-neutral-400 bg-neutral-200 p-4 !outline-none dark:border-neutral-600 dark:bg-neutral-800`}
							type="text"
							placeholder="Type a message..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>

						<button
							className="material-symbols-rounded material-symbols-fill -me-1.5 cursor-pointer !text-4xl"
							onClick={() => {
								if (inputValue.trim() === '')
									setShowReactionPopup(!showReactionPopup);
								else {
									const newMessage = {
										sender: 'You',
										text: inputValue.trim()
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
								}
							}}
						>
							{inputValue.trim() === '' ? 'add_reaction' : 'send'}
						</button>
					</div>

					<div
						className={`${showReactionPopup ? 'opacity-100' : '!pointer-events-none opacity-0 !select-none'} absolute right-0 bottom-20 rounded-full bg-neutral-200 px-5 py-4 shadow-lg transition-opacity duration-100 dark:bg-neutral-800`}
					>
						<div className="flex flex-row gap-4 text-4xl">
							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '😄'
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
								}}
							>
								😄
							</button>

							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '🥳'
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
								}}
							>
								🥳
							</button>

							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '😭'
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
								}}
							>
								😭
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
