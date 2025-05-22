export interface Event {
	eventImg: string;
	eventName: string;
	eventTime: string;
	eventInfo: string;
	isFavorite: boolean;
}

export const events: Event[] = [
	{
		eventImg: '/imgs/juve-monza.avif',
		eventName: 'Juventus - Monza',
		eventTime: '2025-05-25T20:45:00',
		eventInfo: 'Serie A',
		isFavorite: true
	},
	{
		eventImg: '/imgs/f1.avif',
		eventName: 'Formula 1',
		eventTime: '2025-05-25T16:00:00',
		eventInfo: 'Sprint Race',
		isFavorite: false
	},
	{
		eventImg: '/imgs/psg-inter.avif',
		eventName: 'PSG - Inter',
		eventTime: '2025-05-31T21:00:00',
		eventInfo: 'UEFA Champions League',
		isFavorite: true
	},
	{
		eventImg: '/imgs/nor-ita.avif',
		eventName: 'Norway - Italy',
		eventTime: '2025-06-06T20:45:00',
		eventInfo: 'UEFA Nations League',
		isFavorite: false
	}
];
