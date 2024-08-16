import AuthenticationComponent from 'app/authentication-component/AuthenticationComponent';
import UserVerificationComponent from 'app/verification-component/UserVerification';
import Notification from './notification/Notification';
import {
  getIsThereToken,
  getIsUserActive,
  getIsTokenExpired
} from 'services/utils/authValidations';
import SVTech from './SVTech';

function App() {

  const renderUserAuthentication = () => {
    if (!getIsThereToken()) {
      return <AuthenticationComponent />
    }
  }

  const renderUserVerification = () => {
    if (getIsThereToken() && !getIsUserActive()) {
      return <UserVerificationComponent />
    }
  }

  const renderSvTech = () => {
    console.log(getIsUserActive(), !getIsTokenExpired());
    return <SVTech />
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