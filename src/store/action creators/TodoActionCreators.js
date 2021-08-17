function setTodos({data, page = null}) {
    return (dispatch)=> {
        dispatch({
            type: 'setTodos',
            payload: {page, data}
        })
    }
}

function addTodo(todo) {
    return (dispatch)=> {
        dispatch({
            type: 'addTodo',
            payload: todo
        })
    }
}

function replaceTodo(todo) {
    return (dispatch)=> {
        dispatch({
            type: 'replaceTodo',
            payload: todo
        })
    }
}

function removeTodo(todo) {
    return (dispatch)=> {
        dispatch({
            type: 'removeTodo',
            payload: todo
        })
    }
}

export {addTodo, setTodos, replaceTodo, removeTodo}
