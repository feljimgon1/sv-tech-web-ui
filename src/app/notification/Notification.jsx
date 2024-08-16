import { Alert, Collapse, IconButton } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications } from 'services/notification/selectors';
import { removeNotification } from 'services/notification/actions';
import CloseIcon from '@mui/icons-material/Close';

const Notification = () => {
  const notifications = useSelector(getNotifications);
  const dispatch = useDispatch();

  const [visibleNotifications, setVisibleNotifications] = React.useState(new Set());

  React.useEffect(() => {
    setVisibleNotifications(new Set(notifications.map(notification => notification.id)));
  }, [notifications]);

  const handleClose = (id) => {
    const updatedVisibility = new Set(visibleNotifications);
    updatedVisibility.delete(id);
    setVisibleNotifications(updatedVisibility);
    dispatch(removeNotification(id));
  };

  return (
    <>
      {notifications.map((notification) => (
        <Collapse key={notification.id} in={visibleNotifications.has(notification.id)}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => handleClose(notification.id)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={notification.success === 'info' ? 'info' : notification.success ? 'success' : 'error'}
          >
            {notification.message}
          </Alert>
        </Collapse>
      ))}
    </>
  );
};

export default Notification;
