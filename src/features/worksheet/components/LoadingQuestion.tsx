const LoadingQuestion = () => (
	<div className="absolute inset-0 z-20 rounded-3xl bg-white/70 backdrop-blur-sm grid place-items-center">
		<div
			className="w-8 h-8 border-3 border-primary-light border-t-primary rounded-full animate-spin"
			aria-hidden="true"></div>
		<span className="sr-only">Loading question…</span>
	</div>
);

export default LoadingQuestion;
