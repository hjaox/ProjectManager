import { useEffect, useState } from "react";
import { getProjectsByUserID } from "../../utils/axios/projects";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileState } from "../../common/types";
import { removeProject } from "../../utils/axios/projects";

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
            console.log(projectList)
            setProjectListData(() => [...projectList]);
        })
    }, [])

    function handleProjectList(projects: ProjectList[]) {
        return projects.map(({_id, projectName}, i) => {
            return <li key={i} className="itemContainer block relative" onClick={() => handleProjectItem(_id, projectName)}>
                <span>{projectName}</span>
                <span className="absolute top-0 right-0" onClick={e => handleProjectDelete(e, userDetails._id, _id)}>x</span>
                </li>
        })
    }

    function handleProjectDelete(e: React.MouseEvent, userId: string, projectId: string) {
        e.preventDefault();
        e.stopPropagation();
        return removeProject(userId, projectId)
        .then(projectList => {
            setProjectListData(() => [...projectList]);
        })
    }

    function handleProjectItem(projectId: string, projectName: string) {
        navigate(`/Project/${projectName}/${projectId}`);
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