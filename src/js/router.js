import { expand } from '@emmetio/expand-abbreviation'
import {parentQuerySelector} from './utils/html'
import {signal} from './signal'

export const routeChange = signal()

requestAnimationFrame(()=>routeChange.dispatch(Object.assign({},location)))

const view = document.querySelector('main')

let defaultRouteResolve
const routes = {}

window.addEventListener('popstate',onPopstate)

let url = location.href
;['click','keydown','mouseup','touchend']
  .forEach(event=>document.body.addEventListener(event, onUserInput, !true))

function onPopstate(e){
  console.log("location: " + document.location + ", state: " + JSON.stringify(e.state))
}

function onUserInput(e){
  const target = e.touches&&e.touches.length&&e.touches[0].target||e.target
  console.log('t',!!target,target&&parentQuerySelector(target,'a',true))
  const anchor = target&&parentQuerySelector(target,'a[href^="/"]',true)
    console.log(anchor&&'####################################')
  if (anchor) {
    open(anchor.getAttribute('href'))
    e.preventDefault()
    console.log('foooooooooo')
    return false
  } else {
    requestAnimationFrame(()=>{
      url!==location.href&&console.log('url changed');
      url!==location.href&&open(location.href)
      url = location.href;
    });
  }
    e.stopImmediatePropagation()
    e.preventDefault()
    return false
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
  const {pathname} = new URL(uri)
  const name = pathname.replace(/^\/|\/$/g,'')
  console.log('\t','name',name)
  let routeResolve = defaultRouteResolve
  for (let route in routes) {
    if (route===name) {
      routeResolve = routes[route]
      console.log('\tfound')
      break
    }
  }
  routeResolve(view,name)
}
