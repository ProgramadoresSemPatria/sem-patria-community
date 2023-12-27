import React from 'react'
import NotificationsButtonTrigger from './notifications-button-trigger'
import NotificationsList from './notifications-list'

// import { Container } from './styles';

const NotificationsButton: React.FC = () => {
  return (
    <NotificationsList>
      <NotificationsButtonTrigger />
    </NotificationsList>
  )
}

export default NotificationsButton
