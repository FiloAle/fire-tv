export interface Message {
	sender: string;
	text: string;
}

export const chatMessages: Record<
	string,
	{ icon: string; name: string; info: string; messages: Message[] }
> = {
	tommaso: {
		icon: 'person',
		name: 'Tommaso',
		info: 'Now watching Juventus - Monza',
		messages: [
			{ sender: 'Tommaso', text: 'Hey, are you there?' },
			{ sender: 'You', text: 'Sure, tell me everything!' }
		]
	},
	friendsgroup: {
		icon: 'group',
		name: 'Friends Group',
		info: 'Alessandro, Tommaso, Daniela, You',
		messages: [{ sender: 'Alessandro', text: 'Ciao!' }]
	},
	daniela: {
		icon: 'person',
		name: 'Daniela',
		info: 'Offline',
		messages: [{ sender: 'Daniela', text: 'Ciaooo!' }]
	}
};
