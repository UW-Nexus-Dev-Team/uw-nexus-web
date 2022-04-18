import { useEffect } from "react";
import getData from "../../logic/getData";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({
    listOfProjectData,
    setListOfProjectData,
    isLoading,
    setIsLoading
}) => {

    const ALL_PROJECTS = `${process.env.REACT_APP_API_URL}/api/project/allProjects`;

    console.log(ALL_PROJECTS);

    useEffect(() => {
        getData(setIsLoading, ALL_PROJECTS, setListOfProjectData);
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (listOfProjectData.length === 0) {
        return (
            <div>
                No Projects Found.
            </div>
        )
    }

    return (
        <>
            {
                listOfProjectData.map((project, i) => {
                    return (
                        <ProjectListItem project={project} key={i} isLoading={isLoading} />
                    )
                })
            }
        </>
    )
}

export default ProjectList;
