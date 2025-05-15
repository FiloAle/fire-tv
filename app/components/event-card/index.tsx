import { Toggle } from '@/components/ui/toggle';
import Image from 'next/image';

export default function EventCard({
	eventImg,
	eventName,
	eventTime,
	isFavorite
}: {
	eventImg: string;
	eventName: string;
	eventTime: string;
	isFavorite: boolean;
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

				<Toggle
					variant="default"
					className="group absolute top-2 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-neutral-900/80 dark:text-white"
				>
					<span
						className={`material-symbols-rounded !text-[1.4rem] text-white transition-all group-hover:text-black ${
							isFavorite ? 'material-symbols-fill' : ''
						}`}
					>
						favorite
					</span>
				</Toggle>
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
