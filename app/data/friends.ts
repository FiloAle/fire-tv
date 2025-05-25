import { Event, events } from './events';

export interface Friend {
	name: string;
	info: string;
	imgSrc: string;
	slug: string;
	event?: Event[];
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

export const friendsRaw = [
	{
		name: 'Tommaso',
		imgSrc: '/imgs/tommaso.avif',
		event: [events[0]]
	},
	{
		name: 'Daniela',
		info: 'Offline',
		imgSrc: '/imgs/daniela.avif'
	},
	{
		name: 'Alessandro',
		info: 'Offline'
	},
	{
		name: 'Filippo',
		event: [events[1]]
	}
];

export const friends: Friend[] = friendsRaw.map((friend) => ({
	...friend,
	slug: slugify(friend.name),
	imgSrc: friend.imgSrc || '/imgs/account.avif',
	info: friend.event
		? `Now watching ${friend.event[0].eventName}`
		: (friend.info ?? '')
}));
