import type { NextPage } from "next"
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { observer } from "mobx-react"
import { useStore } from "../store"
import { Register, RegisterVariables } from "../__generated__/Register"

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      __typename
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      __typename
    }
  }
`

const Home: NextPage = observer((props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [register, registerResult] = useMutation<Register, RegisterVariables>(
    REGISTER_MUTATION,
    {
      variables: { email, password },
    }
  )

  const [login, loginResult] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
  })

  return (
    <div>
      <label>Email</label>
      <br />
      <input
        type="text"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <br />

      <label>Password</label>
      <br />

      <input
        type="text"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={() => register()}>Register</button>
      <button onClick={() => login()}>Login</button>

      <br />

      <pre>{JSON.stringify(registerResult.data, null, 2)}</pre>
      <pre>{JSON.stringify(loginResult.data, null, 2)}</pre>
    </div>
  )
})

export default Home
