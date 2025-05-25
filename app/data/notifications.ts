import { Friend, friends } from '@/app/data/friends';
import { Event, events } from './events';

export interface Notification {
	title: string;
	desc: string;
	sender: Friend[] | 'System';
	isInvitation: boolean;
	event?: Event[];
}

export const notificationsRaw: Notification[] = [
	{
		title: '',
		desc: '',
		sender: [friends[0]],
		isInvitation: true,
		event: [events[1]]
	},
	{
		title: 'Upcoming event',
		desc: '',
		sender: 'System',
		isInvitation: false,
		event: [events[0]]
	},
	{
		title: 'New message',
		desc: "Have you seen this afternoon's F1 race?",
		sender: [friends[1]],
		isInvitation: false
	},
	{
		title: 'Upcoming event',
		desc: '',
		sender: 'System',
		isInvitation: false,
		event: [events[1]]
	}
];

export const notifications: Notification[] = notificationsRaw.map(
	(notification) => ({
		...notification,
		title:
			notification.isInvitation &&
			Array.isArray(notification.sender) &&
			typeof notification.sender[0] === 'object'
				? `Join ${notification.sender[0].name} in ${notification.event?.[0]?.eventName ?? 'an event'}.`
				: notification.title === 'New message' &&
					  typeof notification.sender[0] === 'object'
					? `${notification.sender[0].name} sent you a message`
					: notification.title,
		desc:
			notification.isInvitation &&
			Array.isArray(notification.sender) &&
			typeof notification.sender[0] === 'object'
				? `${notification.sender[0].name} sent you an invitation.`
				: notification.title === 'Upcoming event'
					? `Don't forget today's ${notification.event?.[0].eventName} event.`
					: notification.desc
	})
);
