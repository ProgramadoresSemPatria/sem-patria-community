'use client'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import React from 'react'
import { Button } from '@/components/ui/button'
import { type InterestWithUsers } from '../page'
import { type User } from '@prisma/client'

interface InterestsComponentProps {
  interests: InterestWithUsers[]
}

const InterestsComponent: React.FC<InterestsComponentProps> = ({
  interests
}) => {
  const [selectedInterest, setSelectedInterest] = React.useState<string>('')
  const [users, setUsers] = React.useState<User[]>([])
  const [showModal, setShowModal] = React.useState(false)

  const handleInterestClick = (interest: InterestWithUsers) => {
    setSelectedInterest(interest.interest)
    setUsers(interest.users)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedInterest('')
  }
  return (
    <div className="container">
      <h2 className="title">Explore Interests</h2>
      <div className="interests-grid">
        {interests.map((interest, index) => (
          <Badge
            key={index}
            onClick={() => {
              handleInterestClick(interest)
            }}
            className="interest-badge hover:cursor-pointer"
          >
            {interest.interest}
          </Badge>
        ))}
      </div>

      {showModal && (
        <Modal
          description="efef"
          isOpen={showModal}
          onClose={closeModal}
          title={`Users interested in ${selectedInterest}`}
        >
          {users.length > 0 ? (
            <ul className="user-list">
              {users.map((user, index) => (
                <li key={index} className="user-item">
                  {user.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-users">No users found for this interest.</p>
          )}
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      )}
    </div>
  )
}

export default InterestsComponent
