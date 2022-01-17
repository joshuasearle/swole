import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import client from "../client"
import { useStore } from "../store/store"
import { Provider } from "mobx-react"
import { ToastContainer } from "react-toastify"
import "../styles/toastify.css"
import setup from "../setup/request"
import Navbar from "../components/Navbar"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps?.userData)
  const router = useRouter()

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar={true}
        />

        <div className="fixed h-full w-full bg-gray-100 -z-50"></div>

        <Component {...pageProps} />
        {/* If path is not auth path, navbar that stays constant size */}
        {["/login", "/register"].includes(router.pathname) ? null : <Navbar />}
      </ApolloProvider>
    </Provider>
  )
}

MyApp.getInitialProps = setup

export default MyApp
