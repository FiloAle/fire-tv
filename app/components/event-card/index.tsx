import Image from 'next/image';

export default function EventCard({
	eventImg,
	eventName,
	eventTime
}: {
	eventImg: string;
	eventName: string;
	eventTime: string;
}) {
	return (
		<div className="flex h-64 flex-col gap-y-2">
			<div className="relative h-52 w-80 shrink-0 overflow-hidden rounded-xl shadow-lg dark:shadow-neutral-900/20">
				<Image
					src={eventImg}
					alt={eventName}
					fill
					className="pointer-events-none object-cover"
				/>
			</div>

			<div className="flex flex-col">
				<h1 className="text-lg font-semibold opacity-80">
					{eventName}
				</h1>
				<h3 className="text-sm font-medium opacity-20">{eventTime}</h3>
			</div>
		</div>
	);
}
