import AuthenticationComponent from 'app/authentication-component/AuthenticationComponent';
import UserVerificationComponent from 'app/verification-component/UserVerification';
import Notification from './notification/Notification';
import {
  getIsThereToken,
  getIsUserActive,
  getIsTokenExpired
} from 'services/utils/authValidations';
import SVTech from './SVTech';
import { setNotification } from 'services/notification/actions';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  if (getIsTokenExpired()) {
    dispatch(setNotification({
      success: 'info',
      message: 'Su sesión ha expirado, por favor inicie sesión de nuevo',
    }))
  }

  const renderUserAuthentication = () => {
    if (!getIsThereToken() || getIsTokenExpired()) {
      return <AuthenticationComponent />
    }
  }

  const renderUserVerification = () => {
    if (getIsThereToken() && !getIsUserActive()) {
      return <UserVerificationComponent />
    }
  }

  const renderSvTech = () => {
    if (getIsUserActive(), !getIsTokenExpired()) {
      return <SVTech />
    }
  }

  return (
    <>
      <Notification />
      {renderUserAuthentication()}
      {renderUserVerification()}
      {renderSvTech()}
    </>
  );
}

export default App;