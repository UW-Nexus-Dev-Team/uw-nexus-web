import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import dividerImage from "../assets/divider.png";
import peopleImage from "../assets/twoPpl.png";

const Home = ({
    isMobile
    }) => {
    const isLoggedIn = useSelector((state) => state.userState.isLoggedIn);
    return (
        <>
            <section className="home-section">
                <div className="find-project-center-wrapper">
                    {isMobile ? <h1>Find Your Next <br/>Passion Project</h1> : <h1>Find Your Next Passion Project</h1>}
                    {!isMobile && <h2>Discover 100+ self-motivated students on the NEXUS Network</h2>}
                    <Link to={"/projects"} className={"home-button-container"}>
                        <div className={"find-project home-button"}>
                            Find Your Project
                        </div>
                    </Link>
                </div>


                {/* <div className="divider"/> */}
                <div className="dividing">
                    <img className="divider-image" src={dividerImage} alt="website divider"></img>
                </div>

                {isMobile ? <p className="discover-text">Discover 100+ self-motivated students on the NEXUS Network</p>  : <p className="what-we-do-text">What we do here at NEXUS</p>}
            </section>
            <section className="home-section">
                <div className="home-card-container">
                    <div className="home-card">
                        <div className="home-card-item home-card-label">If you are looking for a side project...</div>
                        <Link to={"/projects"}>
                            <div className="home-card-item home-button side-project">Find a Project</div>
                        </Link>
                    </div>
                    <div className="home-card">
                        <div className="home-card-item home-card-label">If you are recruiting for your dream project...</div>
                        <Link to={isLoggedIn ? "/createProject" : "login"}>
                            <div className="home-card-item home-button create-project">Create Your Project</div>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="home-section">
                <p className="nexus-network-subtitle">The NEXUS Network</p>
                <p className="tag-line">Join a community of self-motivated and driven students. Find a teammate or explore side project opportunities. Let&#39;s fuel your future!</p>
                {isMobile && <img className="two-ppl-home-img" src={peopleImage}></img>}
            </section>
            { !isMobile && <div className="community">

            </div>}
            <section className="home-section">
                <div className="company-tag">
                    <div className="logo-small">
                        <img src={logo} alt="logo" />
                    </div>
                    <p className="tag-text">
                        Supporting and empowering self-motivated and driven students toward their future
                    </p>
                </div>
                <hr className="footer-divider" />
                <div className="footer-links">
                    <Link to={"/projects"}>
                        <div className="footer-link-text">
                            Find Projects
                        </div>
                    </Link>
                    <Link to={"/createProject"}>
                        <div className="footer-link-text">
                            Recruit Team
                        </div>
                    </Link>
                    <Link to={"/createProject"}>
                        <   div className="footer-link-text">
                            Post a Project
                        </div>
                    </Link>
                </div>
                <div className="copyright-home">Copyright 2022 - NEXUS Builders</div>
                <div className="footer" />
            </section>
        </>
    )
}

export default Home;