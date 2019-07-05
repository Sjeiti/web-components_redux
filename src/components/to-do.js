import { removeTodo, markTodo } from '../state/actions'

window.customElements.define(
  'to-do',
  class Todo extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: block;
          margin: 0.2rem 0.4rem; 
          padding: 0.2rem 0.4rem; 
          font-family: 'Overpass Mono', monospace;
          font-size: 0.75rem;
          line-height: 0.75rem;
          color: black;
          box-shadow: 1px 2px 2px rgba(0,0,0,0.3);
          text-transform: capitalize;
        }
      </style>
      <input type="checkbox" /><slot>...</slot><button>x</button>`
      this.button = this.shadowRoot.querySelector('button')
      this.button.addEventListener('click', this.onClickDelete.bind(this))
      this.checkbox = this.shadowRoot.querySelector('input')
      this.checkbox.addEventListener('change', this.onInputChange.bind(this))
    }
    onClickDelete() {
      this._dispatch(removeTodo(this._id))
    }
    onInputChange() {
      this._dispatch(markTodo(this._id, this.done))
    }
    set dispatch(dispatch) {
      this._dispatch = dispatch
    }
    get id() {
      return this._id
    }
    set id(id) {
      this._id = id
    }
    get text() {
      return this.textContent
    }
    set text(string) {
      this.textContent = string
    }
    get done() {
      return this.checkbox.checked
    }
    set done(checked) {
      this.checkbox.checked = checked
    }
  }
)
