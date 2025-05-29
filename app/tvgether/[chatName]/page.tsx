'use client';

import { useState, useRef, useEffect } from 'react';

import { useParams } from 'next/navigation';
import { chatMessages } from '@/app/data/messages';
import Link from 'next/link';
import Image from 'next/image';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';
import { events } from '@/app/data/events';
import { pressKey } from '@/app/utils/pressKey';

export default function ChatPage() {
	const params = useParams();
	const slug = params.chatName;

	const chatImg = chatMessages[slug as string].img;
	const chatName = chatMessages[slug as string].name;
	const chatInfo = chatMessages[slug as string].info;
	var messages = chatMessages[slug as string].messages;

	const [inputValue, setInputValue] = useState('');
	const [showReactionPopup, setShowReactionPopup] = useState(false);
	const [messagesUpdated, setMessagesUpdated] = useState(0);
	const lastMessageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messagesUpdated]);

	function formatEventDate(dateString: string) {
		const date = new Date(dateString);

		if (isToday(date)) {
			return `Today, ${format(date, 'HH:mm')}`;
		}

		if (isTomorrow(date)) {
			return `Tomorrow, ${format(date, 'HH:mm')}`;
		}

		if (isThisWeek(date, { weekStartsOn: 1 })) {
			return `This ${format(date, 'eeee')}, ${format(date, 'HH:mm')}`;
		}

		return format(date, 'MMM do, HH:mm');
	}

	if (!messages) {
		return <p>Chat not found.</p>;
	}

	function isMsgOnlyEmoji(text: string) {
		const emojiRegex =
			/^(?:\p{Extended_Pictographic}(?:\uFE0F|\u200D)?\s?){1,3}$/u;
		return emojiRegex.test(text.trim());
	}

	return (
		<div className="flex min-h-svh w-screen flex-col justify-end p-8 font-sans">
			<div className="fixed top-0 z-50 flex w-screen flex-col">
				<div className="flex flex-row items-center justify-between bg-slate-100 pe-14 pt-8 pb-4 dark:bg-slate-950">
					<div className="flex flex-row items-center justify-start gap-4">
						<Link
							href="/tvgether"
							className="material-symbols-rounded -me-3.5 !text-3xl"
						>
							arrow_back_ios
						</Link>

						{chatImg !== 'group' ? (
							<div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-900">
								<Image
									src={chatImg}
									alt=""
									width={600}
									height={600}
									className="object-cover"
								/>
							</div>
						) : (
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-200 dark:border-neutral-800 dark:bg-slate-900">
								<span className="material-symbols-rounded text-xl text-slate-800 dark:text-slate-100">
									{chatImg}
								</span>
							</div>
						)}

						<div className="flex flex-col">
							<h1 className="line-clamp-1 text-xl font-bold">
								{chatName}
							</h1>
							<p className="line-clamp-1 text-sm opacity-60">
								{chatInfo}
							</p>
						</div>
					</div>

					<button
						className="flex h-[2.8rem] w-[2.8rem] shrink-0 items-center justify-center rounded-xl border border-orange-600 bg-gradient-to-b from-[#FF3501] to-[#E11700]"
						onClick={() => {
							const newMessage = {
								sender: 'You',
								timestamp: new Date().toISOString(),
								event: events[0]
							};

							chatMessages[slug as string].messages.push(
								newMessage
							);
							setMessagesUpdated((prev) => prev + 1);
						}}
					>
						<span className="material-symbols-rounded material-symbols-fill !text-3xl">
							person_add
						</span>
					</button>
				</div>

				<div className="z-30 h-4 w-screen bg-linear-to-b from-slate-100 to-transparent dark:from-slate-950" />
			</div>

			<div className="bottom-0 z-10 flex flex-col pt-24 pb-18">
				<div className="flex flex-col justify-end">
					{messages.map((msg, index) => {
						const isEmojiOnly =
							typeof msg.text === 'string'
								? isMsgOnlyEmoji(msg.text)
								: '';

						const isSenderYou = msg.sender === 'You';
						const bubbleClasses = isEmojiOnly
							? ''
							: isSenderYou
								? 'rounded-bl-3xl bg-slate-200 border border-slate-300 dark:bg-slate-700 dark:border-slate-600'
								: 'rounded-br-3xl bg-slate-300 border border-slate-400 dark:bg-slate-900 dark:border-slate-800';

						const prevSender = messages[index - 1]?.sender;
						const marginTop =
							index > 0 && prevSender === msg.sender
								? 'mt-1.5'
								: 'mt-4';

						return (
							<div
								key={index}
								className={`${marginTop} font-sm flex w-full ${isSenderYou ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`${bubbleClasses} flex w-max max-w-72 flex-col gap-x-1 rounded-t-3xl px-3.5 py-2`}
								>
									<span
										className={`${
											msg.sender === 'You' ||
											msg.sender === chatName
												? 'hidden'
												: ''
										} font-semibold opacity-60`}
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
										{msg.event ? (
											<div className="flex h-full w-56 flex-col gap-4 overflow-hidden pt-1.5 pb-2">
												<div className="flex flex-col gap-2">
													<Image
														src={msg.event.eventImg}
														alt={
															msg.event.eventName
														}
														width={1280}
														height={1280}
														className="aspect-5/3 rounded-xl object-cover"
													/>

													<div className="flex flex-col">
														<p className="text-sm">
															{
																msg.event
																	.eventName
															}
														</p>
														<p className="z-0 text-sm opacity-60">
															{
																msg.event
																	.eventInfo
															}{' '}
															•{' '}
															{formatEventDate(
																msg.event
																	.eventTime
															)}
														</p>
													</div>
												</div>

												{msg.sender !== 'You' ? (
													<button
														onClick={() =>
															pressKey('l')
														}
														className="flex h-10 w-full flex-col items-center justify-center overflow-clip rounded-xl border border-orange-600 bg-gradient-to-b from-[#FF3501] to-[#E11700] shadow-lg dark:shadow-neutral-900/20"
													>
														<p className="w-full text-center text-xl font-bold text-neutral-100">
															Join now
														</p>
													</button>
												) : (
													<div className="flex w-full items-center justify-start">
														<p className="text-sm font-medium">
															You have started a
															co-watching session.
														</p>
													</div>
												)}
											</div>
										) : (
											msg.text
										)}
									</span>
								</div>
							</div>
						);
					})}
					<div ref={lastMessageRef} />
				</div>

				<div className="fixed bottom-0 left-0 w-full bg-zinc-100 px-8 pt-6 pb-10 dark:bg-slate-950">
					<div className="flex h-full w-full flex-row items-center gap-4">
						<input
							className={`${showReactionPopup ? '!pointer-events-none' : ''} h-10 w-full rounded-full border border-slate-400 bg-slate-200 p-4 !outline-none dark:border-slate-800 dark:bg-slate-900`}
							type="text"
							placeholder="Type a message..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>

						<button
							className={`material-symbols-rounded material-symbols-fill -me-1.5 cursor-pointer !text-4xl ${
								inputValue.trim() !== ''
									? 'text-orange-600'
									: 'text-slate-500 transition-all hover:text-orange-600 dark:text-slate-600'
							}`}
							onClick={() => {
								if (inputValue.trim() === '')
									setShowReactionPopup(!showReactionPopup);
								else {
									const newMessage = {
										sender: 'You',
										text: inputValue.trim(),
										timestamp: new Date().toISOString()
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
						className={`${showReactionPopup ? 'opacity-100' : '!pointer-events-none opacity-0 !select-none'} absolute right-6 bottom-24 rounded-full border border-slate-400 bg-slate-300 px-5 py-4 shadow-lg transition-opacity duration-100 dark:border-slate-800 dark:bg-slate-900`}
					>
						<div className="flex flex-row gap-4 text-4xl">
							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '😄',
										timestamp: new Date().toISOString()
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
									setMessagesUpdated((prev) => prev + 1);
								}}
							>
								😄
							</button>

							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '🥳',
										timestamp: new Date().toISOString()
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
									setMessagesUpdated((prev) => prev + 1);
								}}
							>
								🥳
							</button>

							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '😭',
										timestamp: new Date().toISOString()
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
									setMessagesUpdated((prev) => prev + 1);
								}}
							>
								😭
							</button>

							<button
								onClick={() => {
									setShowReactionPopup(false);

									const newMessage = {
										sender: 'You',
										text: '❤️',
										timestamp: new Date().toISOString()
									};

									chatMessages[slug as string].messages.push(
										newMessage
									);

									setInputValue('');
									setMessagesUpdated((prev) => prev + 1);
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
