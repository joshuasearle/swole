import { MiddlewareFn } from "type-graphql"

export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next()
  } catch (err) {
    console.log(err)
    // Dont' give internal error message in response,
    // so instead return generic error message
    throw "Internal Error. Contact support"
  }
}
