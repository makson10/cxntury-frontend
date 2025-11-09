import { useEffect, useState } from 'react';
import * as api from '@/services/api';
import type { Task, TaskState } from '@/types/tasks';

const DEFAULT_TASK_STATE: TaskState = {
	selectedOption: null,
	answerResult: null,
	isSubmitting: false,
};

export default function useTaskSession() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [sessionToken, setSessionToken] = useState<string | null>(null);
	const [taskStates, setTaskStates] = useState<Record<number, TaskState>>({});

	const initializeApp = async () => {
		try {
			const token = await api.getSessionToken();
			setSessionToken(token);

			const fetchedTasks = await api.getTasks();
			setTasks(fetchedTasks);

			const initialStates: Record<number, TaskState> = {};
			fetchedTasks.forEach((task) => {
				initialStates[task.id] = DEFAULT_TASK_STATE;
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
			const result = await api.submitAnswer(taskId, optionId, sessionToken);

			setTaskStates((prev) => ({
				...prev,
				[taskId]: {
					selectedOption: optionId,
					answerResult: { isCorrect: result.correct },
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

			console.error('Failed to submit answer for task', taskId);
		}
	};

	useEffect(() => {
		initializeApp();
	}, []);

	return {
		tasks,
		loading,
		error,
		sessionToken,
		taskStates,
		handleSelectOption,
	};
}
