import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { bindActionCreators } from "redux"
import Form from "../components/ui/Form"
import Input from "../components/ui/Input"
import * as UserActionCreators from "../store/action creators/UserActionCreators"

function Login(props) {
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(false)
    let [password, setPassword] = useState('')
    let [username, setUsername] = useState('')

    let dispatch = useDispatch()
    let {addUser} = bindActionCreators(UserActionCreators, dispatch)

    let history = useHistory()

    async function onButtonClicked () {
      if (! password.length) {
        await setError('please password is required')
        return
      }
      
      if (! username.length) {
        await setError('please username is required')
        return
      }

      setLoading(true)

      let user = await loginUser()

      setLoading(false)

      if (!user) {
        return
      }

      addUser(user)

      history.push('/')
    }

    async function loginUser() {
      let response = await axios.get(`/users?username=${username}&password=${password}`)
        .catch(error=>{
          console.log(`error`, error.response)
          return null
        })

        return response.data[0]
    }

    async function onInputChange(event) {

        if (event.target.attributes.id.value === 'password') {
          await setPassword(event.target.value)
          return
        }

        await setUsername(event.target.value)
    }

    return (
    <Form
    onSubmit={onButtonClicked}
    heading="login"
    loading={loading}
    error={error}
    submitText="login"
    loadingText="login in"
  >
    <Input
      className="mb-2"
      id="username"
      placeholder="enter username"
      onChange={onInputChange}
    />
    <Input
      id="password"
      className="mb-2"
      type="password"
      placeholder="enter password"
      onChange={onInputChange}
    />
  </Form>
    )
}

export default Login
