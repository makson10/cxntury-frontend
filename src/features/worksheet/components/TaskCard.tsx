import { useState } from 'react';
import type { Task, TaskOption, TaskState } from '@/types/tasks';
import Badge from './Badge';
import LoadingQuestion from './LoadingQuestion';

interface Props {
	task: Task;
	taskState: TaskState;
	handleSelectOption: (taskId: number, optionId: number) => Promise<void>;
}

const TaskCard = ({ task, handleSelectOption, taskState }: Props) => {
	const [hoveredOption, setHoveredOption] = useState<number | null>(null);
	const { selectedOption, answerResult, isSubmitting } = taskState;

	const handleOptionClick = async (optionId: number) => {
		if (isSubmitting || selectedOption !== null) return;
		await handleSelectOption(task.id, optionId);
	};

	const getOptionClasses = (option: TaskOption) => {
		const baseClasses =
			'relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer';

		if (selectedOption === option.id && answerResult) {
			return `${baseClasses} ${
				answerResult.isCorrect
					? 'border-success bg-success/10 shadow-lg shadow-success/20'
					: 'border-error bg-error/10 shadow-lg shadow-error/20'
			}`;
		}

		if (answerResult && !answerResult.isCorrect && option.isCorrect) {
			return `${baseClasses} border-success bg-success/5 shadow-md shadow-success/10`;
		}

		if (selectedOption !== null && selectedOption !== option.id) {
			return `${baseClasses} border-gray-200 bg-gray-50 opacity-60`;
		}

		if (hoveredOption === option.id) {
			return `${baseClasses} border-primary bg-primary/5 shadow-md transform scale-[1.02]`;
		}

		return `${baseClasses} border-gray-200 bg-white hover:border-primary-light hover:shadow-md`;
	};

	const renderOptionIcon = (option: TaskOption) => {
		if (!answerResult) return null;

		if (selectedOption === option.id) {
			return <Badge success={answerResult.isCorrect} />;
		}

		if (!answerResult.isCorrect && option.isCorrect) {
			return <Badge success />;
		}
	};

	return (
		<div className="relative bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
			<div className="space-y-2">
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
						<span className="text-sm font-bold text-primary">{task.id}</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-900">
						{task.instruction}
					</h3>
				</div>
			</div>

			<div className="space-y-3 pt-2">
				{task.options.map((option) => (
					<div
						key={option.id}
						className={getOptionClasses(option)}
						onClick={() => handleOptionClick(option.id)}
						onMouseEnter={() => setHoveredOption(option.id)}
						onMouseLeave={() => setHoveredOption(null)}>
						{renderOptionIcon(option)}
						<div className="flex items-center space-x-3">
							<div
								className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
									selectedOption === option.id
										? answerResult?.isCorrect
											? 'border-success bg-success'
											: 'border-error bg-error'
										: hoveredOption === option.id
										? 'border-primary'
										: 'border-gray-300'
								}`}>
								{selectedOption === option.id && (
									<div className="w-2 h-2 rounded-full bg-white"></div>
								)}
							</div>
							<span
								className={`text-base ${
									selectedOption === option.id ? 'font-semibold' : 'font-medium'
								} ${
									selectedOption === option.id
										? 'text-gray-900'
										: 'text-gray-700'
								}`}>
								{option.text}
							</span>
						</div>
					</div>
				))}
				{isSubmitting && <LoadingQuestion />}
			</div>
		</div>
	);
};

export default TaskCard;
