import { NextPage } from "next"

import { observer } from "mobx-react"
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { LoginMutation, useLoginMutation } from "../generated/graphql"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useStore } from "../store/store"
import AuthPage from "../components/AuthPage"

const LoginPage: NextPage = observer(() => {
  const store = useStore()
  const router = useRouter()
  const [login] = useLoginMutation()

  const submit = async (
    email: string,
    password: string,
    _: boolean,
    setError: Dispatch<SetStateAction<string>>
  ) => {
    let data: LoginMutation | null | undefined = null

    try {
      const response = await login({ variables: { email, password } })
      data = response.data
    } catch (_) {
      // If something goes wrong, leave `data` as null
    }

    switch (data?.login.__typename) {
      case "User":
        store.hydrate(data.login)
      case "AlreadyLoggedIn":
        // If logged in, user data already hydrated so just redirect
        // If `User` response, hydrate then redirect (notice no `break` statement)
        toast.success("Login successful")
        await router.push("/")
        break
      case "InvalidLoginCredentials":
        setError("Your login credentials were invalid")
        toast.error("Invalid login credentials")
        break
      default:
        router.push("/error")
        break
    }
  }

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/register")
  }

  const description = (
    <p className="mt-2 text-center text-sm text-gray-600">
      {"or "} {/* Hard coded space here */}
      <a
        href="/register"
        onClick={onClick}
        className="font-medium text-teal-700 hover:text-teal-700"
      >
        sign up for free
      </a>
    </p>
  )

  return (
    <AuthPage
      title="Sign in to your account"
      description={description}
      submit={submit}
      buttonText="Sign in"
    />
  )
})

export default LoginPage
