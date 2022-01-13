import { NextPage } from "next"

import { observer } from "mobx-react"
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { RegisterMutation, useRegisterMutation } from "../generated/graphql"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import AuthPage from "../components/AuthPage"

const RegisterPage: NextPage = observer(() => {
  const router = useRouter()
  const [register] = useRegisterMutation()

  const submit = async (
    email: string,
    password: string,
    _: boolean,
    setError: Dispatch<SetStateAction<string>>
  ) => {
    let data: RegisterMutation | null | undefined = null

    try {
      const response = await register({ variables: { email, password } })
      data = response.data
    } catch (_) {
      // If something goes wrong, leave `data` as null
    }

    switch (data?.register.__typename) {
      case "User":
        toast.success("Account created")
        await router.push("/login")
        break
      case "EmailAlreadyExists":
        setError("This email address is already in use")
        toast.error("Email already in use")
        break
      default:
        router.push("/error")
        break
    }
  }

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/login")
  }

  const description = (
    <p className="mt-2 text-center text-sm text-gray-600">
      {"or "} {/* Hard coded space here */}
      <a
        href="/login"
        onClick={onClick}
        className="font-medium text-teal-700 hover:text-teal-700"
      >
        sign in here
      </a>
    </p>
  )

  return (
    <AuthPage
      title="Sign up for free"
      buttonText="Sign up"
      description={description}
      submit={submit}
      showRememberMe={false}
    />
  )
})

export default RegisterPage
