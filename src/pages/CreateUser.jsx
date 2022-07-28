import { useState } from "react";
import { useDispatch } from "react-redux";
import "../CreateUser.css";
import logo from "../assets/Logo.png";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { setLoggedIn, setUserID } from "../redux/userState/userStateActions";



const CreateUser = () => {

  // const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log("in Create User, already logged in!");
  //     navigate('/projects');
  //   } else {
  //     console.log("in Create User, not logged in");
  //   }
  // }, [isLoggedIn]);



  const handleSignUp = async(e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/auth/createUser`;

    if (email.length === 0) {
      setErrorMsg("Please enter your email.");
      return;
    } else if (password.length === 0) {
      setErrorMsg("Please enter your password.");
      return;
    } else if (firstName.length === 0) {
      setErrorMsg("Please enter your first name.");
      return;
    } else if (lastName.length === 0) {
      setErrorMsg("Please enter your last name.");
    }

    let creds = {
      "email": email,
      "password": password,
      "first_name": firstName,
      "last_name": lastName,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
  };
    
    let response = await fetch(url, requestOptions);
    if (!response.ok) {
      if (response.status === 404 || 400) {
        setErrorMsg("Invalid credentials. Please fill all");
        return;
      } else if (response.status === 500) {
        setErrorMsg("Something went wrong on our end. Please try again later.");
        return;
      }
    }

    // sign in user after sign up, setting access token and user id and redirecting to projects page
    await handleSignIn();

    if (!localStorage.getItem(localStorage.getItem("nxs-id"))) {
      navigate('/createProfileStart', {state: {email: email}});
    } else {
      navigate('/projects');
    }

  }


  const handleSignIn = async(e) => {
    //e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/auth/signIn`;

    let creds = {
      "email": email,
      "password": password
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
  };
    
    let response = await fetch(url, requestOptions);
    if (response.ok) {
      const session = await response.json();
      const cookie = new Cookies();
      // const userIdCookie = new Cookies();
      cookie.set('accessToken', session.accessToken);
      window.localStorage.setItem("nxs-id", session.id);
      // cookie.set("nxs_id", session.id);
      
      // dispatch(setUserID(session.id));
      dispatch(setLoggedIn(true));
      console.log(cookie);
    }
  }

  const handleEnterKeypress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp(e);
  }
  }


    return (
        <div className="desktop-container">
          <div className="main-pane">
            <img className="center-logo" src={logo} alt="nexus logo"></img>

            <p className="sign-in">Sign Up</p>
                 <form className="create-user-form">
                  <div className="form-field">

                  <input className="create-user-field"
                           type="text"
                           name="first-name" 
                           placeholder=" First Name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           onKeyDown={handleEnterKeypress}>
                    </input>

                    <input className="create-user-field"
                           type="text"
                           name="last-name" 
                           placeholder=" Last Name"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           onKeyDown={handleEnterKeypress}>
                    </input>

                     <input className="create-user-field" 
                           type="text"
                           name="e-mail" 
                           placeholder=" Email Address"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           onKeyDown={handleEnterKeypress}>
                    </input>
                    <input className="create-user-field"
                           type="password"
                           name="password" 
                           placeholder=" Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onKeyDown={handleEnterKeypress}>
                    </input>
                  </div>

                </form>
                <p className="error-msg">{errorMsg}</p>

                
              <button className="create-acc-button" type="submit" onClick={(e) => {handleSignUp(e)}}>Create Account</button>
          </div>
        </div>
    );
}

export default CreateUser;