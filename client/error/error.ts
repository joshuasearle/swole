import { NextRouter } from "next/router"
import { toast } from "react-toastify"

const error = async (router: NextRouter) => {
  toast.error("Something went wrong")
  await router.push("/error")
  return
}

export default error
