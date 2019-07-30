// <pre line-numbers><code data-language="glsl" data-src="http://...

import {component, BaseComponent} from '../Component'
import {scroll} from '../signal/scroll'
import {signal} from '../signal'
import {routeChange} from '../router'
import {appendChild} from '../utils/html'
import {prismToElement} from '../utils/prism'
import {nextTick} from '../utils'

component.create('code[data-src]',class extends BaseComponent{

  constructor(...args){
    super(...args)

    const src = this._element.getAttribute('data-src')
    console.log('code src',src)
    fetch(src)
      .then(res=>res.text())
      .then(text=>{
        this._element.textContent = text
        // todo: can be done without nextTick/redraw
        nextTick(()=>prismToElement(this._element))
      })
  }
})
