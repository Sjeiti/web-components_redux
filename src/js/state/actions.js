import { ADD_TODO, REMOVE_TODO, MARK_TODO } from './actionTypes'

let nextTodoId = 0

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
    id: nextTodoId++,
    text,
    done: false
  }
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

export function markTodo(id, done) {
  return {
    type: MARK_TODO,
    id,
    done
  }
}
