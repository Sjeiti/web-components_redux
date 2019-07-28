import experiments from 'Experiments/src/experiment/index.js'

import {component, BaseComponent} from '../Component'
import {scroll} from '../signal/scroll'
import {signal} from '../signal'
import {routeChange} from '../router'
import {appendChild} from '../utils/html'

component.create('data-header',class extends BaseComponent{

  constructor(...args){
    super(...args)

    const stuck = signal()

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

    routeChange.add(location=>{
      console.log('pathname',location.pathname)
      const allCurrent = this._element.querySelectorAll(`a[href="${location.pathname}"]`)
      Array.from(allCurrent).forEach(elm=>elm.classList.add('current'))
    })

    stuck.add(console.log.bind(console,'stuck'))

    if (location.pathname==='/'){
      for (let name in experiments){
        console.log(name)
      }
      const experimentWrapper = document.createElement('div')
      experimentWrapper.classList.add('experiment-wrapper')
      this._element.appendChild(experimentWrapper)
      const xp = experiments.starzoom.init(experimentWrapper)
      stuck.add(is=>is?xp.play():xp.pause())
      for (let prop in xp){
        console.log('\t',prop)
      }
    }
  }
})
