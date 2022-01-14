import { ApolloClient, FetchResult, InMemoryCache } from "@apollo/client"
import error from "./error/error"
import { NextRouter } from "next/router"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
})

// Requests a gql result with automatic error handling
// Just returns null if it unknown error
export async function request<T>(
  resultPromise: Promise<FetchResult<T>>,
  router: NextRouter
) {
  try {
    const response = await resultPromise
    const data = response.data
    return data
  } catch (_) {
    // If something goes wrong, leave `data` as null
    await error(router)
    return null
  }
}

export default client
