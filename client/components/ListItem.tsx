import React, { SVGProps } from "react"

interface ListItemProps {
  label: string
  button: JSX.Element
}

const ListItem: React.FC<ListItemProps> = ({ label, button }) => {
  return (
    <div className="bg-white h-max w-full border border-gray-300 px-6 py-3 rounded-md shadow-sm flex flex-row justify-between items-center">
      <label className="text-gray-900 font-semibold">{label}</label>
      {button}
    </div>
  )
}

export default ListItem
