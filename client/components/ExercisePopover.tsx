import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline"
import { Popover, Transition } from "@headlessui/react"
import {
  ExerciseFragment,
  useDeleteExerciseMutation,
} from "../generated/graphql"
import { request } from "../client"
import { useRouter } from "next/router"
import error from "../error/error"
import { MutableRefObject } from "react"
import { toast } from "react-toastify"
import { useStore } from "../store/store"

interface ExercisePopoverProps {
  exercise: ExerciseFragment
}

type CloseType = (
  focusableElement?:
    | HTMLElement
    | MutableRefObject<HTMLElement | null>
    | undefined
) => void

const ExercisePopover: React.FC<ExercisePopoverProps> = ({ exercise }) => {
  const [deleteExercise] = useDeleteExerciseMutation()
  const store = useStore()

  const onDelete = async (close: CloseType) => {
    const data = await request(
      deleteExercise({ variables: { id: exercise.id } }),
      router
    )

    if (!data) return

    switch (data.deleteExercise.__typename) {
      case "ExerciseDeleteSuccess":
        store.removeExercise(exercise)
        close()
        toast.success("Exercise deleted")
        break
      case "ExerciseDoesNotExist":
      case "NotLoggedIn":
      default:
        // These should all not be possible
        close()
        await error(router)
        break
    }
  }

  const onRename = async (close: CloseType) => {
    close()
    router.push(`/exercises/update/${exercise.id}`)
  }

  const options = [
    {
      name: "Delete Exercise",
      onClick: onDelete,
      icon: TrashIcon,
    },
    { name: "Rename Exercise", onClick: onRename, icon: PencilAltIcon },
  ]
  const router = useRouter()

  return (
    <Popover className="flex items-center">
      <Popover.Button>
        <DotsVerticalIcon className="h-6 w-6" />
      </Popover.Button>

      <div className="relative">
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute -translate-x-full -left-6 -translate-y-1/2">
            {({ close }) => (
              <div className="flex flex-col space-y-4 text-gray-700 z-10 bg-white border border-gray-300 rounded-md shadow-sm px-4 py-3 w-max">
                {options.map((option) => (
                  <div
                    onClick={() => option.onClick(close)}
                    key={option.name}
                    className="flex flex-row space-x-2 items-center"
                  >
                    <div>
                      <option.icon className="h-6 w-6" />
                    </div>
                    <p className="font-semibold text-sm">{option.name}</p>
                  </div>
                ))}
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  )
}

export default ExercisePopover
