import { ADD_TODO, REMOVE_TODO, MARK_TODO } from './actionTypes'

export function todos(state = [], action) {
  const { type, id, text, done } = action
  switch (type) {
    case ADD_TODO:
      return [...state, { id, text, done }]
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== id)
    case MARK_TODO:
      return state.map(todo => {
        if (todo.id === id) todo.done = done
        return todo
      })
    default:
      return state
  }
}
