import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActionCreators from "../../store/action creators/UserActionCreators";
import { useHistory } from "react-router-dom";
import HeaderLink from "./HeaderLink";
import { useEffect, useState } from "react";

function Header({heading}) {
  let history = useHistory();
  let [pathName, setPathName] = useState('');

  history.listen(()=>{
    changePathName()
  })
  
  function changePathName() {
    setPathName(history.location.pathname)
  }

  useEffect(() => {
    changePathName()
  }, [])

  let user = useSelector(state=>state.user)
  let dispatch = useDispatch()
  let {removeUser} = bindActionCreators( UserActionCreators, dispatch)

  function clickedHeading() {
    if (history.location?.pathname === "/") {
      return;
    }

    history.push("/");
  }

  async function clickedLogout() {
    await removeUser()

    history.push("/login");
  }

  return (
    <header className="w-full min-h-20 border-b-2 border-green-300 flex flex-nowrap items-center">
      <div className="w-full text-center flex-shrink">
        <h1
          className="text-2xl font-bold capitalize cursor-pointer"
          onClick={clickedHeading}
        >
          {heading}
        </h1>
      </div>
      <div className="flex-shrink-0 flex items-center">
        {(! user && pathName !== '/register') && (
          <HeaderLink
            to="/register"
            className="mr-2"
          >
            register
          </HeaderLink>
        )}
        {(! user && pathName !== '/login') && (
          <HeaderLink
            to="/login"
            className=""
          >
            login
          </HeaderLink>
        )}
        {user && (<>
          <HeaderLink
            to="/todos"
            className="mr-2"
          >
            view todos
          </HeaderLink>
          <HeaderLink
            to="/todos/create"
            className="mr-2"
          >
            create todo
          </HeaderLink>
          <div
            onClick={clickedLogout}
            className="header-link mr-2 cursor-pointer"
          >
            logout
          </div>
        </>
        )}
      </div>
    </header>
  );
}

export default Header;
