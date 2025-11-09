import type { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

type Props = { children: ReactNode };

function Fallback({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) {
	return (
		<div
			role="alert"
			className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
				<h2 className="text-xl font-bold text-gray-900">
					Something went wrong
				</h2>
				<p className="text-gray-600">
					{error?.message || 'An unexpected error occurred'}
				</p>
				<div className="flex items-center justify-center gap-3">
					<button
						onClick={resetErrorBoundary}
						className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
						Try again
					</button>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
						Reload Page
					</button>
				</div>
			</div>
		</div>
	);
}

export default function ErrorBoundary({ children }: Props) {
	return (
		<ReactErrorBoundary
			FallbackComponent={Fallback}
			onError={(error: Error, info: { componentStack: string }) => {
				console.error('Error caught by boundary:', error, info);
			}}>
			{children}
		</ReactErrorBoundary>
	);
}
