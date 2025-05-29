import { friends } from '@/app/data/friends';
import { Event, events } from '@/app/data/events';

export interface Message {
	sender: string;
	text?: string;
	timestamp: string;
	event?: Event;
}

function slugify(str: string) {
	return str
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '');
}

const groupsRaw = [
	{
		name: 'Football Lovers',
		members: [friends[0], friends[1], friends[2]]
	}
];

const groups = groupsRaw.map((group) => ({
	...group,
	slug: slugify(group.name),
	info: [...group.members.map((m) => m.name).sort(), 'You'].join(', ')
}));

const groupsChats = groups.map((group) => ({
	group: {
		name: group.name,
		info: group.info,
		slug: group.slug
	},
	messages: [
		{
			sender: group.members[0].name,
			text: 'Hey guys! Are you ready?',
			timestamp: '2025-05-21T11:00:00Z'
		},
		{
			sender: 'You',
			text: 'Is that even a question?',
			timestamp: '2025-05-21T11:01:00Z'
		},
		{
			sender: group.members[1].name,
			text: 'Come on Tommaso 😹',
			timestamp: '2025-05-21T11:03:00Z'
		},
		{
			sender: group.members[2].name,
			text: "Of course we are! I'm already tuned in.",
			timestamp: '2025-05-21T11:05:00Z'
		}
	]
}));

const individualChatsRaw = [
	{
		friend: friends[0],
		messages: [
			{
				sender: friends[0].name,
				text: 'Hey, are you there?',
				timestamp: '2025-05-22T10:00:00Z'
			},
			{
				sender: 'You',
				text: "Sure, what's up?",
				timestamp: '2025-05-22T10:02:00Z'
			},
			{
				sender: friends[0].name,
				text: 'Would you like to watch Juventus - Monza together? ⚽',
				timestamp: '2025-05-22T10:00:00Z'
			},
			{
				sender: 'You',
				text: 'Count me in!',
				timestamp: '2025-05-22T10:02:00Z'
			},
			{
				sender: friends[0].name,
				timestamp: '2025-05-22T10:05:00Z',
				event: friends[0].event
			}
		]
	},
	{
		friend: friends[1],
		messages: [
			{
				sender: friends[1].name,
				text: "Will you watch this afternoon's F1 race? 🏎️",
				timestamp: '2025-05-21T09:30:00Z'
			}
		]
	},
	{
		friend: friends[2],
		messages: [
			{
				sender: friends[2].name,
				text: 'Hey, is there any chance that you and Tommaso are going to cowatch Juventus - Monza today?',
				timestamp: '2025-05-21T10:30:00Z'
			},
			{
				sender: 'You',
				text: "Absolutely, we won't miss it. 😉",
				timestamp: '2025-05-21T10:32:00Z'
			}
		]
	},
	{
		friend: friends[3],
		messages: [
			{
				sender: friends[3].name,
				text: "Have you seen yesterday's F1 sprint race results? 🏎️ 🏁",
				timestamp: '2025-05-21T10:25:00Z'
			},
			{
				sender: friends[3].name,
				text: "I've just watched the highlights... no words! 😱",
				timestamp: '2025-05-21T10:27:00Z'
			}
		]
	}
];

const individualChats = individualChatsRaw.map(({ friend, messages }) => ({
	friend,
	messages: messages.map((msg) =>
		msg.event
			? {
					...msg,
					text: `${friend.name} sent you an invitation.`
				}
			: msg
	)
}));

export const chatMessages: Record<
	string,
	{ img: string; name: string; info: string; messages: Message[] }
> = {
	...Object.fromEntries(
		individualChats.map(({ friend, messages }) => [
			friend.slug,
			{
				img: friend.imgSrc,
				name: friend.name,
				info: friend.info,
				messages
			}
		])
	),
	...Object.fromEntries(
		groupsChats.map(({ group, messages }) => [
			group.slug,
			{
				img: 'group',
				name: group.name,
				info: group.info,
				messages
			}
		])
	)
};
