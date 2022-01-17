import { MouseEventHandler } from "react"

interface ButtonProps {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-800"
      onClick={(e) => onClick(e)}
    >
      {text}
    </button>
  )
}

export default Button
