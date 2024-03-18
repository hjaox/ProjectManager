import { useEffect, useState } from "react";
import { getProjectsByUserID, removeProject, addProject } from "../../utils/axios/projects";
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
    const [newProjectName, setNewProjectName] = useState<string>("")

    useEffect(() => {
        getProjectsByUserID(userDetails._id)
            .then(projectList => {
                setProjectListData(() => [...projectList]);
            })
    }, [])

    function handleProjectList(projects: ProjectList[]) {
        return projects.map(({ _id, projectName }, i) => {
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

    function handleAddProject(e: React.FormEvent, userId: string, projectName: string) {
        e.preventDefault();
        return addProject(userId, projectName)
        .then(projectList => {
            setProjectListData(() => [...projectList]);
            setNewProjectName(() => "");
        })
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
                        <ul className="flex gap-2 flex-wrap">
                            {handleProjectList(projectListData)}
                            <li className="itemContainer block relative">
                                <form id="addProjectForm" onSubmit={e => handleAddProject(e, userDetails._id, newProjectName)} className="flex justify-between">
                                    <input type="text" value={newProjectName || ""} placeholder="Add Project" onChange={e => setNewProjectName(e.target.value)} />
                                    <button type="submit" form="addProjectForm">+</button>
                                </form>
                            </li>
                        </ul>
                    )

            }
        </>
    )
}