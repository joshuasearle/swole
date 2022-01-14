// This function will be called on the serverside before pre-render
// https://nextjs.org/docs/advanced-features/custom-app

import { ApolloQueryResult } from "@apollo/client"
import { parse } from "cookie"
import { IncomingMessage, ServerResponse } from "http"
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
  if (isErrorPath(pathname)) return appProps

  // Extract sid
  const sid = extractCookie(req)
  if (!sid) return redirectAuth(res, pathname)

  // Request user data
  const response = await requestMe(sid)
  if (!response) return redirectError(res, pathname)

  switch (response.data.me.__typename) {
    case "User":
      // If cookie is valid, and going to auth path, redirect home
      if (isAuthPath(pathname)) return redirect(res, "/")
      // If got a user, send userdata to component to add to mobx store on server-side pre-render
      return {
        ...appProps,
        pageProps: { ...appProps.pageProps, userData: response.data.me },
      }
    case "NotLoggedIn":
    default:
      return redirectAuth(res, pathname)
  }
}

function extractCookie(req: IncomingMessage): string | null {
  const cookieHeaders = req.headers.cookie
  if (!cookieHeaders) return null

  const cookie = parse(cookieHeaders)["sid"]
  if (!cookie) return null

  return cookie
}

async function requestMe(sid: string) {
  let response: ApolloQueryResult<MeQuery> | null = null
  try {
    response = await client.query<MeQuery>({
      query: MeDocument,
      context: {
        headers: {
          cookie: `sid=${sid};`,
        },
      },
    })
  } catch (e) {
    // If there is some error with the server, leave response as null
  }
  return response
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
  if (isAuthPath(current)) return {}
  // Also dont redirect if going to error path
  else if (current === "/error") return {}
  else return redirect(res, path)
}

function redirectError(res: ServerResponse, current: string) {
  // Don't re-redirect if already going to error path
  if (isErrorPath(current)) return {}
  else return redirect(res, "/error")
}

function isAuthPath(current: string) {
  return current === "/login" || current === "/register"
}

function isErrorPath(current: string) {
  return current === "/error"
}

export default setup
