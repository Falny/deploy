import React from 'react'
import './style.scss'
import { BarChart } from '../../components/Charts'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { fetchGetDashBoard } from '../../redux/slices/DashboardSlice'
import useDashboard from '../../HOOKS/useDashboard'
import { BarChartAllTime } from '../../components/ChartsAllTime'

export default function Home() {
	const dateMonth = new Date().getMonth() + 1

	const [selectMonth, setSelectMonth] = React.useState(dateMonth - 1)
	const [toggleSelect, setToggleSelect] = React.useState(false)

	const dispatch = useDispatch<AppDispatch>()

	const refSelect = React.useRef<HTMLUListElement>(null)

	const {
		statistics,
		countCreateTask,
		countDeleteTask,
		countExpiredTask,
		countAddFriend,
		countCreateProject,
		countDeleteProject,
		countTaskWereYouAdd,
		countProjectWereYouAdd,
	} = useDashboard()

	const allTimeStat = {
		countCreateTask: countCreateTask,
		countDeleteTask: countDeleteTask,
		countExpiredTask: countExpiredTask,
		countAddFriend: countAddFriend,
		countCreateProject: countCreateProject,
		countDeleteProject: countDeleteProject,
		countTaskWereYouAdd: countTaskWereYouAdd,
		countProjectWereYouAdd: countProjectWereYouAdd,
	}

	const MonthSelect = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	React.useEffect(() => {
		dispatch(fetchGetDashBoard())
	}, [])

	if (statistics.length === 0 || statistics === null) {
		return <div className='home container'>Загрузка...</div>
	}

	let stat = statistics.find(obj => obj.month == selectMonth + 1)
	const s = stat
		? stat
		: {
				month: selectMonth + 1,
				countCreateTask: 0,
				countDeleteTask: 0,
				countExpiredTask: 0,
				countAddFriend: 0,
				countCreateProject: 0,
				countDeleteProject: 0,
				countTaskWereYouAdd: 0,
				countProjectWereYouAdd: 0,
			}

	const onClickSelect = (e: React.MouseEvent) => {
		const target = e.target as Node

		if (
			toggleSelect &&
			refSelect.current &&
			!refSelect.current.contains(target)
		) {
			setToggleSelect(false)
		}
	}

	return (
		<div className='home container' onClick={e => onClickSelect(e)}>
			<p className='title'>Статистика</p>
			<div className='chart-month'>
				<div className='chart'>
					<BarChart stat={s} month={MonthSelect[selectMonth]} />
					<div className='home-select'>
						<p
							className='select-choice'
							onClick={() => setToggleSelect(!toggleSelect)}
						>
							Выберите месяц: {MonthSelect[selectMonth]}
						</p>
						<ul
							className={`select-list ${toggleSelect ? 'active' : 'inactive'}`}
							ref={refSelect}
						>
							{MonthSelect.map((month, index) => (
								<li
									className='select-item'
									key={index}
									onClick={() => setSelectMonth(index)}
								>
									{month}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='chart'>
					<BarChartAllTime allTimeStat={allTimeStat} />
				</div>
			</div>
		</div>
	)
}
