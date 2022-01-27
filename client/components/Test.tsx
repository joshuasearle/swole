import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface TestProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Test: React.FC<TestProps> = ({ isOpen, setIsOpen }) => {
  // Transition to open slightly after modal itself so that it can
  // go from closed to open, triggering the animation
  const [transitionOpen, setTransitionOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => setTransitionOpen(isOpen))
  }, [isOpen])

  useEffect(() => {
    setTimeout(() => setIsOpen(false))
  })

  return (
    <Dialog open={isOpen} onClose={() => setTransitionOpen(false)}>
      <Dialog.Overlay className="fixed inset-0" />
      <Transition
        show={transitionOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="bg-red-300 z-50 fixed top-12"
      >
        <Dialog.Title className="text-xl font-semibold">
          Delete Workout
        </Dialog.Title>
        <Dialog.Description>
          This will permanently delete the workout, but the exercises and
          recorded sets will not be deleted.
        </Dialog.Description>
      </Transition>
    </Dialog>
  )
}

export default Test
