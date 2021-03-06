import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../WelcomePage.css";



const WelcomePage = () => {

  const navigate = useNavigate();
  const firstName = useSelector((state) => state.signUp.fullName).split(" ")[0];

  return (
    <div className="center-text">
      <div className="text-wrapper">
        
        <p className="welcome-text">  Welcome <span className="welcome-name">{firstName}</span></p>
        <p className="sub-text"> You can now begin searching projects.</p>
      </div>

      <button className="start-search-button" onClick={() => {navigate('/')}}>Start Searching</button>

    </div>
  )

}

export default WelcomePage;