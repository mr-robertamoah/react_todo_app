import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Form from "../components/ui/Form";
import DateInput from "../components/ui/DateInput";
import { bindActionCreators } from "redux";
import * as todoActionCreators from '../store/action creators/TodoActionCreators'
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../components/ui/Checkbox";
import { useEffect } from "react";
import Message from "../components/Message";

function CreateTodo(props) {
  let todos = useSelector((state)=> state.todos)
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState();
  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [dueDate, setDueDate] = useState();
  let [isPublic, setIsPublic] = useState(false);
  let history = useHistory();
  let user = useSelector(state=>state.user);
  let [message, setMessage] = useState("");
  let [disabled, setDisabled] = useState(false);

  let dispatch = useDispatch()
  let {addTodo} = bindActionCreators(todoActionCreators, dispatch)

  useEffect(()=>{
    function init() {
      if (!user) {
        setDisabled(true)
        setMessage('you have not logged in')
      }
    }

    init()
  }, [user])

  async function onInputChange(event) {
    resetError();

    if (event.target.type === "checkbox") {
      await setIsPublic(event.target.value);
      return;
    }

    if (event.target.localName === "textarea") {
      await setDescription(event.target.value);
      return;
    }

    if (event.target.type === "datetime-local") {
      await setDueDate(event.target.value);
      return;
    }

    await setTitle(event.target.value);
  }

  function resetError() {
    if (!error?.length) {
      return;
    }

    setError("");
  }

  async function onButtonClicked(event) {
    if (!title?.length) {
      setError("the title is required");
      return;
    }

    if (!description?.length) {
      setError("the description is required");
      return;
    }

    if (!dueDate?.length) {
      setError("the due date is required");
      return;
    }
    setLoading(true);

    let todo = await create();

    if (!todo) {
      return;
    }

    await addTodo(todo)

    setLoading(false);

    history.push("/todos");
  }

  async function create() {

    let todo;

    await axios
      .post(`/todos`, {
        id: todos.length ? parseInt(todos[todos.length - 1].id) + 1 : 1,
        title,
        description,
        dueDate,
        public: isPublic,
        createdAt: new Date().toUTCString()
      })
      .then((response) => {
        todo = response.data;
      })
      .catch((error) => {
        console.log(`error`, error);
      });

    return todo;
  }

  return (
    <>
    <Form
      onSubmit={onButtonClicked}
      heading="create a todo"
      loading={loading}
      error={error}
      submitText="create todo"
      loadingText="creating"
    >
      <Input
        className="mb-2"
        placeholder="add title"
        onChange={onInputChange}
        disabled={disabled}
      />
      <Textarea
        className="mb-2"
        placeholder="add description"
        onChange={onInputChange}
        disabled={disabled}
      />
      <DateInput 
        className="mb-2" 
        onChange={onInputChange} 
        disabled={disabled}
      />
      <Checkbox
        className="mb-2"
        placeholder="make public"
        id="checkbox-1"
        onChange={onInputChange}
        disabled={disabled}
      />
    </Form>
    <Message
      condition={! user}
      defaultMessage="create a todo now"
      message={message}
    />
    </>
  );
}

export default CreateTodo;
