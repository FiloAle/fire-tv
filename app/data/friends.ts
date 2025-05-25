export interface Friend {
	name: string;
	info: string;
	imgSrc: string;
	slug: string;
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
		info: 'Watching Juventus - Monza',
		imgSrc: '/imgs/tommaso.avif'
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
		info: 'Now watching Juventus - Monza'
	}
];

export const friends: Friend[] = friendsRaw.map((friend) => ({
	...friend,
	slug: slugify(friend.name),
	imgSrc: friend.imgSrc || '/imgs/account.avif'
}));
