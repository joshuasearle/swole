import type { NextPage } from "next"
import { gql, useMutation } from "@apollo/client"
import { parse } from "cookie"
import client from "../client"

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      __typename
    }
  }
`

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      __typename
    }
  }
`

const Home: NextPage = () => {
  const [register, { data, loading, error }] = useMutation(LOGIN)

  return (
    <div>
      <button
        onClick={() =>
          register({
            variables: {
              email: "test",
              password: "test",
            },
          })
        }
      >
        Register
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const cookieHeaders = context.req.headers.cookie

  console.log(cookieHeaders)

  if (!cookieHeaders) return { props: {} }

  const cookie = parse(cookieHeaders)["sid"]

  const me: any = await client.query({
    query: gql`
      query Me {
        me {
          __typename
          ... on User {
            email
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

  return { props: {} }
}
