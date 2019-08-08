import {expand} from '@emmetio/expand-abbreviation'
import {component, BaseComponent} from '../Component'

component.create('[data-search]',class extends BaseComponent{

  constructor(...args){
    super(...args)
    const options = Object.assign({
      id: 'search'+Date.now()
      ,label: 'Search'
      ,placeholder: 'keyword'
      ,submit: 'Search'
      ,autoSuggest: false
    },this._parseOptions(this._element.getAttribute('data-search')))
    this._element.classList.add('search')
    /*this._element.appendChild(BaseComponent.getFragment(`
      <label for="${options.id}">${options.label}</label>
      <input type="search" placeholder="${options.placeholder}" id="${options.id}" />
      <button class="rv-search">${options.submit}</button>
    `))*/
    this._append(`
      label[for=${options.id}]{${options.label}}
      +input#${options.id}[name=${options.id} type=search placeholder="${options.placeholder}"]
      +button.rv-search{${options.submit}}
    `)
    if(options.autoSuggest){
      const input = this._select('input')
      input.addEventListener('keyup',this._onKeyUp.bind(this))
      //
      this._append(`ul.unstyled.autosuggest`)
      //
      fetch('/data/search/words.json')
        .then(res=>res.json(),console.warn)
        .then(words=>this._words = words)
        .catch(console.log.bind(console,'bloody'))
    }
  }

  _onKeyUp(e){
    console.log(!!this._words)
    if (this._words){
      const {target:{value}} = e
      const suggest = this._words.filter(word=>word.includes(value))
      console.log(value,suggest.length)
    }
  }
})
