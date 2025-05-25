import { friends } from '@/app/data/friends';

export interface Message {
	sender: string;
	text: string;
	timestamp: string;
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

const individualChats = [
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
				text: 'Sure, tell me everything!',
				timestamp: '2025-05-22T10:02:00Z'
			}
		]
	},
	{
		friend: friends[1],
		messages: [
			{
				sender: friends[1].name,
				text: "Have you watched this afternoon's F1 race?",
				timestamp: '2025-05-21T09:30:00Z'
			}
		]
	},
	{
		friend: friends[3],
		messages: [
			{
				sender: friends[3].name,
				text: 'Ehilà!',
				timestamp: '2025-05-21T10:30:00Z'
			}
		]
	}
];

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
