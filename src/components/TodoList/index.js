import { data } from 'autoprefixer'
import React, { useState, useEffect } from 'react'
import { MdDeleteForever, MdDone } from 'react-icons/md'

const TodoList = () => {
	const [value, setValue] = useState('')
	const [array, setArray] = useState([])
	const [secondValue, setSecondValue] = useState('')

	const task = () => {
		if (value.trim() !== '' || secondValue.trim() !== '') {
			const data = JSON.parse(localStorage.getItem('todoData')) || []
			const newItem = {
				id: Date.now(),
				taskName: secondValue,
				todo: value,
				isDone: false
			}
			data.push(newItem)
			localStorage.setItem('todoData', JSON.stringify(data))
			setValue('')
			setSecondValue('')
			view()
		}
		// console.log(data)
	}

	const view = () => {
		const newTask = JSON.parse(localStorage.getItem('todoData')) || []
		setArray(newTask)
	}

	const handleDelete = index => {
		const updatedData = array.filter((item, idx) => idx !== index)
		localStorage.setItem('todoData', JSON.stringify(updatedData))
		setArray(updatedData)
	}
	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			task()
		}
	}
	// handleKeyPress()

	const handleToggle = index => {
		const newArray = [...array]

		newArray[index].isDone = !newArray[index].isDone
		localStorage.setItem('todoData', JSON.stringify(newArray))

		setArray(newArray)
		// console.log(array)
	}

	useEffect(() => {
		view()
	}, [])
	// console.log(secondValue)
	return (
		<div className='TodoList'>
			<div className='TodoBlock mt-20 w-full flex items-center justify-center gap-2'>
				<div className='mb-2 flex flex-col gap-1 '>
					<h1 className='text-xl'>TodoName</h1>
					<input
						type='text'
						id='large-input'
						onKeyPress={handleKeyPress}
						value={value}
						onChange={e => setValue(e.target.value)}
						className='h-1 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					/>
				</div>
				<button
					type='button'
					onClick={task}
					className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-sans-serif rounded-lg text-xl px-3 py-0.4 mt-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
				>
					+
				</button>
			</div>
			<div className='TodoBlock2  w-full flex items-center justify-center gap-2'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-xl'>todo</h1>
					<input
						value={secondValue}
						type='text'
						onKeyPress={handleKeyPress}
						onChange={e => {
							setSecondValue(e.target.value)
						}}
						className='h-1 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					/>
				</div>
				<button
					onClick={task}
					className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-sans-serif rounded-lg text-xl px-3 py-0.4 mt-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
				>
					+
				</button>
			</div>

			<div className='test flex flex-col items-center justify-center gap-5 mt-10 ease-linear'>
				{array.map((el, idx) => (
					<div
						key={el.id}
						className={`list w-96 flex items-center justify-between h-15  ease-out rounded-md p-3 ${
							el.isDone ? 'bg-green-400' : 'bg-black'
						}`}
					>
						<div className='todoText'>
							<h1 style={{ color: 'white' }}>
								<span
									style={{
										color: '#8E8E8E',
										fontWeight: '700'
									}}
								>
									todoName:
								</span>{' '}
								{el.todo}
							</h1>
							<h1 style={{ color: 'white' }}>
								<span
									style={{
										color: '#8E8E8E',
										fontWeight: '700'
									}}
								>
									todo:
								</span>{' '}
								{el.taskName}
							</h1>
						</div>
						<div className='flex items-center gap-2'>
							<button
								onClick={() => handleToggle(idx)}
								style={{
									padding: el.isDone ? '4px' : '10px',
									background: el.isDone ? 'white' : '#047857',
									color: el.isDone ? 'black' : 'white'
								}}
								type='button'
								className='text-black border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-1 py-1 dark:bg-white-800 dark:text-black dark:border-white-600 dark:hover:bg-white-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
							>
								{el.isDone ? <MdDone /> : ' '}
							</button>
							<button
								type='button'
								onClick={() => handleDelete(idx)}
								className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
							>
								<MdDeleteForever />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TodoList
