import './ProfileGrid.css';
import DefaultPic from '../../assets/userpic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFile } from '@fortawesome/free-solid-svg-icons';
import { TailSpin } from "react-loader-spinner";

const ProfileGrid = (props) => {

    const { userInfo, editCallback, hasResume } = props;

    // First container
    const fullName = userInfo.first_name + ' ' + userInfo.last_name;
    const userProfilePic = userInfo.user_image;
    const email = userInfo.email; // this is static static for now
    const campus = userInfo.education.campus;
    const classStanding = userInfo.education.year;
    const major = userInfo.education.major;
    const summaryArray = [email, campus, classStanding, major];
    const summaryGridArray = summaryArray.map((item, index) => {
        return <SummaryItem item={item} index={index} key={index} />
    })

    // Second container
    const bio = userInfo.education.bio;

    // Third container
    const resume = props.resume;

    // Fourth container (first one on second column)
    // const projectCategories = ['All', 'Current', 'Accepted', 'Pending', 'Declined'];
    // const projectCategoriesArray = projectCategories.map((item, index) => {
    //     return <ProjectCategory item={item} index={index} key={index} />;
    // });

    // Fifth container (second one on second column)
    const projectInterests = userInfo.education.interests;
    const projectInterestsArray = projectInterests.map((item, index) => {
        return <ProjectItem item={item} isSkill={false} key={index} />
    });

    // Sixth container (last one on first column)
    const technicalSkills = userInfo.education.skills;
    const technicalSkillsArray = technicalSkills.map((item, index) => {
        return <ProjectItem item={item} isSkill={true} key={index} />
    });

    const convertBase64ToPDF = () => {
      var byteCharacters = window.atob(resume);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: 'application/pdf;base64' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }

    return (
        <div className="profile-grid-container">
            <div className="grid-column">
                <div className="user-summary">
                    <img src={userProfilePic ? userProfilePic : DefaultPic} />
                    <div className='bio-container'>
                        <div className="bio-header">
                            <h1 className="item-header">{fullName}</h1>
                            <FontAwesomeIcon className="edit-profile-icon" icon={faPenToSquare} size="2xl" onClick={() => editCallback(true)}/>
                        </div>
                        <div className="summary-flexbox">
                            {summaryGridArray}
                        </div>
                    </div>
                </div>
                <div className="user-bio">
                    <h1 className="item-header">Bio</h1>
                    <p className="item-body">{bio}</p>
                </div>
                <div className="user-resume">
                    <h1 className="item-header">Resume</h1>
                    <div className="resume-body">
                        <FontAwesomeIcon className="resume-icon" icon={faFile} size="2xl" />
                        {!resume && 
                          <div className='loading-resume-container'>
                            <TailSpin color="#f05a28" height={25} width={25} ariaLabel="Loading"></TailSpin>
                          </div>
                          }
                        {resume && (hasResume ? <p className="resume-link" onClick={convertBase64ToPDF}>View Resume</p> : <p className='no-resume-text'>No resume found.</p>)}
                    </div>
                </div>
                <div className="user-skills">
                    <h1 className="item-header">Technical Skills</h1>
                    <div className="summary-flexbox">
                        {technicalSkillsArray}
                    </div>
                </div>
            </div>
            <div className="grid-column">
                <div className="project-row">
                    {/* <div className="project-categories-container">
                        <h1 className="item-header">Projects</h1>
                        <div className="project-categories">
                            {projectCategoriesArray}
                        </div>
                    </div> */}
                    <div className="user-project-interests">
                        <h1 className="item-header">Project Interests</h1>
                        <div className="summary-flexbox">
                            {projectInterestsArray.length === 0 ? <p>This user has not set any project interests.</p> : projectInterestsArray}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// this is cursed
const SummaryItem = (props) => {
    const { item, index } = props;
    if (index === 0) {
        return <p className="summary-item">{item}</p>;
    } else if (index === 1) {
        return <p className="summary-item">Campus: {item}</p>;
    } else if (index === 2) {
        return <p className="summary-item">Class Standing: {item}</p>;
    } else {
        return <p className="summary-item">Major: {item}</p>;
    }
}

const ProjectCategory = (props) => {
    const { item, index } = props;
    if (index === 0) {
        return <p className="selected-category">{item}</p>;
    } else {
        return (
            <div>
                <hr className="category-divider" />
                <p>{item}</p>
            </div>
        );
    }
}

const ProjectItem = (props) => {
    const { item, isSkill } = props;
    let projectSelector = '';
    if (isSkill) {
        projectSelector = 'skill-item';
    } else {
        projectSelector = 'project-item';
    }
    return <p className={projectSelector}>{item}</p>
}

export default ProfileGrid;