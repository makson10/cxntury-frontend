import Header from './components/Header';
import TaskCard from './features/worksheet/components/TaskCard';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import Footer from './components/Footer';
import NoTasks from './features/worksheet/components/NoTasks';
import WorksheetHeader from './features/worksheet/components/WorksheetHeader';
import useTaskSession from './hooks/useTaskSession';

const App = () => {
	const { tasks, loading, error, taskStates, handleSelectOption } =
		useTaskSession();

	if (loading) {
		return <LoadingScreen />;
	}

	if (error) {
		return (
			<ErrorScreen message={error} onRetry={() => window.location.reload()} />
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Header />
			<main className="flex-1 py-8">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<WorksheetHeader />

					<div className="space-y-6">
						{tasks.map((task) => (
							<TaskCard
								key={task.id}
								task={task}
								handleSelectOption={handleSelectOption}
								taskState={taskStates[task.id]}
							/>
						))}
					</div>

					{tasks.length === 0 && <NoTasks />}
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default App;
