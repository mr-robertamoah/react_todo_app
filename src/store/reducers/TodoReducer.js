import { findIndex } from "../../helpers";
import TodoConstants from "../contants/TodoConstants";

export default function todoReducer(state = [], {type, payload}) {
    switch (type) {
        case TodoConstants.SET_TODOS :
            return setTodos(state, {
                page: payload.page,
                todos: payload.data
            })
        case TodoConstants.SET_PUBLIC_TODOS :
            return setTodos(state, {
                page: payload.page,
                todos: payload.data
            })
        case TodoConstants.ADD_TODO:
            return addTodo(state, payload)
        case TodoConstants.REPLACE_TODO:
            return replaceTodo(state, payload)
        case TodoConstants.REMOVE_TODO:
            return removeTodo(state, payload)
        default:
            return state;
    }
}

function setTodos(todos, data) {
    if (data.page === 1) {
        return [...data.todos]
    }

    return [...todos, ...data.todos]
}

function addTodo(todos, todo) {
    if (!todo) {
        return todos
    }

    return [...todos, todo]
}

function replaceTodo(todos, todo) {
    let oldTodoList = [...todos];

    let index = findIndex({items: todos, fn: (item)=>item.id === todo.id});

    if (index === -1) {
      return;
    }

    oldTodoList.splice(index, 1, todo);

    return [...oldTodoList]
}

function removeTodo(todos, todo) {
  let oldTodoList = [...todos];

  let index = findIndex({items: todos, fn: (item)=>item.id === todo.id});

  if (index === -1) {
    return;
  }

  oldTodoList.splice(index, 1);

  return [...oldTodoList]
}