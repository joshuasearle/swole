// This function will be called on the serverside before pre-render
// https://nextjs.org/docs/advanced-features/custom-app

import { ApolloQueryResult } from "@apollo/client"
import { parse } from "cookie"
import { ServerResponse } from "http"
import { NextPageContext } from "next"
import App, { AppContext, AppInitialProps } from "next/app"
import client from "../client"
import { MeDocument, MeQuery } from "../generated/graphql"

async function setup(appContext: AppContext) {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps: AppInitialProps = await App.getInitialProps(appContext)

  // Extract res and req from app context
  const { res, req, pathname }: NextPageContext = appContext.ctx

  // If no res or req info, don't do any setup
  if (!res || !req) return appProps

  // If going to error, skip everything
  if (pathname === "/error") return appProps

  // Extract sid and redirect to `/login` if no cookie
  const cookieHeaders = req.headers.cookie
  if (!cookieHeaders) return redirectAuth(res, pathname)

  const cookie = parse(cookieHeaders)["sid"]
  if (!cookie) return redirectAuth(res, pathname)

  // Initialise response object
  let response: ApolloQueryResult<MeQuery>

  // Try to perform `Me` query to get User information
  try {
    response = await client.query<MeQuery>({
      query: MeDocument,
      context: {
        headers: {
          cookie: `sid=${cookie};`,
        },
      },
    })
  } catch (e) {
    // If there is some error with the server, redirect to error
    return redirectError(res, pathname)
  }

  switch (response?.data.me.__typename) {
    case "User":
      // If cookie is valid, and going to auth path, redirect home
      if (pathname === "/login" || pathname === "/register") {
        return redirect(res, "/")
      }
      // If got a user, send userdata to component to add to mobx store on server-side pre-render
      return {
        ...appProps,
        pageProps: { ...appProps.pageProps, userData: response.data.me },
      }
    case "NotLoggedIn":
      return redirectAuth(res, pathname)
    default:
      return redirectAuth(res, pathname)
  }
}

function redirect(res: ServerResponse, path: string) {
  res.writeHead(302, { location: path })
  res.end()
  return {}
}

function redirectAuth(
  res: ServerResponse,
  current: string,
  path: string = "/login"
) {
  // Don't re-redirect if already going to an auth path
  if (current === "/login" || current === "/register") return {}
  // Also dont redirect if going to error path
  else if (current === "/error") return {}
  else return redirect(res, path)
}

function redirectError(res: ServerResponse, current: string) {
  // Don't re-redirect if already going to error path
  if (current === "/error") return {}
  else return redirect(res, "/error")
}

export default setup
