import type { NextPage } from "next"
import { observer } from "mobx-react"

const Error: NextPage = observer(() => {
  return <div>Something went wrong</div>
})

export default Error
