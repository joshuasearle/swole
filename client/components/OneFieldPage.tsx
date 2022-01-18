import type { NextPage } from "next"
import { observer } from "mobx-react"
import { useState } from "react"
import { useRouter } from "next/router"
import { useStore } from "../store/store"
import PageTitle from "./PageTitle"
import NameEdit from "./NameEdit"

interface OneFieldPageProps {
  submit: (name: string) => Promise<void>
  title: string
  errorMessage: string
  label: string
  buttonText: string
  initial?: string
}

const OneFieldPage: React.FC<OneFieldPageProps> = ({
  submit,
  title,
  errorMessage,
  label,
  buttonText,
  initial = "",
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <PageTitle backButton={true} title={title} />
      <div className="p-6 w-full h-full">
        <NameEdit
          label={label}
          submit={submit}
          errorMessage={errorMessage}
          buttonText={buttonText}
          initial={initial}
        />
      </div>
    </div>
  )
}

export default OneFieldPage
