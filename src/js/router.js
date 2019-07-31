import { expand } from '@emmetio/expand-abbreviation'
import {parentQuerySelector} from './utils/html'
import {signal} from './signal'
import {component} from './Component'

export const routeChange = signal()

//requestAnimationFrame(()=>open(location.pathname))

const view = document.querySelector('main')

let defaultRouteResolve
const routes = {}

window.addEventListener('popstate',onPopstate)

let animFrame
let url = ''//location.href
;['click','keydown','mouseup','touchend']
  .forEach(event=>document.body.addEventListener(event, onUserInput, true))
document.body.addEventListener('click', onClick, true)

function onPopstate(){
  open(location.href)
}

function onClick(e){
  //e.preventDefault()
  const target = e.touches&&e.touches.length&&e.touches[0].target||e.target
  //console.log('t',!!target,target&&parentQuerySelector(target,'a',true))
  const anchor = target&&parentQuerySelector(target,'a[href^="/"]',true)
  //console.log(anchor&&'####################################')
  if (anchor) {
    e.preventDefault()
    open(anchor.getAttribute('href'))
    cancelAnimationFrame(animFrame)
  }
}

function onUserInput(e){
  animFrame = requestAnimationFrame(()=>{
    const {href} = location
    url!==href&&console.log('url changed',url,href)
    // todo: url!==href&&open(href)
  })
}

export function setDefault(fn){
  defaultRouteResolve = fn
}

export function add(...names){//,callback
  const callback = names.pop()
  names.forEach(name=>routes[name]=callback)
}

export function open(uri){
  console.log('open',uri)
  const pathname = getPathname(uri)
  const oldUrl = url
  const oldName = getName(getPathname(oldUrl))
  url = getURL(pathname)
  const name = getName(pathname)
  console.log('\tname',name,'empty',name==='',/^\s*$/.test(name))
  let routeResolve = defaultRouteResolve
  for (let route in routes) {
    if (route===name) {
      routeResolve = routes[route]
      console.log('\troute found')
      break
    }
  }
  console.log('\turl',url,'old',oldUrl,!!routeResolve)
  if (url!==oldUrl){
    routeResolve(view,name||'home')
      .then(page=>{
        console.clear()
        console.log('resolved',JSON.stringify(page))
        const title = page.title.rendered||page.title
        history.pushState({},title,page.slug)
        routeChange.dispatch(name,page,oldName)
        component.initialise(view)
      })
  }
}

function getName(pathname){
  return pathname.replace(/^\/|\/$/g,'')
}

function getURL(pathname){
  return  location.origin+pathname
}

function getPathname(uri){
  return new URL(getIsFullURI(uri)?uri:getURL(uri)).pathname
}

function getIsFullURI(uri){
  return /^(\w+:)?\/\//.test(uri)
}
