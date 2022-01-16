import type { NextPage } from "next"
import { observer } from "mobx-react"
import PageTitle from "../../components/PageTitle"

const CreateExercise: NextPage = observer(() => {
  return (
    <div className="flex flex-col h-full items-center">
      <PageTitle backButton={true} title="Create Exercise" />
    </div>
  )
})

export default CreateExercise
