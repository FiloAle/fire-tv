import { Friend, friends } from '@/app/data/friends';
import { Event, events } from '@/app/data/events';
import { chatMessages } from '@/app/data/messages';

export interface Notification {
	title?: string;
	desc?: string;
	sender: Friend[] | 'System';
	isInvitation: boolean;
	event?: Event[];
}

export const notificationsRaw: Notification[] = [
	{
		sender: [friends[0]],
		isInvitation: true
	},
	{
		sender: 'System',
		isInvitation: false,
		event: [events[0]]
	},
	{
		sender: [friends[1]],
		isInvitation: false
	},
	{
		sender: 'System',
		isInvitation: false,
		event: [events[1]]
	}
];

export const notificationsEvents: Notification[] = notificationsRaw.map(
	(notification) => ({
		...notification,
		event:
			notification.isInvitation &&
			Array.isArray(notification.sender) &&
			typeof notification.sender[0] === 'object'
				? notification.sender[0].event
				: notification.event
	})
);

export const notificationsTitles: Notification[] = notificationsEvents.map(
	(notification) => ({
		...notification,
		title:
			notification.isInvitation &&
			Array.isArray(notification.sender) &&
			typeof notification.sender[0] === 'object'
				? `Join ${notification.sender[0].name} in ${notification.event?.[0].eventName ?? 'an event'}.`
				: typeof notification.sender[0] === 'object'
					? `${notification.sender[0].name} sent you a message`
					: notification.sender === 'System'
						? 'Upcoming event'
						: notification.title
	})
);

export const notifications: Notification[] = notificationsTitles.map(
	(notification) => ({
		...notification,
		desc:
			notification.isInvitation &&
			Array.isArray(notification.sender) &&
			typeof notification.sender[0] === 'object'
				? `${notification.sender[0].name} sent you an invitation.`
				: notification.title === 'Upcoming event'
					? `Don't forget today's ${notification.event?.[0].eventName} event.`
					: typeof notification.sender[0] === 'object'
						? (chatMessages[notification.sender[0].slug]?.messages
								.filter((msg) =>
									typeof notification.sender[0] === 'object'
										? msg.sender ===
											notification.sender[0].name
										: ''
								)
								.at(-1)?.text ?? '')
						: notification.desc
	})
);
