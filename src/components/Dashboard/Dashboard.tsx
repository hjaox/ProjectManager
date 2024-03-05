import { useEffect, useState } from "react";
import { getProjectsByUserID } from "../../utils/axios/projects";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type ProjectList = {
    _id: string,
    projectName: string,
    createdAt: string,
    updatedAt: string,
    columns: []
};

type userDetailsState = {
    userDetails: {
        _id: string,
        name: string,
        username: string,
        email: string,
        accessToken: string
    }
};

type isLoggedInState = {
    isLoggedIn: boolean
}

export default function Dashboard() {
    let [projectListData, setProjectListData] = useState<ProjectList[] | null>(null);
    const navigate = useNavigate();
    let status = useSelector((state: isLoggedInState) => state.isLoggedIn);
    let userDetails = useSelector((state: userDetailsState) => state.userDetails);

    useEffect(() => {
        console.log(userDetails)
        getProjectsByUserID(userDetails._id)
        .then(projectList => {
            console.log(projectList)
            setProjectListData(() => [...projectList]);
        })
    }, [])

    function handleProjectList(projects: ProjectList[]) {
        return projects.map(({_id, projectName}, i) => {
            return <li key={i} className="itemContainer" onClick={() => handleProjectItem(_id, projectName)}>
                {projectName}
                </li>
        })
    }

    function handleProjectItem(project_id: string, projectName: string) {
        navigate(`/Project/${projectName}`, {state: {project_id}})
    }



    return (
        <>
        {
            projectListData === null ?
            (
                <p>...isLoading</p>
            )
            :
            (
                <ul className="flex gap-2">
                    {handleProjectList(projectListData)}
                </ul>
            )

        }
        </>
    )
}