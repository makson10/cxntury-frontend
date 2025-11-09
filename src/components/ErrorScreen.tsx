import Header from './Header';

interface Props {
	message: string | null;
	onRetry?: () => void;
}

const ErrorScreen = ({ message, onRetry }: Props) => (
	<div className="min-h-screen bg-gray-50 flex flex-col">
		<Header />
		<main className="flex-1 flex items-center justify-center">
			<div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center space-y-4">
				<div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto">
					<svg
						className="w-8 h-8 text-error"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h2 className="text-xl font-bold text-gray-900">Oops!</h2>
				<p className="text-gray-600">{message ?? 'Something went wrong.'}</p>
				<button
					onClick={onRetry}
					className="cursor-pointer mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
					Retry
				</button>
			</div>
		</main>
	</div>
);

export default ErrorScreen;
