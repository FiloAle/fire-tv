import Image from 'next/image';

interface CircularBadgeProps {
	imgSrc: string;
	imgWidth: number;
	imgHeight: number;
	divClassName?: string;
	imgClassName?: string;
	title: string;
}

export default function CircularBadge({
	imgSrc,
	imgWidth,
	imgHeight,
	divClassName = '',
	imgClassName = '',
	title
}: CircularBadgeProps) {
	return (
		<div className="flex h-max w-max flex-col items-center gap-3">
			<div
				className={`flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-900 ${divClassName}`}
			>
				<Image
					src={imgSrc}
					alt={title}
					width={imgWidth}
					height={imgHeight}
					className={imgClassName}
				/>
			</div>
			<h1 className="w-24 text-center text-xs">{title}</h1>
		</div>
	);
}
