import { useEffect, useState } from 'react';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import LoadingSpinner from './components/LoadingSpinner';
import { getSessionToken, getTasks, submitAnswer } from './services/api';
import type { Task } from './types/tasks';

interface TaskState {
	selectedOption: number | null;
	answerResult: {
		isCorrect: boolean;
		message: string;
	} | null;
	isSubmitting: boolean;
}

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [taskStates, setTaskStates] = useState<Record<number, TaskState>>({});

	useEffect(() => {
		const initializeApp = async () => {
			try {
				// Get session token
				const token = await getSessionToken();
				setSessionToken(token);

				// Fetch tasks
				const fetchedTasks = await getTasks();
				setTasks(fetchedTasks);

				// Initialize task states
				const initialStates: Record<number, TaskState> = {};
				fetchedTasks.forEach((task) => {
					initialStates[task.id] = {
						selectedOption: null,
						answerResult: null,
						isSubmitting: false,
					};
				});
				setTaskStates(initialStates);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to load tasks. Please try again.'
				);
			} finally {
				setLoading(false);
			}
		};

		initializeApp();
	}, []);

	const handleSelectOption = async (taskId: number, optionId: number) => {
		if (!sessionToken) return;

		setTaskStates((prev) => ({
			...prev,
			[taskId]: {
				...prev[taskId],
				isSubmitting: true,
			},
		}));

		try {
			const result = await submitAnswer(taskId, optionId, sessionToken);

			setTaskStates((prev) => ({
				...prev,
				[taskId]: {
					selectedOption: optionId,
					answerResult: {
						isCorrect: result.isCorrect,
						message: result.message,
					},
					isSubmitting: false,
				},
			}));
		} catch {
			setTaskStates((prev) => ({
				...prev,
				[taskId]: {
					...prev[taskId],
					isSubmitting: false,
				},
			}));
			alert('Failed to submit answer. Please try again.');
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex flex-col">
				<Header />
				<main className="flex-1 flex items-center justify-center">
					<div className="text-center space-y-4">
						<LoadingSpinner size="lg" />
						<p className="text-gray-600 text-lg">Loading your tasks...</p>
					</div>
				</main>
			</div>
		);
	}

	if (error) {
		return (
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
						<p className="text-gray-600">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
							Retry
						</button>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Header />
			<main className="flex-1 py-8">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="space-y-4 mb-6">
						<h2 className="text-3xl font-bold text-gray-900">Your Worksheet</h2>
						<p className="text-gray-600">
							Complete all tasks below. Select the correct answer for each
							question.
						</p>
					</div>

					<div className="space-y-6">
						{tasks.map((task) => (
							<TaskCard
								key={task.id}
								task={task}
								onSelectOption={handleSelectOption}
								selectedOption={taskStates[task.id]?.selectedOption ?? null}
								answerResult={taskStates[task.id]?.answerResult ?? null}
								isSubmitting={taskStates[task.id]?.isSubmitting ?? false}
							/>
						))}
					</div>

					{tasks.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">
								No tasks available at the moment.
							</p>
						</div>
					)}
				</div>
			</main>

			<footer className="bg-white border-t border-gray-200 py-6">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							© 2025 Worksheet Tasks. All rights reserved.
						</p>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 rounded-full bg-primary"></div>
							<div className="w-2 h-2 rounded-full bg-primary-light"></div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
