import { useDispatch, useSelector } from "react-redux";
import Card from "../components/layouts/Card";
import CenterContainer from "../components/layouts/CenterContainer";
import Welcome from "../components/Welcome";
import { useEffect, useState } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import * as todoActionCreators from '../store/action creators/TodoActionCreators'
import Todolist from "../components/todo/Todolist";
import NormalLink from "../components/ui/Link";

function Home() {

  let user = useSelector(state=>state.user)
  let publicTodos = useSelector(state=>state.publicTodos)
  let [loading, setLoading] = useState(false)
  let [page, setPage] = useState(1)
  let [next, setNext] = useState(false)
  let dispatch = useDispatch()
  let {setPublicTodos} = bindActionCreators(todoActionCreators, dispatch)

  async function getMorePublicTodos() {
    console.log(next);
    if (!next) {
      return
    }
    
    setLoading(true)

    setPage(page=> page + 1)

    await getPublicTodos()

    setLoading(false)
  }

  async function getPublicTodos() {
    await axios
      .get(`/todos?public=${true}&_expand=user&_page=${page}&_limit=2`)
      .then(async (response) => {
        setPublicTodos({data: response.data, page})

        console.log(!! parseHeaderLink(response.headers.link).next);
        await setNext(!! parseHeaderLink(response.headers.link).next)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function parseHeaderLink(link) {
    let linkArray = link
      .split(', ')
      .map(item=>item.split('; '))
      .map(item=>{
        return [item[1].replace('rel="', '').replace('"', ''), item[0]]
      })

      return Object.fromEntries(linkArray)
  }

  async function getInitialTodos() {

    setLoading(true)

    setPage(1)

    await getPublicTodos()

    setLoading(false)
  }
  
  useEffect(() => {

    getInitialTodos()
  }, []);
  
  return (
    <CenterContainer>
      {user && <Welcome className="my-10" user={user}></Welcome>}
      
    {publicTodos.length ? (<Todolist getMorePublicTodos={getMorePublicTodos} todos={publicTodos}/>) : (
      <div className="w-full my-20 bg-gray-50 p-2 rounded shadow h-36 flex flex-col items-center justify-center">
        <div> no public todos yet</div>
        {!! user ? <div>
          you can <NormalLink to='/todos/create'>create</NormalLink> a public or private todo
        </div> : <div>
          try to <NormalLink to='/login'>login</NormalLink> or <NormalLink to='/register'>register</NormalLink> in order to <NormalLink to='/todos/create'>create</NormalLink> a todo
        </div>}
      </div>
    )}
      
      <Card heading="about this app" className="mt-10">

      </Card>
      <Card heading="what is a todo" className="mt-10">

      </Card>
      <Card heading="creating a todo" className="mt-10">
        
      </Card>
    </CenterContainer>
  );
}

export default Home;
