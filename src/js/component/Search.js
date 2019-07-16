import {component, BaseComponent} from '../Component'

component.create('data-search',class extends BaseComponent{

  constructor(...args){
    super(...args)
    const options = this._options = Object.assign({
      id: 'search'+Date.now(),
      label: 'Search',
      placeholder: 'keyword',
      submit: 'Search'
    },this._options)
    this._element.classList.add('search')
    this._element.appendChild(BaseComponent.getFragment(`
      <label for="${options.id}">${options.label}</label>
      <input type="search" placeholder="${options.placeholder}" id="${options.id}" />
      <input type="button" class="rv-search" value="${options.submit}" />
    `))
  }
})
