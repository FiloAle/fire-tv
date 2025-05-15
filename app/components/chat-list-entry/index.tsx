import Link from 'next/link';
import { chatMessages } from '@/app/data/messages';
import Image from 'next/image';

function slugify(str: string) {
	return str
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '');
}

export default function ChatListEntry({
	imgSrc,
	chatName
}: {
	imgSrc: string;
	chatName: string;
}) {
	const chatSlug = slugify(chatName);
	const messages = chatMessages[chatSlug]?.messages ?? [];
	const lastMessage = messages[messages.length - 1];

	return (
		<Link
			href={`/tvgether/${chatSlug}`}
			className="flex h-24 w-full justify-start border-b border-neutral-500/20 font-sans"
		>
			<div className="flex h-full flex-row items-center justify-start gap-4 p-8">
				{imgSrc !== 'group' ? (
					<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-900">
						<Image
							src={'/imgs/' + imgSrc}
							alt=""
							width={400}
							height={400}
						/>
					</div>
				) : (
					<div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-neutral-200 dark:border-neutral-900 dark:bg-neutral-700">
						<span className="material-symbols-rounded text-xl text-neutral-600 dark:text-white">
							{imgSrc}
						</span>
					</div>
				)}

				<div className="flex flex-col">
					<h2 className="text-md font-bold">{chatName}</h2>

					<div className="flex flex-row gap-1">
						<p
							className={`${lastMessage.sender === 'You' || lastMessage.sender === chatName ? 'hidden' : ''} font-semibold opacity-80`}
						>
							{lastMessage.sender}:
						</p>

						<p className="text-neutral-500">{lastMessage.text}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
