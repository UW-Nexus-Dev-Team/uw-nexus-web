import logo from "../../assets/Logo.png";
import { slide as Menu } from 'react-burger-menu'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../redux/userState/userStateActions";
import Cookies from "universal-cookie";
import { useEffect, useState, useRef } from 'react';
import ProfileModal from './ProfileModal.jsx';
import CreateProjectHeader from "./CreateProjectHeader.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const LoginButton = ({
    isMobile
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const SIGN_OUT = `/api/auth/signOut`;
    const handleClick = async () => {
        if (isLoggedIn) {
            const options = {
              method: 'DELETE'
            }
            await fetch(SIGN_OUT, options);
            console.log("removing cookie!");
            const prevCookie = new Cookies();
            prevCookie.remove("fr-accessToken", {path : '/'});
            window.localStorage.removeItem("nxs-id");
            // prevCookie.remove("nxs_id");
            dispatch(setLoggedIn(false));
            navigate('/');
        } else {
            navigate('/login')
        }
    }

    return (
        <button onClick={handleClick} className={"login-button-header"}>
            {isLoggedIn ? `Log out` : (isMobile ? `Join NEXUS` : `Join the NEXUS Network`)}
        </button>
    )
}

const Header = ({
    isMobile,
    userProfile,
    getProfile
}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef();
    const location = useLocation().pathname;
    const getUserProfile = () => {
      getProfile();
    }

    const isSignUpFlow = location == '/createProfile' || location == '/createProfileStart';
    
    // Set up clicking event for dropdown user accounts and modals
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isMenuOpen]);

    // fix this in future, bad style
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    const projectStep = useSelector((state) => state.createProj.step);
    const profileStep = useSelector((state) => state.signUp.step);
    console.log(isMobileMenuOpen);
    if (isMobile) {
        const handleMobileMenu = () => {
            setMobileMenuOpen(!isMobileMenuOpen);
        };

        const closeMobileMenu = () => {
            setMobileMenuOpen(false);
        }

        if (location === '/createProfile' || location === '/createProject' || location === '/finishProject' 
            || location == '/reviewProject' || location == '/createProfileStart' || location == '/welcomePage'
            || location == '/login' || location == '/signUp') {
            let maxSteps = 4;
            if (location === '/createProject') {
                maxSteps = 6;
            }
            const step = (location === '/createProfile' ? profileStep : projectStep);
            return (
                <>
                    <div className="iterations-flex">
                        <Link to={"/"}>
                            <div className="iterations-logo-header">
                                <img src={logo} alt="Nexus Logo" className="" />
                            </div>
                        </Link>

                        {!(location == '/signUp' || location == '/login') && <p className={step <= maxSteps ? 'step-counter' : 'step-counter-hidden'}>Step {location === '/createProfile' ? profileStep : projectStep} of {maxSteps}</p>}
                    </div>
                </>
            )
        }

        // else if (location == '/') {
        //     return (
        //         <>
        //             <div className="mh-home">
        //                 <Link to={"/"}>
        //                     <img src={logo} alt="Nexus Logo" className="mh-home-logo" />
        //                 </Link>
        //                 <div className="mh-home-items">
        //                     {!isSignUpFlow && <NavLink className="projects-button" to={"/projects"}>Discover Projects</NavLink>}
        //                     {/* {isLoggedIn ? <p className="profile-button" onClick={() => setMenuOpen(true)}>My Profile</p>: null} */}
        //                     {isLoggedIn && !isSignUpFlow && <p className={location === '/profile' ? 'profile-button-active' : 'profile-button'} onClick={() => setMenuOpen(true)}>My Profile</p>}
        //                     {isMenuOpen ? <ProfileModal userProfile={userProfile} menuRef={menuRef} menuCallback={setMenuOpen} getUserProfile={getUserProfile}/> : null}
        //                     <LoginButton isMobile={isMobile}/>
        //                 </div>
        //             </div>
        //         </>
        //     )
        // } 
        else {
            return (
                <>
                    <Menu width={250} customBurgerIcon={<FontAwesomeIcon icon={faBars} />} customCrossIcon={false} isOpen={isMobileMenuOpen} onOpen={handleMobileMenu} onClose={handleMobileMenu}>
                        <FontAwesomeIcon className="menu-icon" icon={faBars} />
                        <div className="side-menu-container">
                            <Link className={location === '/projects' ? 'side-menu-option-active' : 'side-menu-option'} to={"/projects"} onClick={closeMobileMenu}>Discover Projects</Link>
                            {isLoggedIn && <Link className={location === '/profile' ? 'side-menu-option-active' : 'side-menu-option'} to='/profile' onClick={closeMobileMenu}>My Profile</Link>}
                            <LoginButton />
                            {isLoggedIn ?
                                <CreateProjectHeader className="header-create-project" /> :
                                null}
                        </div>
    
                    </Menu>
                    <div className="flex">
                        <Link to={"/"}>
                            <div className="logo-header">
                                <img src={logo} alt="Nexus Logo" className="" />
                            </div>
                        </Link>
                    </div>
                </>
            );
        }


    } else {
        return (
            <div className="header-desktop">
                <Link to={"/"}>
                    <div className="logo-header">
                        <img src={logo} alt="Nexus Logo" className="nexus-logo-header" />
                    </div>
                </Link>
                <div className="header-desktop-items">
                    {!isSignUpFlow && <NavLink className="projects-button" to={"/projects"}>Discover Projects</NavLink>}
                    {/* {isLoggedIn ? <p className="profile-button" onClick={() => setMenuOpen(true)}>My Profile</p>: null} */}
                    {isLoggedIn && !isSignUpFlow && <p className={location === '/profile' ? 'profile-button-active' : 'profile-button'} onClick={() => setMenuOpen(true)}>My Profile</p>}
                    {isMenuOpen ? <ProfileModal userProfile={userProfile} menuRef={menuRef} menuCallback={setMenuOpen} getUserProfile={getUserProfile}/> : null}
                    <LoginButton />
                </div>
            </div>
        )
    }


    /*
    <Modal.Dialog show={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal.Dialog>
                    <Link to={"/projects"}>Discover Projects</Link>
                    <Link to={isLoggedIn ? "/profile" : "/login"}>My Profile</Link>
                    <LoginButton />
    */
}

export default Header;