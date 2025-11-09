const LoadingSpinner = () => (
	<div className={`flex items-center justify-center`}>
		<div
			className={`w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin`}></div>
	</div>
);

export default LoadingSpinner;
