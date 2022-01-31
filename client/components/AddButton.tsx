import { PlusSmIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"

interface AddButtonProps {
  label: string
  onClick: () => void
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => {
  const router = useRouter()
  return (
    <>
      <div
        onClick={onClick}
        className="overflow-auto p-[0.375rem] flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm mt-4"
      >
        <PlusSmIcon className="h-8 w-8" />
      </div>

      <label className="text-gray-700 font-semibold text-sm mt-2">
        {label}
      </label>
    </>
  )
}

export default AddButton
