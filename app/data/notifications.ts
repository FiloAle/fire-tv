import { Friend, friends } from '@/app/data/friends';
import { Event, events } from '@/app/data/events';
import { chatMessages } from '@/app/data/messages';
import { format, isThisWeek, isToday, isTomorrow } from 'date-fns';

function formatEventDate(dateString: string) {
	const date = new Date(dateString);

	if (isToday(date)) {
		return `today at ${format(date, 'HH:mm')}`;
	}

	if (isTomorrow(date)) {
		return `tomorrow at ${format(date, 'HH:mm')}`;
	}

	if (isThisWeek(date, { weekStartsOn: 1 })) {
		return `this ${format(date, 'eeee')} at ${format(date, 'HH:mm')}`;
	}

	return format(date, 'MMM do, HH:mm');
}

export interface Notification {
	title?: string;
	desc?: string;
	sender: Friend | 'System';
	isInvitation?: boolean;
	event?: Event;
}

export const notificationsRaw: Notification[] = [
	{
		sender: friends[0]
	},
	{
		sender: 'System',
		event: events[0]
	},
	{
		sender: friends[1]
	},
	{
		sender: 'System',
		event: events[1]
	}
];

export const notificationsInvitations: Notification[] = notificationsRaw.map(
	(notification) => {
		if (typeof notification.sender === 'object') {
			const lastMessage =
				chatMessages[notification.sender.slug]?.messages.at(-1);
			return {
				...notification,
				isInvitation: !!lastMessage?.event
			};
		}

		return {
			...notification,
			isInvitation: false
		};
	}
);

export const notificationsEvents: Notification[] = notificationsInvitations.map(
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
				? `Co-watch ${notification.event?.eventName ?? 'an event'}.`
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
					? notification.event
						? `${notification.event?.eventName}, ${formatEventDate(notification.event?.eventTime)}.`
						: ''
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
