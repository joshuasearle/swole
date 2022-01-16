import { useRouter } from "next/router"
import React from "react"

interface PageTitleProps {
  title: string
  backButton?: boolean
}

const PageTitle: React.FC<PageTitleProps> = ({ title, backButton = false }) => {
  const router = useRouter()

  return (
    <div className="bg-white flex items-center h-16 shadow-sm border-b border-gray-300 w-full">
      {backButton ? (
        <svg
          onClick={() => router.back()}
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 ml-4 text-gray-700 absolute"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : null}
      <h1 className="text-3xl font-semibold text-center text-gray-900 w-full">
        {title}
      </h1>
    </div>
  )
}

export default PageTitle
