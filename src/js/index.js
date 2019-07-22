//import '../index.html'
//import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
import { expand } from '@emmetio/expand-abbreviation'
import '../style/screen.less'

import './components/todo-list'
import './components/to-do'
import './components/add-todo'
import { store } from './state/store'
import { addTodo } from './state/actions'
import { appendChild } from './util/html'
import { scroll } from './signal'

window.onerror = function(...arg) {
  const main = document.querySelector('main')
  main.appendChild(document.createTextNode(JSON.stringify(arg)))
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
  //document.querySelector('.hhh')?.setAttribute('data-text',JSON.stringify([e,w,h]))
  //document.querySelector('.nnn')?.setAttribute('data-text',header?.getBoundingClientRect().top)
  //
  header.style.backgroundPosition = `0 ${h/2}px`
}) 

////////////////////////////////////////

const lists = document.querySelectorAll('todo-list')
const list = lists[0]
Array.from(lists[0].children)
  .map(elm => elm.textContent)
  .forEach(todo => store.dispatch(addTodo(todo)))
document.querySelector('add-todo').store = list.store = lists[1].store = store

////////////////////////////////////////

fetch('./data/posts-list.json')
  .then(rs=>rs.json())
  .then(posts=>{
    const main = document.querySelector('main')
    main.insertAdjacentHTML('beforeend', expand(`h1{blog}+ul.unstyled.blog>(${posts.map(
      post=>`(li>a[href="./${post.slug}"]{${post.title}})`
    ).join('+')})`))

    /*alert(expand(`h1{blog}+ul.unstyled.blog>(${posts.map(
      post=>`(li>a[href="./${post.slug}"]{${post.title}})`
    ).join('+')})`))*/

  })

////////////////////////////////////////

fetch('./data/post3328.json')
  .then(rs=>rs.json())
  .then(post=>{
    const main = document.querySelector('main')
    //
    const frag = document.createDocumentFragment()
    appendChild(frag,'h1', post.title.rendered)
    appendChild(frag,'time', post.date.split('T').shift())
    ///
    const tmpl = document.createElement('template')
    tmpl.innerHTML = post.content.rendered
    frag.appendChild(tmpl.content)
    //
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    code.textContent = JSON.stringify(post,null,2)
    pre.appendChild(code)
    frag.appendChild(pre)
    //
    main.appendChild(frag)
  })

