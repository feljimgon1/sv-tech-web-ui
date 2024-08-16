import React from 'react'
import { useSelector } from 'react-redux'
import { getNotification } from '../../../services/notification/selectors'
import {
  Alert,
  Collapse,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Notification = () => {

  const notification = useSelector(getNotification)
  const [isOpen, setIsOpen] = React.useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div style={{
      display: 'block',
    }}>
      {Object.keys(notification).length !== 0 &&
        <Collapse in={isOpen}>
          <Alert
            severity={notification.success ? 'success' : 'error'}
            key={notification.id}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {notification.message}
          </Alert>
        </Collapse>
      }
    </div>
  )
}

export default Notification