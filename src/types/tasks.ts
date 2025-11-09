export type Task = {
	id: number;
	instruction: string;
	options: TaskOption[];
};

export type TaskOption = {
	id: number;
	text: string;
	isCorrect: boolean;
	taskId: number;
};

export type TaskState = {
	selectedOption: number | null;
	answerResult: { isCorrect: boolean } | null;
	isSubmitting: boolean;
};

export interface SubmitAnswerResponse {
	correct: boolean;
}

export interface GetTokenResponse {
	token: string;
}
