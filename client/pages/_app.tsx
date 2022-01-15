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
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={true}
        />
        {/* div that takes up the entire screen */}
        <div className="h-screen w-full flex flex-col">
          {/* div that grows when parent div grows */}
          <div className="h-full w-full flex-grow-1">
            <Component {...pageProps} />
          </div>
          {/* If path is not auth path, navbar that stays constant size */}
          {["/login", "/register"].includes(router.pathname) ? null : (
            <div className="flex-grow-0">
              <Navbar />
            </div>
          )}
        </div>
      </ApolloProvider>
    </Provider>
  )
}

MyApp.getInitialProps = setup

export default MyApp
