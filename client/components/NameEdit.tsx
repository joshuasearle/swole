import React, { useState } from "react"
import Button from "./Button"
import Input from "./Input"

interface NameEditProps {
  errorMessage: string
  submit: (name: string) => Promise<void>
  buttonText: string
  initial?: string
  label: string
}

const NameEdit: React.FC<NameEditProps> = ({
  errorMessage,
  submit,
  buttonText,
  initial = "",
  label,
}) => {
  const [name, setName] = useState<string>(initial)

  return (
    <div className="bg-white rounded-md shadow-sm w-full border border-gray-300 p-6 space-y-6 ">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        label={label}
        type="text"
      />
      <Button onClick={() => submit(name)} type="teal">
        {buttonText}
      </Button>
      {errorMessage ? (
        <div className="text-sm text-center mt-6 text-red-700 font-semibold">
          {errorMessage}
        </div>
      ) : null}
    </div>
  )
}

export default NameEdit
