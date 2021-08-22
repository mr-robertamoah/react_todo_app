import { useEffect, useRef } from "react"

function Todo({todo, className, isLast, observe, unobserve}) {
    const todoRef = useRef()

    function init() {
        if (! isLast) {
            unobserve(todoRef.current)
            return
        }

        observe(todoRef.current)
    }

    useEffect(() =>{
        init();
    }, [isLast])


    return (
        <div ref={todoRef} className={`flex-shrink-0 md:w-4/12 max-w-40 p-1 bg-white mx-2 rounded shadow cursor-pointer ${className}`}>
            <div className="">{todo.title}</div>
            <div className="text-sm mt-1 text-gray-500">
                <span>created by</span> @{todo.user.username}
            </div>
        </div>
    )
}

export default Todo
