import React from "react"
import NavItem from "./Navitem"
import {
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  LibraryIcon,
  LightBulbIcon,
} from "@heroicons/react/outline"

const menuItems = [
  {
    icon: ClipboardListIcon,
    label: "Workouts",
    path: "/workouts",
  },
  {
    icon: LibraryIcon,
    label: "Exercises",
    path: "/exercises",
  },
  {
    icon: HomeIcon,
    label: "Home",
    path: "/",
  },
  {
    icon: LightBulbIcon,
    label: "Insights",
    path: "/insights",
  },
  {
    icon: CogIcon,
    label: "Settings",
    path: "/settings",
  },
]

const navDimensions = { height: "h-20" }

const Navbar: React.FC = () => {
  return (
    <>
      {/* Same size div, but relative positioning so that view div can not go under navbar */}
      <div className={`w-full ${navDimensions.height}`}></div>
      <div
        className={`bg-white px-2 shadow-inner text-gray-700 fixed bottom-0 ${navDimensions.height} border-t border-gray-300 w-full z-20 flex justify-between items-center`}
      >
        {menuItems.map((item) => {
          return <NavItem key={item.label} item={item} />
        })}
      </div>
    </>
  )
}

export default Navbar
