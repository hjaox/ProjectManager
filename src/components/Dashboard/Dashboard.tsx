import { useEffect, useState } from "react";
import { getProjectsByUserID } from "../../utils/axios/projects";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileState } from "../../common/types";

type ProjectList = {
    _id: string,
    projectName: string,
    createdAt: string,
    updatedAt: string,
    columns: []
};

// type isLoggedInState = {
//     isLoggedIn: boolean
// }

export default function Dashboard() {
    const [projectListData, setProjectListData] = useState<ProjectList[] | null>(null);
    const navigate = useNavigate();
    //const status = useSelector((state: isLoggedInState) => state.isLoggedIn);
    const userDetails = useSelector((state: ProfileState) => state.userDetails);

    useEffect(() => {
        getProjectsByUserID(userDetails._id)
        .then(projectList => {
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

    function handleProjectItem(projectId: string, projectName: string) {
        navigate(`/Project/${projectName}`, {state: {projectId}})
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