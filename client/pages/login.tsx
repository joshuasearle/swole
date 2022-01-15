import { NextPage } from "next"

import { observer } from "mobx-react"
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { useLoginMutation } from "../generated/graphql"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useStore } from "../store/store"
import AuthPage from "../components/AuthPage"
import { request } from "../client"

const LoginPage: NextPage = observer(() => {
  const store = useStore()
  const router = useRouter()
  const [login] = useLoginMutation()

  const submit = async (
    email: string,
    password: string,
    setError: Dispatch<SetStateAction<string>>
  ) => {
    const data = await request(
      login({ variables: { email, password } }),
      router
    )

    if (!data) return

    switch (data.login.__typename) {
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
        await router.push("/error")
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
