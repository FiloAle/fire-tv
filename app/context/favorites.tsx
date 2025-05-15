'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { events as initialEvents, Event } from '@/app/data/events';

interface FavoritesContextType {
	events: Event[];
	toggleFavorite: (name: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const [events, setEvents] = useState<Event[]>(initialEvents);

	const toggleFavorite = (name: string) => {
		setEvents((prevEvents) =>
			prevEvents.map((e) =>
				e.eventName === name ? { ...e, isFavorite: !e.isFavorite } : e
			)
		);
	};

	return (
		<FavoritesContext.Provider value={{ events, toggleFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}
	return context;
}
