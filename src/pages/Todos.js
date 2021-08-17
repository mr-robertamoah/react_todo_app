import {  useSelector } from "react-redux";
import Todo from "../components/Todo";

function Todos() {
  let todos = useSelector((state)=> state.todos)

  return (
    <>
      {todos.length ? (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))
      ) : (
        <div className="h-44 w-full flex justify-center items-center text-gray-500 text-sm">
          no todos yet
        </div>
      )}
    </>
  );
}

export default Todos;
