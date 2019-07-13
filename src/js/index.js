import './components/todo-list'
import './components/to-do'
import './components/add-todo'
import { store } from './state/store'
import { addTodo } from './state/actions'
import { appendChild } from './util/html'

window.onerror = function(msg, url, line, col, error) {
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;
   alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
};


const lists = document.querySelectorAll('todo-list')
const list = lists[0]

Array.from(lists[0].children)
  .map(elm => elm.textContent)
  .forEach(todo => store.dispatch(addTodo(todo)))

document.querySelector('add-todo').store = list.store = lists[1].store = store

//  mp/postspost3366.json
fetch('./data/posts3366.json')
  .then(rs=>rs.json())
  .then(post=>{
    const main = document.querySelector('main')
    //
    //appendChild(main,'div','sfghsfghhh')
    //appendChild(main,'div',post.id)
    //appendChild(main,'div',post.hasOwnProperty('title'))
    appendChild(main,'h1', post.title.rendered)
    appendChild(main,'div',post.content.rendered)
    //
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    code.textContent = JSON.stringify(post,null,2)
    pre.appendChild(code)
    main.appendChild(pre)
  })

