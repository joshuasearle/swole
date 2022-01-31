import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

interface InputProps {
  label: string
  type: HTMLInputTypeAttribute
  value: any
  onChange: ChangeEventHandler<any>
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          type={type}
          autoComplete={type === "email" ? "email" : undefined}
          className="text-gray-700 appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-700 focus:border-teal-700 sm:text-sm"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Input
