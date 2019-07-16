//import '../index.html'
//import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import '../style/screen.less'

import './components/todo-list'
import './components/to-do'
import './components/add-todo'
import { store } from './state/store'
import { addTodo } from './state/actions'
import { appendChild } from './util/html'
import { scroll } from './signal'

window.onerror = function(msg, url, line, col, error) {
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;
   alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
}

import {component} from './Component'
/*import '../components/Ul'
import '../components/InputText'
import '../components/Form'
import '../components/Header'
import '../components/FilterList'*/
import './component/Search'
component.initialise()

const header = document.querySelector('header')
let lastScrollTop = 0
let lastHeaderTop = 0
scroll.add((e,w,h)=>{
  const headerTop = header.getBoundingClientRect().top
  lastScrollTop!==h&&header.classList.toggle('stuck',h>0&&headerTop===lastHeaderTop)
  lastHeaderTop = headerTop
  lastScrollTop = h
  //
  document.querySelector('.hhh')?.setAttribute('data-text',JSON.stringify([e,w,h]))
  document.querySelector('.nnn')?.setAttribute('data-text',header?.getBoundingClientRect().top)

}) 

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

