import { addTodo } from '../state/actions'
import { ADD_TODO } from '../state/actionTypes'

window.customElements.define(
  'add-todo',
  class AddTodo extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <input type="text" /><button>add</button>`
      const select = this.shadowRoot.querySelector.bind(this.shadowRoot)
      this.input = select('input')
      select('button').addEventListener('click', this.onclick.bind(this))
    }
    onclick() {
      this._store.dispatch(addTodo(this.input.value))
      this.input.value = ''
    }

    set store(st) {
      this._store = st
    }
  }
)
