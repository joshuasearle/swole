import { useRouter } from "next/router"
import React from "react"

interface NavItemProps {
  item: {
    label: string
    path: string
    svg: JSX.Element
  }
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const router = useRouter()

  const buttonDimensions = { height: "h-[4.5rem]", width: "w-[4.5rem]" }

  return (
    <div
      key={item.label}
      onClick={() => router.push(item.path)}
      className={`flex flex-col items-center ${buttonDimensions.width} ${buttonDimensions.height} justify-center cursor-pointer`}
    >
      {item.path === router.pathname ? (
        <div
          className={`animate-fade-in delay-500 bg-teal-700 opacity-20 absolute ${buttonDimensions.width} ${buttonDimensions.height} rounded-full`}
        ></div>
      ) : (
        <div
          className={`transform transition duration-500 hover:scale-100 scale-75 hover:bg-teal-700 opacity-20 absolute ${buttonDimensions.width} ${buttonDimensions.height} rounded-full`}
        ></div>
      )}
      {item.svg}
      <label className="text-xs text-center font-semibold">{item.label}</label>
    </div>
  )
}

export default NavItem
