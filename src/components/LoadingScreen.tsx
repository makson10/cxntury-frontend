import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

const LoadingScreen = () => (
	<div className="min-h-screen bg-gray-50 flex flex-col">
		<Header />
		<main className="flex-1 flex items-center justify-center">
			<div className="text-center space-y-4">
				<LoadingSpinner />
				<p className="text-gray-600 text-lg">Loading your tasks...</p>
			</div>
		</main>
	</div>
);

export default LoadingScreen;
