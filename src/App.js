import { Redirect, Route, Switch } from "react-router-dom";
import CenterContainer from "./components/layouts/CenterContainer";
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import EditTodo from "./pages/EditTodo";
import CreateTodo from "./pages/CreateTodo";
import Header from "./components/ui/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import * as todoActionCreators from './store/action creators/TodoActionCreators'
import { useDispatch } from "react-redux";
import Loader from "./components/ui/Loader";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  let [loading, setLoading] = useState(false)
  let [page, setPage] = useState(1)
  let dispatch = useDispatch()
  let {setTodos} = bindActionCreators(todoActionCreators, dispatch)

  async function getTodoList() {
    // if(page > 1) return 

    setLoading(true)

    await axios
      .get("/todos")
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
    <div className="p-2 relative">
      <Loader msg="getting the todos" state={loading && page === 1}></Loader>
      <Header heading="todos" />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/todos" exact>
          <CenterContainer>
            <Todos/>
          </CenterContainer>
        </Route>
        <Route path="/todos/create">
          <CenterContainer>
            <CreateTodo/>
          </CenterContainer>
        </Route>
        <Route path="/todos/:id/edit">
          <CenterContainer>
            <EditTodo />
          </CenterContainer>
        </Route>
        <Route path="/register">
          <CenterContainer>
            <Register />
          </CenterContainer>
        </Route>
        <Route path="/login">
          <CenterContainer>
            <Login />
          </CenterContainer>
        </Route>
        <Route path="/testing">
          <CenterContainer>
            <Testing />
          </CenterContainer>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
