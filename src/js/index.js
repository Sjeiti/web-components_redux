//import '../index.html'
import './console'
//import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import { expand } from '@emmetio/expand-abbreviation'
import '../style/screen.less'

import './components/todo-list'
import './components/to-do'
import './components/add-todo'
import { store } from './state/store'
import { addTodo } from './state/actions'
import { appendChild, stringToElement } from './utils/html'
import './router'

import {component} from './Component'
/*import '../components/Ul'
import '../components/InputText'
import '../components/Form'
import '../components/Header'
import '../components/FilterList'*/
import './component/Search'
import './component/Header'
component.initialise()

////////////////////////////////////////

const lists = document.querySelectorAll('todo-list')
const list = lists[0]
Array.from(lists[0].children)
  .map(elm => elm.textContent)
  .forEach(todo => store.dispatch(addTodo(todo)))
document.querySelector('add-todo').store = list.store = lists[1].store = store

////////////////////////////////////////

