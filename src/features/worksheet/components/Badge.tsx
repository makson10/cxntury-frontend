const CheckIcon = () => (
	<svg
		className="w-5 h-5 text-white"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={3}
			d="M5 13l4 4L19 7"
		/>
	</svg>
);

const CrossIcon = () => (
	<svg
		className="w-5 h-5 text-white"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={3}
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

const Badge = ({ success }: { success: boolean }) => (
	<div
		className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
			success ? 'bg-success' : 'bg-error'
		} shadow-lg animate-scale-in`}>
		{success ? <CheckIcon /> : <CrossIcon />}
	</div>
);

export default Badge;
