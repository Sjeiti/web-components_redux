import {component, BaseComponent} from '../Component'
import { scroll } from '../signal'

component.create('data-header',class extends BaseComponent{

  constructor(...args){
    super(...args)

    const header = this._element//document.querySelector('header')
    let lastScrollTop = 0
    let lastHeaderTop = 0
    scroll.add((e,w,h)=>{
      const headerTop = header.getBoundingClientRect().top
      lastScrollTop!==h&&header.classList.toggle('stuck',h>0&&headerTop===lastHeaderTop)
      lastHeaderTop = headerTop
      lastScrollTop = h
      //
      header.style.backgroundPosition = `0 ${h/2}px`
    })
  }
})
