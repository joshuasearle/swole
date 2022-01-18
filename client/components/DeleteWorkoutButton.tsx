import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import Button from "./Button"

interface DeleteWorkoutButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteWorkoutButton: React.FC<DeleteWorkoutButtonProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Overlay />
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className=" mx-6  fixed bg-white rounded-md shadow-sm border border-gray-300 p-6 space-y-4">
          <Dialog.Title className="text-xl font-semibold">
            Delete Workout
          </Dialog.Title>
          <Dialog.Description>
            This will permanently delete the workout, but the exercises and
            recorded sets will not be deleted.
          </Dialog.Description>
          <div className="flex flex-row space-x-6">
            <Button type="orange" onClick={() => {}}>
              Confirm
            </Button>
            <Button
              type="teal"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Transition>
    </Dialog>
  )
}

export default DeleteWorkoutButton
