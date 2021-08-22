import TodoConstants from "../contants/TodoConstants"

function setTodos({data, page = null}) {
    return (dispatch)=> {
        dispatch({
            type: TodoConstants.SET_TODOS,
            payload: {page, data}
        })
    }
}

function setPublicTodos({data, page = null}) {
    return (dispatch)=> {
        dispatch({
            type: TodoConstants.SET_PUBLIC_TODOS,
            payload: {page, data}
        })
    }
}

function addTodo(todo) {
    return (dispatch)=> {
        dispatch({
            type: TodoConstants.ADD_TODO,
            payload: todo
        })
    }
}

function replaceTodo(todo) {
    return (dispatch)=> {
        dispatch({
            type: TodoConstants.REPLACE_TODO,
            payload: todo
        })
    }
}

function removeTodo(todo) {
    return (dispatch)=> {
        dispatch({
            type: TodoConstants.REMOVE_TODO,
            payload: todo
        })
    }
}

export {addTodo, setTodos, replaceTodo, removeTodo, setPublicTodos}
