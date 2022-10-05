import './ForgotPassword.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordBody = (props) => {
    const { forgotPasswordDetails, buttonCallback } = props;
    const {
        currEmail,
        setCurrEmail,
        currPassOne,
        setCurrPassOne,
        currPassTwo, // password confirmation
        setCurrPassTwo, // password confirmation
        header,
        body,
        bodyTwo, // for password confirmation
        formType,
        formLabel,
        inputPlaceholder,
        inputPlaceholderTwo, // for password confirmation
        errorMessage,
        buttonText
    } = forgotPasswordDetails;
    const isEmail = formType === 'email';
    const [error, setError] = useState(false);

    const handleEmailClick = () => {
        if (currEmail.length === 0) {
            setError(true);
        } else {
            setError(false);
            buttonCallback(true);
        }
    };

    const handlePasswordClick = () => {
        if (currPassOne !== currPassTwo || currPassOne.length === 0) {
            setError(true);
        } else {
            setError(false);
            buttonCallback(true);
        }
    };

    return (
        <section className='forgot-password-container'>
            <h1>{header}</h1>
            <p>{body}</p>
            {bodyTwo ? <p className='forgot-password-body-two'>{bodyTwo}</p> : null}
            <form className='forgot-password-form'>
                <label className='forgot-password-email-label' htmlFor={formType}>
                    {formLabel}
                </label>
                {isEmail ?
                    <input className='forgot-password-input' type={formType} placeholder={inputPlaceholder} onChange={(event) => setCurrEmail(event.target.value)} /> :
                    <div className='change-password-input-container'>
                        <input className='forgot-password-input' type={formType} placeholder={inputPlaceholder} onChange={(event) => setCurrPassOne(event.target.value)} />
                        <input className='forgot-password-input' type={formType} placeholder={inputPlaceholderTwo} onChange={(event) => setCurrPassTwo(event.target.value)} />
                    </div>
                }
            </form>
            {error ? <p className='forgot-password-error'>{errorMessage}</p> : null}
            <button className='forgot-password-button' onClick={isEmail ? handleEmailClick : handlePasswordClick}>{buttonText}</button>
            {isEmail ? <footer className='forgot-password-footer'>&larr; Return to <Link className='login-redirect' to='/login'>Sign in screen</Link></footer> : null}
        </section>
    )
}

export default ForgotPasswordBody;