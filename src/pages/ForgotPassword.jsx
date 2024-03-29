import { useState } from 'react';
import ForgotPasswordBody from '../components/ForgotPassword/ForgotPasswordBody';
import SentEmailModal from '../components/ForgotPassword/SentEmailModal';

const ForgotPassword = () => {
  const [currEmail, setCurrEmail] = useState('');
  const [isButtonClicked, setButtonClicked] = useState(false);
  const rootDOM = document.getElementById('root');
  const headerDesktopDOM = document.getElementsByClassName('header-desktop')[0];
  const [errorMsg, setErrorMsg] = useState("");
  
  if (isButtonClicked) {
    rootDOM.style.backdropFilter = 'brightness(40%)';
    headerDesktopDOM.style.filter = 'brightness(40%)';
  } else {
    rootDOM.style.backdropFilter = 'brightness(100%)';
    headerDesktopDOM.style.filter = 'brightness(100%)';
  }

  const forgotPasswordDetails = {
    currEmail: currEmail,
    setCurrEmail: setCurrEmail,
    header: 'Forgot your password?',
    body: 'Enter your registered email address to receive password reset instructions.',
    formType: 'email',
    formLabel: 'Enter your email here:',
    inputPlaceholder: 'Email Address',
    errorMessage: errorMsg,
    buttonText: 'Send'
  };

  const handleError = (errorMsg) => {
    setErrorMsg(errorMsg);
}

  return (
    <div>
      <ForgotPasswordBody forgotPasswordDetails={forgotPasswordDetails} buttonCallback={setButtonClicked} handleError={handleError}/>
      <SentEmailModal isButtonClicked={isButtonClicked} buttonCallback={setButtonClicked} />
    </div>
  );
}

export default ForgotPassword;