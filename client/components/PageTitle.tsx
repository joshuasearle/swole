import { ChevronLeftIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import React from "react"

interface PageTitleProps {
  title: string
  backButton?: boolean
}

const PageTitle: React.FC<PageTitleProps> = ({ title, backButton = false }) => {
  const router = useRouter()

  return (
    <>
      <div className="h-[64px] w-full"></div>
      <div className="fixed bg-white flex items-center h-16 shadow-sm border-b border-gray-300 w-full z-20">
        {backButton ? (
          <ChevronLeftIcon
            onClick={() => router.back()}
            className="w-8 h-8 ml-4 absolute"
          />
        ) : null}
        <h1 className="text-3xl font-semibold text-center text-gray-900 w-full">
          {title}
        </h1>
      </div>
    </>
  )
}

export default PageTitle
