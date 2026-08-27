import { Bar } from 'react-chartjs-2'
import {
	Chart,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
	Legend,
} from 'chart.js'
import type { Statistics } from '../types/task.types'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend)

export const BarChartAllTime = ({
	allTimeStat,
}: {
	allTimeStat: Statistics
}) => {
	if (!allTimeStat) return

	const maxValue = Math.max(
		allTimeStat.countCreateTask,
		allTimeStat.countDeleteTask,
		allTimeStat.countExpiredTask,
		allTimeStat.countAddFriend,
		allTimeStat.countCreateProject,
		allTimeStat.countDeleteProject,
		allTimeStat.countTaskWereYouAdd,
		allTimeStat.countProjectWereYouAdd,
	)

	const labelFull = [
		'Созданные задачи',
		'Удаленные задачи',
		'Просроченные задачи',
		'Добавленные друзья',
		'Созданные проекты',
		'Удаленные проекты',
		'Задачи, в которые вы были добавлены',
		'Проекты, в которые вы были добавлены',
	]

	const labelFit = [
		'Созд. задачи',
		'Уд. задачи',
		'Просроч',
		'Доб. друзья',
		'Соз. проекты',
		'Уд. проекты',
		'Задачи доб',
		'Проекты доб',
	]

	const widthAdapt = window.innerWidth > 700

	const data = {
		labels: widthAdapt ? labelFull : labelFit,
		datasets: [
			{
				label: `Статистика за все время`,
				data: [
					allTimeStat.countCreateTask,
					allTimeStat.countDeleteTask,
					allTimeStat.countExpiredTask,
					allTimeStat.countAddFriend,
					allTimeStat.countCreateProject,
					allTimeStat.countDeleteProject,
					allTimeStat.countTaskWereYouAdd,
					allTimeStat.countProjectWereYouAdd,
				],
				backgroundColor: [
					'rgba(112, 194, 186, 0.2)',
					'rgba(152, 119, 191, 0.2)',
					'rgba(252, 129, 129, 0.2)',
					'rgba(243, 186, 47, 0.2)',
					'rgba(42, 113, 208, 0.2)',
					'rgba(42, 208, 111, 0.2)',
					'rgba(117, 81, 183, 0.2)',
					'rgba(219, 195, 159, 0.2)',
				],
				borderColor: [
					'rgb(51, 188, 174)',
					'rgb(233, 216, 253)',
					'rgb(252, 129, 129)',
					'rgb(243, 186, 47)',
					'rgb(42, 113, 208)',
					'rgb(42, 208, 111)',
					'rgb(85, 34, 179)',
					'rgb(219, 195, 159)',
				],
				borderWidth: 1,
				borderRadius: 20,
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				labels: {
					color: '#f6f6f6',
					font: {
						size: 14,
					},
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: '#f6f6f6',
				},
				grid: {
					color: 'rgba(246, 246, 246, 0.3)',
				},
			},
			y: {
				min: 0,
				max: maxValue + 10,
				ticks: {
					stepSize: maxValue + 10 > 20 ? 10 : 3,
					color: '#f6f6f6',
				},
				grid: {
					color: 'rgba(246, 246, 246, 0.3)',
				},
			},
		},
	}

	return <Bar data={data} options={options} />
}
