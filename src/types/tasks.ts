export interface Task {
	id: number;
	instruction: string;
	options: TaskOption[];
}

export interface TaskOption {
	id: number;
	text: string;
	isCorrect: boolean;
	taskId: number;
}

export interface SubmitAnswerResponse {
	success: boolean;
	isCorrect: boolean;
	message: string;
}
