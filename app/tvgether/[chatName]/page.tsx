'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';
import { chatMessages } from '@/app/data/messages';
import Link from 'next/link';
import Image from 'next/image';

export default function ChatPage() {
	const params = useParams();
	const slug = params.chatName;

	const chatImg = chatMessages[slug as string].img;
	const chatName = chatMessages[slug as string].name;
	const chatInfo = chatMessages[slug as string].info;
	var messages = chatMessages[slug as string].messages;

	const [inputValue, setInputValue] = useState('');
	const [showReactionPopup, setShowReactionPopup] = useState(false);

	if (!messages) {
		return <p>Chat not found.</p>;
	}

	function isMsgOnlyEmoji(text: string) {
		const emojiRegex =
			/^(?:\p{Extended_Pictographic}(?:\uFE0F|\u200D)?\s?){1,3}$/u;
		return emojiRegex.test(text.trim());
	}

	return (
		<div className="flex h-screen w-screen flex-col justify-between p-8 font-sans">
			<div className="flex flex-row items-center justify-start gap-4">
				<Link
					href="/tvgether"
					className="material-symbols-rounded -ms-3 -me-5 !text-5xl"
				>
					keyboard_arrow_left
				</Link>

				{chatImg !== 'group' ? (
					<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-900">
						<Image
							src={'/imgs/' + chatImg}
							alt=""
							width={400}
							height={400}
						/>
					</div>
				) : (
					<div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-slate-200 dark:border-neutral-800 dark:bg-slate-900">
						<span className="material-symbols-rounded text-xl text-slate-800 dark:text-slate-100">
							{chatImg}
						</span>
					</div>
				)}

				<div className="flex flex-col">
					<h1 className="text-xl font-bold">{chatName}</h1>
					<p className="text-sm opacity-60">{chatInfo}</p>
				</div>
			</div>

			<div className="flex flex-col">
				<div className="flex flex-col justify-end gap-y-2">
					{messages.map((msg, index) => {
						const isEmojiOnly = isMsgOnlyEmoji(msg.text);

						const isSenderYou = msg.sender === 'You';
						const bubbleClasses = isEmojiOnly
							? ''
							: isSenderYou
								? 'rounded-bl-3xl bg-orange-600 text-white'
								: 'rounded-br-3xl bg-slate-200 dark:bg-slate-800';

						return (
							<div
								key={index}
								className={`${isSenderYou ? 'justify-end' : 'justify-start'} font-sm flex w-full`}
							>
								<div
									className={`${bubbleClasses} flex flex-col gap-x-1 rounded-t-3xl px-3.5 py-2`}
								>
									<span
										className={`${msg.sender === 'You' || msg.sender === chatName ? 'hidden' : ''} font-semibold opacity-60`}
									>
										{msg.sender}
									</span>
									<span
										className={
											isEmojiOnly
												? '-me-4 pt-2 text-6xl'
												: ''
										}
									>
										{msg.text}
									</span>
								</div>
							</div>
						);
					})}
				</div>

				<div className="relative w-full pt-6 pb-4">
					<div className="flex h-full w-full flex-row items-center gap-4">
						<input
							className={`${showReactionPopup ? '!pointer-events-none' : ''} h-10 w-full rounded-full border border-slate-400 bg-slate-200 p-4 !outline-none dark:border-slate-800 dark:bg-slate-900`}
							type="text"
							placeholder="Type a message..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>

						<button
							className="material-symbols-rounded material-symbols-fill -me-1.5 cursor-pointer !text-4xl text-slate-500 dark:text-slate-600"
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
						className={`${showReactionPopup ? 'opacity-100' : '!pointer-events-none opacity-0 !select-none'} absolute right-0 bottom-20 rounded-full bg-slate-300 px-5 py-4 shadow-lg transition-opacity duration-100 dark:bg-slate-900`}
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

							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '❤️'
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
								}}
							>
								❤️
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
