import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Form from "../components/ui/Form";
import axios from "axios";
import DateInput from "../components/ui/DateInput";
import { bindActionCreators } from "redux";
import * as todoActionCreators from '../store/action creators/TodoActionCreators'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

function EditTodo(props) {
  let history = useHistory();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let user = useSelector(state=>state.user);
  let [message, setMessage] = useState("");
  let [disabled, setDisabled] = useState(false);

  let dispatch = useDispatch()
  let {replaceTodo} = bindActionCreators(todoActionCreators, dispatch)

  async function onInputChange(event) {
    resetError();

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

  function initiate() {
    if (! user) {
      setDisabled(true)
      setMessage('you have not logged in')
      return
    }

    if (! history.location.state?.title) {
      setDisabled(true)
      setMessage('there is no valid todo to edit')
      return
    }

    if (!title.length) {
      setTitle(history.location.state.title);
    }

    if (!description.length) {
      setDescription(history.location.state.description);
    }

    if (!dueDate?.length) {
      setDueDate(history.location.state.dueDate);
    }
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

    let todo = await edit();

    if (!todo) {
      return;
    }

    replaceTodo(todo)

    setLoading(false);

    history.push("/todos");
  }

  useEffect(() => {
    initiate();
  });

  async function edit() {

    let todo = null;

    await axios
      .patch(`/todos/${history.location.state.id}`, {
        id: history.location.state.id,
        title,
        description,
        dueDate,
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
      heading="edit a todo"
      loading={loading}
      error={error}
      submitText="edit todo"
      loadingText="updating"
    >
      <Input
        className="mb-2"
        placeholder="add name"
        initialValue={history.location.state?.title}
        onChange={onInputChange}
        disabled={disabled}
      />
      <Textarea
        className="mb-2"
        placeholder="add description"
        onChange={onInputChange}
        initialValue={history.location.state?.description}
        disabled={disabled}
      />
      <DateInput
        className="mb-2"
        initialValue={history.location.state?.dueDate}
        onChange={onInputChange}
        disabled={disabled}
      />
    </Form>
    <Message
      condition={! user}
      defaultMessage={!! history.location.state ? `edit the todo with title ${history.location.state.title}` : ''}
      message={message}
    />
    </>
  );
}

export default EditTodo;
