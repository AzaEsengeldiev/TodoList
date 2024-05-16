import './App.scss'
import TodoList from './components/TodoList'
import Header from './components/header'
import SecondInput from './components/secondInput'

function App() {
	return (
		<div className='App'>
			<h1 className='flex items-center justify-center mt-10 text-8xl font-extrabold'>
				To do
			</h1>
			<TodoList />
		</div>
	)
}

export default App
