import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ReviewPage.css";
import editIcon from "../../assets/icons/edit-icon.png";

const ReviewPage = (props) => {

  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.signUp.fullName);
  const year = useSelector((state) => state.signUp.year);
  const major = useSelector((state) => state.signUp.major);
  const campus = useSelector((state) => state.signUp.campus);
  const interests = useSelector((state) => state.signUp.interests);
  const skills = useSelector((state) => state.signUp.skills);
  const resume = useSelector((state) => state.signUp.resume);

  const renderSelections = (selections, type) => {
    return selections.map((selections) => <div className={type + "-selection"}>
      <p>{selections}</p>
    </div>)
  }

  const renderResumeDetails = () => {
    if (resume) {
      return <p>Resume: {resume.name}</p>
    } else {
      return <p>Resume Not Uploaded</p>
    }
  }

  return (
    <div className="review-container">

      <p className="main-title">Review Your Information</p>

      <div className="sub-section">
        <div className="subtitle">
          <img className="edit-icon" src={editIcon}></img>
          <p className="subtitle-text">Sign Up</p>
          
        </div>
        <p className="info-field">Name: {fullName}</p>
        <p className="info-field">Year: {year}</p>
        <p className="info-field">Major: {major}</p>
        <p className="info-field">Campus: {campus}</p>
      </div>

      <div className="sub-section">
        <div className="subtitle">
          <img className="edit-icon" src={editIcon}></img>
          <p className="subtitle-text">Project Interests</p>
        </div>

        <div className="selections-container">
          {renderSelections(interests, "interest")}
        </div>

      </div>

      <div className="sub-section">
        <div className="subtitle">
          <img className="edit-icon" src={editIcon}></img>
          <p className="subtitle-text">Technical Skills</p>

        </div>

        <div className="selections-container">
          {renderSelections(skills, "skill")}
        </div>
        
      </div>

      <div className="sub-section">
        <div className="subtitle">
          <img className="edit-icon" src={editIcon}></img>
          <p className="subtitle-text">Resume</p>

        </div>

        {renderResumeDetails()}
        
      </div>

    </div>
  )
}

export default ReviewPage;