import { useRouter } from "next/router"
import React from "react"

const Input: React.FC = () => {
  const router = useRouter()

  const strokeWidth = 1.5
  const svgClass = "h-8 w-8"

  const menuItems = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      label: "Workouts",
      path: "/workouts",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          />
        </svg>
      ),
      label: "Exercises",
      path: "/exercises",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Home",
      path: "/",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      label: "Insights",
      path: "/insights",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={svgClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: "Settings",
      path: "/settings",
    },
  ]

  return (
    <>
      {/* Same size div, but relative positioning so that view div can not go under navbar */}
      <div className="w-full h-[4.5rem]"></div>
      <div className="bg-white px-2 shadow-inner text-teal-700 fixed bottom-0 h-[4.5rem] border-t border-gray-300 w-full z-10 flex justify-between items-center">
        {menuItems.map((item) => {
          return (
            <div
              key={item.label}
              onClick={() => router.push(item.path)}
              className="flex flex-col items-center w-[4.5rem] h-[4.5rem] justify-center cursor-pointer"
            >
              {item.path === router.pathname ? (
                <div className="animate-fade-in delay-500 bg-teal-700 opacity-20 absolute w-[4.5rem] h-[4.5rem] rounded-full"></div>
              ) : (
                <div className="transform transition duration-500 hover:scale-100 scale-75 hover:bg-teal-700 opacity-20 absolute w-[4.5rem] h-[4.5rem] rounded-full"></div>
              )}
              {item.svg}
              <label className="text-xs text-center font-semibold">
                {item.label}
              </label>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Input
