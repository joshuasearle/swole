import type { NextPage } from "next"
import { observer } from "mobx-react"
import PageTitle from "../../components/PageTitle"
import { useState } from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useCreateExerciseMutation } from "../../generated/graphql"
import { request } from "../../client"
import { useRouter } from "next/router"
import error from "../../error/error"
import { toast } from "react-toastify"
import { useStore } from "../../store/store"

const CreateExercise: NextPage = observer(() => {
  const [name, setName] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()
  const store = useStore()

  const [addExercise] = useCreateExerciseMutation()

  const submit = async () => {
    const data = await request(addExercise({ variables: { name } }), router)
    if (!data) return

    switch (data.createExercise.__typename) {
      case "Exercise":
        store.addExercise(data.createExercise)
        toast.success("Exercise created")
        router.replace("/exercises")
        break
      case "DuplicateExerciseName":
        const message = "Duplicate exercise name"
        toast.error(message)
        setErrorMessage(message)
        break
      case "NotLoggedIn":
      // Shouldn't be possible, so redirect to error as well
      default:
        await error(router)
        break
    }
  }

  return (
    <div className="flex flex-col items-center w-full ">
      <PageTitle backButton={true} title="Create Exercise" />
      <div className="p-6 w-full h-full">
        {/* Card */}
        <div className="bg-white rounded-md shadow-sm w-full border border-gray-300 p-6 space-y-6 ">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Exercise Name"
            type="text"
          />
          <Button text="Create Exercise" onClick={() => submit()} />
          {errorMessage ? (
            <div className="text-sm text-center mt-6 text-red-700 font-semibold">
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
})

export default CreateExercise
