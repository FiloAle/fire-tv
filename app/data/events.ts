export interface Event {
	eventImg: string;
	eventName: string;
	eventTime: string;
	eventInfo: string;
	eventDesc: string;
	isFavorite: boolean;
}

export const events: Event[] = [
	{
		eventImg: '/imgs/juve-monza.avif',
		eventName: 'Juventus - Monza',
		eventTime: '2025-05-29T12:30:00',
		eventInfo: 'Serie A',
		eventDesc:
			'Juventus are going to face the last match of this Serie A season against an already-relegated Monza.',
		isFavorite: true
	},
	{
		eventImg: '/imgs/f1.avif',
		eventName: 'Spanish Grand Prix',
		eventTime: '2025-05-29T14:00:00',
		eventInfo: 'Formula 1',
		eventDesc:
			'The fight for the championship intensifies at the Spanish Grand Prix as Max Verstappen, Charles Leclerc, and Lewis Hamilton go wheel-to-wheel on one of F1’s most technical circuits.',
		isFavorite: false
	},
	{
		eventImg: '/imgs/psg-inter.avif',
		eventName: 'PSG - Inter',
		eventTime: '2025-05-31T21:00:00',
		eventInfo: 'UEFA Champions League',
		eventDesc:
			'A thrilling showdown awaits as PSG take on Inter in the UEFA Champions League Final. Don’t miss this epic clash for European glory!',
		isFavorite: true
	},
	{
		eventImg: '/imgs/nor-ita.avif',
		eventName: 'Norway - Italy',
		eventTime: '2025-06-06T20:45:00',
		eventInfo: 'UEFA Nations League',
		eventDesc:
			'High stakes in the Nations League as Norway and Italy face off, both vying for a spot in the finals and crucial ranking points.',
		isFavorite: false
	},
	{
		eventImg: '/imgs/f1-2.avif',
		eventName: 'Canadian Grand Prix',
		eventTime: '2025-06-15T16:00:00',
		eventInfo: 'Formula 1',
		eventDesc:
			'At the Spanish Grand Prix, the championship contenders Max Verstappen, Charles Leclerc, and Lewis Hamilton face off fiercely, navigating one of Formula 1’s toughest and most demanding circuits in a high-stakes duel for victory.',
		isFavorite: false
	}
];
