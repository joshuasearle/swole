import "../styles/globals.css"
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import { ApolloProvider, gql } from "@apollo/client"
import client from "../client"
import { useStore } from "../store"
import { Provider } from "mobx-react"
import { parse } from "cookie"
import App from "next/app"
import { NextPageContext } from "next"

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore("")

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext)

  const context: NextPageContext = appContext.ctx

  const returnObject = { ...appProps }

  if (!context.req) return returnObject

  const cookieHeaders = context.req.headers.cookie
  if (!cookieHeaders) return returnObject

  const cookie = parse(cookieHeaders)["sid"]
  if (!cookie) return returnObject

  const me: any = await client.query({
    query: gql`
      query Me {
        me {
          ... on User {
            id
            email

            exercises {
              id
              name
              sets {
                id
              }
            }

            workouts {
              id
              name
              workoutExercises {
                id
                sets
                minReps
                maxReps
                exercise {
                  id
                }
              }
            }

            sets {
              id
              created
              weight
              reps
              rpe
              exercise {
                id
              }
            }
          }
        }
      }
    `,
    context: {
      headers: {
        cookie: `sid=${cookie};`,
      },
    },
  })

  if (me.data.me.email) {
    returnObject.pageProps.email = me.data.me.email
  }

  return returnObject
}

export default MyApp
