import { Redirect, Route, Switch } from "react-router-dom";
import CenterContainer from "./components/layouts/CenterContainer";
import Todos from "./pages/Todos";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import EditTodo from "./pages/EditTodo";
import CreateTodo from "./pages/CreateTodo";
import Header from "./components/ui/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import storageService from "./services/storage.service";
import { useStore } from "react-redux";
import {addUser} from "./store/action creators/UserActionCreators"

function App() {
  const store = useStore()

  async function getUserFromStorage() {
    let storageUser = storageService.getItem({item: 'user', parse: true})

    if (! storageUser) {
      return
    }

    setUserState(storageUser)
  }

  function setUserState(user) {

    store.dispatch(addUser(user))
  }

  useEffect(() =>{
    getUserFromStorage()
  }, [])

  return (
    <div className="p-2 relative">
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
