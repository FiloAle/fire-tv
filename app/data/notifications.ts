import { Friend, friends } from '@/app/data/friends';
import { Event, events } from '@/app/data/events';
import { chatMessages } from '@/app/data/messages';

export interface Notification {
	title?: string;
	desc?: string;
	sender: Friend | 'System';
	isInvitation: boolean;
	event?: Event;
}

export const notificationsRaw: Notification[] = [
	{
		sender: friends[0],
		isInvitation: true
	},
	{
		sender: 'System',
		isInvitation: false,
		event: events[0]
	},
	{
		sender: friends[1],
		isInvitation: false
	},
	{
		sender: 'System',
		isInvitation: false,
		event: events[1]
	}
];

export const notificationsEvents: Notification[] = notificationsRaw.map(
	(notification) => ({
		...notification,
		event:
			notification.isInvitation && typeof notification.sender === 'object'
				? notification.sender.event
				: notification.event
	})
);

export const notificationsTitles: Notification[] = notificationsEvents.map(
	(notification) => ({
		...notification,
		title:
			notification.isInvitation && typeof notification.sender === 'object'
				? `Join ${notification.sender.name} in ${notification.event?.eventName ?? 'an event'}.`
				: typeof notification.sender === 'object'
					? `${notification.sender.name} sent you a message`
					: notification.sender === 'System'
						? 'Upcoming event'
						: notification.title
	})
);

export const notifications: Notification[] = notificationsTitles.map(
	(notification) => ({
		...notification,
		desc:
			notification.isInvitation && typeof notification.sender === 'object'
				? `${notification.sender.name} sent you an invitation.`
				: notification.title === 'Upcoming event'
					? `Don't forget today's ${notification.event?.eventName} event.`
					: typeof notification.sender === 'object'
						? (chatMessages[notification.sender.slug]?.messages
								.filter((msg) =>
									typeof notification.sender === 'object'
										? msg.sender ===
											notification.sender.name
										: ''
								)
								.at(-1)?.text ?? '')
						: notification.desc
	})
);
