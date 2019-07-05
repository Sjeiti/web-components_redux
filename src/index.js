import './components/todo-list'
import './components/to-do'
import './components/add-todo'
import { store } from './state/store'
import { addTodo } from './state/actions'

const lists = document.querySelectorAll('todo-list')
const list = lists[0]

Array.from(lists[0].children)
  .map(elm => elm.textContent)
  .forEach(todo => store.dispatch(addTodo(todo)))

document.querySelector('add-todo').store = list.store = lists[1].store = store
