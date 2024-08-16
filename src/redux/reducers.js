import {
  DOMAIN as USER_DOMAIN,
  reducer as userReducer
} from 'services/user'

import {
  DOMAIN as NOTIFICATION_DOMAIN,
  reducer as notificationReducer
} from 'services/notification'

// TODO: Add CONFIG_DOMAIN and COMMUNICATION_DOMAIN

// import {
//   DOMAIN as CONFIG_DOMAIN,
//   reducer as configReducer,
// } from 'services/config'
// import {
//   DOMAIN as COMMUNICATION_DOMAIN,
//   reducer as communicationReducer,
// } from 'services/communication'

export default () => ({
  [USER_DOMAIN]: userReducer,
  [NOTIFICATION_DOMAIN]: notificationReducer,
})