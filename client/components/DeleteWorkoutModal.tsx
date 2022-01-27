import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Button from "./Button"

interface DeleteWorkoutModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  submit: () => {}
}

const DeleteWorkoutModal: React.FC<DeleteWorkoutModalProps> = ({
  isOpen,
  setIsOpen,
  submit,
}) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      className="fixed w-full h-full top-0 flex justify-center items-center"
    >
      <div className="fixed w-full h-full" onClick={() => setIsOpen(false)} />
      <div className="z-10 w-fit bg-white rounded-md shadow-sm border border-gray-300 p-6 space-y-4 mx-6 max-w-lg">
        <h2 className="text-xl font-semibold">Delete Workout</h2>
        <p>
          This will permanently delete the workout, but the exercises and
          recorded sets will not be deleted.
        </p>
        <div className="flex flex-row space-x-6">
          <Button type="orange" onClick={() => submit()}>
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
  )
}

export default DeleteWorkoutModal
