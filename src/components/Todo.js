import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getFormattedDueDate } from "../helpers";
import Modal from "./Modal";
import Button from "./ui/Button";
import { bindActionCreators } from "redux";
import * as todoActionCreators from '../store/action creators/TodoActionCreators'

function Todo(props) {
  let history = useHistory();
  let [deleting, setDeleting] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [marking, setMarking] = useState(false);
  let [isDue, setIsDue] = useState(false);
  let dispatch = useDispatch()
  
  const {removeTodo, replaceTodo} = bindActionCreators(todoActionCreators, dispatch)

  useEffect(() => {
    checkTodo();
  }, [props.todo.dueDate, setIsDue]);

  function clickedDelete() {
    setShowModal(true);
  }

  function clickedEdit() {
    history.push(`/todos/${props.todo.id}/edit`, { ...props.todo });
  }

  function checkTodo() {
    if (!props.todo.dueDate) {
      setIsDue(false);
      return;
    }

    if (new Date(props.todo.dueDate).getTime() > new Date().getTime()) {
      setIsDue(false);
      return;
    }

    setIsDue(true);
  }

  async function clickedMark(event) {
    let newStatus = true;

    console.log(`event`, event)
    if (event.target.innerText.includes("undone")) {
      newStatus = false;
    }

    let todo = await markTodo(newStatus);

    if (!todo) {
      return;
    }

    replaceTodo({...todo});
  }

  function clickedCancel() {
    setShowModal(false);
  }

  async function clickedContinue() {
    setShowModal(false);

    let successful = await deleteTodo();

    if (!successful) {
      return;
    }

    removeTodo({ ...props.todo });
  }

  async function deleteTodo() {
    setDeleting(true);

    let status;
    await axios
      .delete(`/todos/${props.todo.id}`)
      .then((response) => {
        status = response.status;
      })
      .catch((error) => {
        console.log(error);
      });

    setDeleting(false);

    if (status === 200) {
      return true;
    }

    return false;
  }

  async function markTodo(newStatus) {
    setMarking(true);

    let todo;
    await axios
      .put(`/todos/${props.todo.id}`, { ...props.todo, done: newStatus })
      .then((response) => {
        todo = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    setMarking(false);

    return todo;
  }

  return (
    <div
      className={
        props.done
          ? "my-2 flex relative flex-col justify-between p-2 w-full  rounded max-w-md h-36 bg-green-100"
          : "my-2 flex relative flex-col justify-between p-2 w-full  rounded max-w-md h-36 bg-indigo-100"
      }
    >
      {deleting && (
        <div className="text-sm text-center text-red-500 my-1">deleting...</div>
      )}
      <div className="text-left">{props.todo.title}</div>
      {props.todo.description ? (
        <div className="text-center text-gray-500 text-sm mt-1">
          {props.todo.description}
        </div>
      ) : null}
      <div className="flex flex-nowrap justify-around items-center">
        {!props.todo.done && (
          <Button className="" onClick={clickedEdit}>
            edit
          </Button>
        )}
        <Button onClick={clickedDelete}>delete</Button>
      </div>
      <div className="flex items-center w-full justify-between">
        {props.todo.done ||
          (isDue && (
            <div className="text-white bg-green-300 p-1 flex-shrink-0">
              {props.todo.done ? "it is done" : isDue ? "it is due" : ""}
            </div>
          ))}
        {props.todo.dueDate && (
          <div className="text-right pr-1 pt-1 text-gray-400 text-sm flex-shrink w-full">
            due on: {getFormattedDueDate(props.todo.dueDate)}
          </div>
        )}
      </div>
      {!isDue ? (
        !props.todo.done ? (
          <Button className="absolute top-1 right-1" onClick={clickedMark}>
            {marking ? "marking..." : "mark as done"}
          </Button>
        ) : (
          <Button className="absolute top-1 right-1" onClick={clickedMark}>
            {marking ? "unmarking..." : "mark as undone"}
          </Button>
        )
      ) : null}
      {showModal && (
        <Modal
          title={`are you sure you want to delete todo with title: ${props.todo.title}`}
          clickedCancel={clickedCancel}
          clickedContinue={clickedContinue}
        />
      )}
    </div>
  );
}

export default Todo;
