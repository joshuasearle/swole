import { MouseEventHandler } from "react"

type ButtonColor = "teal" | "orange"

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: ButtonColor
}

const Button: React.FC<ButtonProps> = ({ onClick, type, children }, ref) => {
  let color, hoverColor, focusColor, ringColor

  switch (type) {
    case "orange":
      color = "bg-orange-600"
      hoverColor = "hover:bg-orange-700"
      focusColor = "hover:bg-orange-700"
      ringColor = "ring-orange-700"
      break
    case "teal":
    default:
      color = "bg-teal-700"
      hoverColor = "hover:bg-teal-800"
      focusColor = "hover:bg-teal-800"
      ringColor = "ring-teal-800"
      break
  }

  return (
    <button
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${color} ${hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${focusColor} ${ringColor}`}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  )
}

export default Button
