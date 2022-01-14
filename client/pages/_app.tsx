import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import client from "../client"
import { useStore } from "../store/store"
import { Provider } from "mobx-react"
import { ToastContainer } from "react-toastify"
import "../styles/toastify.css"
import setup from "../setup/request"

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps?.userData)

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={true}
        />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

MyApp.getInitialProps = setup

export default MyApp
