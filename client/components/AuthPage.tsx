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

interface AuthPageProps {
  submit: (
    email: string,
    password: string,
    rememberMe: boolean,
    setError: Dispatch<SetStateAction<string>>
  ) => void
  title: string
  description: ReactElement
  showRememberMe?: boolean
  buttonText: string
}

const AuthPage: React.FC<AuthPageProps> = observer(
  ({ submit, title, description, showRememberMe = true, buttonText }) => {
    const store = useStore()
    const router = useRouter()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
      if (store.loggedIn) router.replace("/")
    }, [])

    return (
      <div className="p-6">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          {title}
        </h1>
        {description}
        {/* Form elements */}
        <div className="mt-6 space-y-6">
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
            type="password"
          />
          {showRememberMe ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-teal-700 focus:ring-teal-700 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} // Toggle
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          ) : null}
          <div className={showRememberMe ? "" : "pt-4"}>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-800"
              onClick={() => submit(email, password, rememberMe, setError)}
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