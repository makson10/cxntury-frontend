import { useState } from 'react';
import type { Task, TaskOption } from '../types/tasks';

interface TaskCardProps {
    task: Task;
    onSelectOption: (taskId: number, optionId: number) => Promise<void>;
    selectedOption: number | null;
    answerResult: {
        isCorrect: boolean;
        message: string;
    } | null;
    isSubmitting: boolean;
}

const TaskCard = ({
    task,
    onSelectOption,
    selectedOption,
    answerResult,
    isSubmitting,
}: TaskCardProps) => {
    const [hoveredOption, setHoveredOption] = useState<number | null>(null);

    const handleOptionClick = async (optionId: number) => {
        if (isSubmitting || selectedOption !== null) return;
        await onSelectOption(task.id, optionId);
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

        if (selectedOption !== null && selectedOption !== option.id) {
            return `${baseClasses} border-gray-200 bg-gray-50 opacity-60`;
        }

        if (hoveredOption === option.id) {
            return `${baseClasses} border-primary bg-primary/5 shadow-md transform scale-[1.02]`;
        }

        return `${baseClasses} border-gray-200 bg-white hover:border-primary-light hover:shadow-md`;
    };

    const renderOptionIcon = (option: TaskOption) => {
        if (selectedOption !== option.id || !answerResult) return null;

        return (
            <div
                className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                    answerResult.isCorrect ? 'bg-success' : 'bg-error'
                } shadow-lg animate-scale-in`}>
                {answerResult.isCorrect ? (
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{task.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Task</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed pl-10">
                    {task.instruction}
                </p>
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
            </div>

            {answerResult && (
                <div
                    className={`mt-6 p-4 rounded-xl border-2 animate-slide-in ${
                        answerResult.isCorrect
                            ? 'bg-success/5 border-success'
                            : 'bg-error/5 border-error'
                    }`}>
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                answerResult.isCorrect ? 'bg-success' : 'bg-error'
                            }`}>
                            {answerResult.isCorrect ? (
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </div>
                        <p
                            className={`text-sm font-medium ${
                                answerResult.isCorrect ? 'text-success' : 'text-error'
                            }`}>
                            {answerResult.message}
                        </p>
                    </div>
                </div>
            )}

            {isSubmitting && (
                <div className="flex justify-center py-2">
                    <div className="w-6 h-6 border-3 border-primary-light border-t-primary rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
