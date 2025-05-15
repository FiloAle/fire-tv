export interface Message {
	sender: string;
	text: string;
}

export const chatMessages: Record<
	string,
	{ img: string; name: string; info: string; messages: Message[] }
> = {
	tommaso: {
		img: 'tommaso.avif',
		name: 'Tommaso',
		info: 'Now watching Juventus - Monza',
		messages: [
			{ sender: 'Tommaso', text: 'Hey, are you there?' },
			{ sender: 'You', text: 'Sure, tell me everything!' }
		]
	},
	friendsgroup: {
		img: 'group',
		name: 'Friends Group',
		info: 'Alessandro, Tommaso, Daniela, You',
		messages: [{ sender: 'Alessandro', text: 'Ciao!' }]
	},
	daniela: {
		img: 'daniela.avif',
		name: 'Daniela',
		info: 'Offline',
		messages: [{ sender: 'Daniela', text: 'Ciaooo!' }]
	}
};
