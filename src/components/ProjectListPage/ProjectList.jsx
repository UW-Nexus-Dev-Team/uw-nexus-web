import { useEffect, useState } from "react";
import getData from "../../logic/getData";
import ProjectListItem from "./ProjectListItem";
import "./ProjectList.css";

const ProjectList = ({
    listOfProjectData,
    setListOfProjectData,
    isLoading,
    setIsLoading,
    isLoggedIn
}) => {

    const ALL_PROJECTS = `/api/project/allProjects`;
    const PROJECTS_PER_PAGE = 5;

    const [page, setPage] = useState(1);

    useEffect(() => {
        getData(setIsLoading, ALL_PROJECTS, setListOfProjectData);
    }, [setIsLoading, ALL_PROJECTS, setListOfProjectData]);

    useEffect(() => {
        if (listOfProjectData.length != 0) {
            setPage(1);
        }
    }, [listOfProjectData])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (listOfProjectData.length === 0) {
        return (
            <div className="no-projects-found-container">
                No Projects Found.
            </div>
        )
    }

    let numProjects = listOfProjectData.length;
    let numPages = Math.ceil(numProjects / PROJECTS_PER_PAGE);

    function changePage(next) {
        if (next) {
            setPage(page + 1);
        } else {
            setPage(page - 1);
        }
    }

    const createPrevButton = () => {
        if (page != 1) {
            return <button className="prev-btn" onClick={() => changePage(false)}>Back</button>;
        } else {
            return <div className="prev-btn"></div>;
        }
    }

    const createNextButton = () => {
        if (page != numPages) {
            return <button className="next-btn" onClick={() => changePage(true)}>Next</button>;
        }
    }

    return (
        <div className="project-list">
            {
                listOfProjectData.map((project, i) => {
                    if ((i + 1) > (PROJECTS_PER_PAGE * (page - 1)) && (i + 1) <= (PROJECTS_PER_PAGE * page)) {
                        return (
                            <ProjectListItem project={project} key={i} isLoading={isLoading} isLoggedIn={isLoggedIn}/>
                        )
                    }
                })
            }
            <div className="navigation-container">
                <div className="navigation-buttons">
                    {createPrevButton()}
                    <p className="current-page-text">{page} of {numPages}</p>
                    {createNextButton()}
                </div>
            </div>
        </div>
    )
}

export default ProjectList;
