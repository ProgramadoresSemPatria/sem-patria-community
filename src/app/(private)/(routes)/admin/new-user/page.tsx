import React from 'react'
import { NewUserForm } from './components/new-user-form'

const NewUserPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewUserForm />
      </div>
    </div>
  )
}

export default NewUserPage
