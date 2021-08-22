import { useEffect, useRef } from "react"
import Todo from "./Todo"

function Todolist({todos, className, getMorePublicTodos}) {
    const todoListRef = useRef()

    let observer = new IntersectionObserver(observerCallback, {
        rootMargin: "8px",
        threshold: 0.5
    })

    function observe (target) {
        observer.observe(target)
    }

    function unobserve (target) {
        observer.unobserve(target)
    }

    function observerCallback(entries, observer) {
        console.log('enters');
        entries.forEach(entry=>{
            if (!entry.isIntersecting) {
                return
            }
            console.log('calls for more');

            getMorePublicTodos()
        })
    }

    function isLast(todoId) {
        return todos[todos.length - 1].id === todoId
    }

    useEffect(()=>{
        
        observer = new IntersectionObserver(observerCallback, {
            root: todoListRef.current,
            rootMargin: "8px",
            threshold: 0.5
        })
    }, [todoListRef])

    return (
        <div ref={todoListRef} className={`w-full bg-gray-100 p-2 flex flex-nowrap items-center overflow-x-auto ${className}`}>
            {todos.map(todo => 
                <Todo 
                    isLast={isLast(todo.id)} 
                    observe={observe} 
                    unobserve={unobserve} 
                    className="w-1/2" 
                    key={todo.id} 
                    todo={todo}/>)}
        </div>
    )
}

export default Todolist
