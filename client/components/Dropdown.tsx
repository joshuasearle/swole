import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline"
import { Dispatch, Fragment, SetStateAction } from "react"
import { Option } from "../types/Option"

interface DropdownProps {
  label: string
  options: Option[]
  selectedOption: Option | undefined
  setSelectedOption: Dispatch<SetStateAction<Option | undefined>>
  placeholder: string
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative">
          <Listbox.Button className="border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full text-left flex flex-row justify-between">
            <span>{selectedOption?.label || placeholder}</span>
            <span>
              <SelectorIcon className="w-6 h-6" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="bg-white absolute border border-gray-300 rounded-md shadow-sm mt-1 w-full">
              {options.map((option) => (
                <Listbox.Option key={option.id} value={option}>
                  <div
                    className={`${
                      option.id === selectedOption?.id
                        ? "bg-teal-600 text-white"
                        : ""
                    } px-4 py-2 flex flex-row justify-between cursor-pointer`}
                  >
                    <span>{option.label}</span>
                    {option.id === selectedOption?.id ? (
                      <span>
                        <CheckIcon className="w-6 h-6 text-white" />
                      </span>
                    ) : null}
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Dropdown
