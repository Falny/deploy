import { SortHook } from '../../hook/sortHook/sortHook'
import './sort.scss'

export const Sort = () => {
	const {
		onClickCheckedFlowers,
		onClickCheckedFormat,
		onClickCheckedColor,
		onClickCheckedLight,
		onClickReset,
		light,
		color,
		format,
		structure,
		checkedLight,
		checkedColor,
		checkedFormat,
		checkedFlowers,
	} = SortHook()

	return (
		<>
			<div className='catalog-sort'>
				<div className='catalog_common-block'>
					<p className='catalog_sort-title'>По свету</p>
					<div className='c_common_list c_light-list'>
						{light.map(obj => (
							<label
								key={obj.id}
								htmlFor={`light-${obj.id}`}
								className='c_common-item c_light-item'
							>
								<input
									id={`light-${obj.id}`}
									type='checkbox'
									className='c-checbox'
									checked={checkedLight.includes(obj.light)}
									onChange={() => onClickCheckedLight(obj.light)}
								/>
								{obj.light}
							</label>
						))}
					</div>
				</div>
				<div className='catalog_common-block'>
					<p className='catalog_sort-title'>По цвету</p>
					<div className='c_common_list c_color-list'>
						{color.map(obj => (
							<label
								key={obj.id}
								htmlFor={`color-${obj.id}`}
								className='c_common-item c_color-item'
							>
								<input
									id={`color-${obj.id}`}
									type='checkbox'
									className='c-checbox'
									checked={checkedColor.includes(obj.color)}
									onChange={() => onClickCheckedColor(obj.color)}
								/>
								{obj.color}
							</label>
						))}
					</div>
				</div>
				<div className='catalog_common-block'>
					<p className='catalog_sort-title'>по формату</p>
					<div className='c_common_list c_format-list'>
						{format.map(obj => (
							<label
								key={obj.id}
								htmlFor={`format-${obj.id}`}
								className='c_common-item c_format-item'
							>
								<input
									id={`format-${obj.id}`}
									type='checkbox'
									className='c-checbox'
									checked={checkedFormat.includes(obj.format)}
									onChange={() => onClickCheckedFormat(obj.format)}
								/>
								{obj.format}
							</label>
						))}
					</div>
				</div>
				<div className='catalog_common-block'>
					<p className='catalog_sort-title'>по цветку</p>
					<div className='c_common_list c_flower-list'>
						{structure.map(obj => (
							<label
								key={obj.id}
								htmlFor={`flower-${obj.id}`}
								className='c_common-item c_flower-item'
							>
								<input
									id={`flower-${obj.id}`}
									type='checkbox'
									className='c-checbox'
									checked={checkedFlowers.includes(obj.structure)}
									onChange={() => onClickCheckedFlowers(obj.structure)}
								/>
								{obj.structure}
							</label>
						))}
					</div>
				</div>
				<button onClick={() => onClickReset()} className='c_reset-filter'>
					Сбросить фильтр
				</button>
			</div>
		</>
	)
}
