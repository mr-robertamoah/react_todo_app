import axios from "axios";
import { useEffect, useState } from "react";
import * as todoActionCreators from "../store/action creators/TodoActionCreators";
import { bindActionCreators } from "redux";
import {  useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import Loader from "../components/ui/Loader";
import Message from "../components/Message";

function Todos() {
  let user = useSelector(state=>state.user)
  let [loading, setLoading] = useState(false)
  let [page, setPage] = useState(1)
  let todos = useSelector((state)=> state.todos)
  let dispatch = useDispatch()
  let {setTodos} = bindActionCreators(todoActionCreators, dispatch)

  async function getTodoList() {
    if (! user) {
      return
    }

    setLoading(true)

    await axios
      .get(`/todos?userId=${user.id}`)
      .then((response) => {
        setTodos({data: response.data, page})
        setPage(page=> page + 1)
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false)
  }
  
  useEffect(() => {

    getTodoList()
  }, []);

  return (
    <div className="w-full h-screen">
      <Loader msg="getting your todos" state={loading && page === 1}></Loader>
      {todos.length ? (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))
      ) : (
        <Message 
          condition={!! user} 
          defaultMessage='you are not logged in' 
          message='no todos yet' 
          className="" 
        />
      )}
    </div>
  );
}

export default Todos;
