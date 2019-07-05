window.customElements.define(
  'todo-list',
  class TodoList extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.initialise()
    }

    connectedCallback() {}

    disconnectedCallback() {}

    set store(st) {
      this._store = st
      const render = () => this.render(st.getState())
      render()
      st.subscribe(render)
    }

    initialise() {
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 0.2rem;
          box-shadow: 0 0 0 1px #EEE;
        }
      </style>
      <slot>...</slot>`
    }
    render(list) {
      const fragment = document.createDocumentFragment()
      list.forEach(({ id, text, done }) => {
        const elm = document.createElement('to-do')
        Object.assign(elm, { id, text, done, dispatch: this._store.dispatch })
        fragment.appendChild(elm)
      })
      this.innerHTML = ''
      this.appendChild(fragment)
    }
  }
)
