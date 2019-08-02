import {parentQuerySelector} from './utils/html'
import {signal} from './signal'
import {component} from './Component'

export const routeChange = signal()

const view = document.querySelector('main')

let defaultRouteResolve
const routes = {}

window.addEventListener('popstate',onPopstate)

let url = ''//location.href

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
  }
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
  let routeKey = ''
  let routeResolve = defaultRouteResolve
  let routeMatch
  for (let route in routes) {
    const routeReg = new RegExp(`^${route.replace(/:[a-z0-9-]+/g,'([a-z0-9-]+)')}$`)
    routeMatch = name.match(routeReg)
    if (routeMatch) {
      routeKey = route
      routeResolve = routes[route]
      break
    }
  }
  console.log('\turl',url,'old',oldUrl,!!routeResolve)
  if (url!==oldUrl){
    routeResolve(view,name||'home')
      .then(page=>{
        console.clear()
        console.log('resolved',JSON.stringify(page))
        console.log('\t',routeKey)
        console.log('\t',routeMatch)
        const title = page.title.rendered||page.title
        const pathname = page.slug==='home'?'':page.slug
        history.pushState({},title,pathname)
        routeChange.dispatch(name,page,oldName)
        component.initialise(view)
        document.body.setAttribute('data-pathname',pathname)
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
