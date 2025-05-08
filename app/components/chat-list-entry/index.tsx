import Link from 'next/link';
import { chatMessages } from '@/app/data/messages';

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
	icon,
	chatName
}: {
	icon: string;
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
				<span className="material-symbols-rounded !text-5xl">
					{icon}
				</span>

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
