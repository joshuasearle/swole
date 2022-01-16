import { observer } from "mobx-react"
import Input from "./Input"
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"
import { useStore } from "../store/store"
import PageTitle from "./PageTitle"

interface AuthPageProps {
  submit: (
    email: string,
    password: string,
    setError: Dispatch<SetStateAction<string>>
  ) => void
  title: string
  description: ReactElement
  buttonText: string
}

const AuthPage: React.FC<AuthPageProps> = observer(
  ({ submit, title, description, buttonText }) => {
    const store = useStore()
    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
      if (store.loggedIn) router.replace("/")
    }, [])

    return (
      <div className="h-full flex flex-col">
        <PageTitle title={title} />
        {description}
        {/* Form elements */}
        <div className="mt-6 space-y-6 p-6 bg-white m-6 rounded-md shadow-sm border border-gray-300">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            type="email"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type={showPassword ? "text" : "password"}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-gray-700 focus:ring-teal-700 border-gray-300 rounded"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle
            />
            <label className="ml-2 block text-sm text-gray-700">
              Show password
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-800"
              onClick={() => submit(email, password, setError)}
            >
              {buttonText}
            </button>
          </div>
          {error ? (
            <div className="text-sm text-center mt-6 text-red-700 font-semibold">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)

export default AuthPage
