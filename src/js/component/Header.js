import experiments from 'Experiments/src/experiment/index.js'

import {component, BaseComponent} from '../Component'
import {scroll} from '../signal/scroll'
import {signal} from '../signal'
import {routeChange} from '../router'
import {appendChild} from '../utils/html'

component.create('[data-header]',class extends BaseComponent{

  constructor(...args){
    super(...args)
    
    const stuck = signal()

    let experiment

    const header = this._element//document.querySelector('header')
    let lastScrollTop = 0
    let lastHeaderTop = 0
    scroll.add((e,w,h)=>{
      const headerTop = header.getBoundingClientRect().top
      if (lastScrollTop!==h){
        const isStuck = h>0&&headerTop===lastHeaderTop
        const wasStuck = header.classList.contains('stuck')
        if (wasStuck!==isStuck){
          header.classList.toggle('stuck',isStuck)
          stuck.dispatch(isStuck)
        }
      }
      lastHeaderTop = headerTop
      lastScrollTop = h
      //
      header.style.backgroundPosition = `0 ${h/2}px`
    })

    routeChange.add((name,page,oldName)=>{
      console.log('Header:routeChange',name)
      const current = 'current'
      const seldo = (selector,fn)=>Array.from(this._element.querySelectorAll(selector)).forEach(fn)
      const select = page.type==='post'?'blog':name
      seldo('.'+current,elm=>elm.classList.remove(current))
      seldo(`a[href="/${select}"]`,elm=>elm.classList.add(current))
    })

    const experimentWrapper = document.createElement('div')
    experimentWrapper.classList.add('experiment-wrapper')
    this._element.appendChild(experimentWrapper)
    stuck.add(is=>experiment?.pause(is))
    function experimentation(name,oldName){
      if (!name&&experiment){
        experiment.exit()
        experiment = null
      } else if (name&&!experiment){
        experiment = experiments.starzoom
        experiment.init(experimentWrapper)
      }
    }

    if (location.pathname==='/'){
      for (let name in experiments){
        console.log(name)
      }
    }
  }
})
