export interface Event {
	eventImg: string;
	eventName: string;
	eventTime: string;
	isFavorite: boolean;
}

export const events: Event[] = [
	{
		eventImg: '/imgs/juve-monza.avif',
		eventName: 'Juventus - Monza',
		eventTime: '2025-05-15T20:45:00',
		isFavorite: true
	},
	{
		eventImg: '/imgs/f1.avif',
		eventName: 'Formula 1',
		eventTime: '2025-05-18T21:00:00',
		isFavorite: false
	},
	{
		eventImg: '/imgs/psg-inter.avif',
		eventName: 'PSG - Inter',
		eventTime: '2025-05-31T21:00:00',
		isFavorite: true
	}
];
