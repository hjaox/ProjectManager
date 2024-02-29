import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProjectsByUserID } from "../../lib/axios/projects";

type ProjectList = {
    project_id: number,
    project_name: string,
    for_owner_id: number
}

export default function Dashboard() {
    const { state: {user_id} } = useLocation();
    let [projectListData, setProjectListData] = useState<ProjectList[] | null>(null);

    useEffect(() => {
        getProjectsByUserID(user_id)
        .then(projects => {
            setProjectListData(() => [...projects])
        })
    }, [])

    function handleProjectList(projects: ProjectList[]) {
        return projects.map(({project_id, project_name}, i) => {
            return <li key={i}>{project_id}{project_name}</li>
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
                <ul>
                    {handleProjectList(projectListData)}
                </ul>
            )

        }
        </>
    )
}