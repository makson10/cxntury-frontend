import axios from 'axios';
import type {
	Task,
	SubmitAnswerResponse,
	GetTokenResponse,
} from '@/types/tasks';

const api = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
});

const SESSION_STORAGE_KEY = 'session_token';

export const getSessionToken = async (): Promise<string> => {
	const storedToken = sessionStorage.getItem(SESSION_STORAGE_KEY);
	if (storedToken) return storedToken;

	const response = await api.get<GetTokenResponse>('/session');
	const token = response.data.token;
	sessionStorage.setItem(SESSION_STORAGE_KEY, token);
	return token;
};

export const getTasks = async (): Promise<Task[]> => {
	const response = await api.get<Task[]>('/tasks');
	return response.data;
};

export const submitAnswer = async (
	taskId: number,
	optionId: number,
	token: string
): Promise<SubmitAnswerResponse> => {
	const response = await api.post<SubmitAnswerResponse>(
		`/tasks/${taskId}/answer`,
		{ optionId },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};
