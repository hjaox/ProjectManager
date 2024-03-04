import { useEffect, useState } from "react";
import { getProjectsByUserID } from "../../utils/axios/projects";
import { useSelector } from "react-redux";

type ProjectList = {
    project_id: number,
    project_name: string,
    for_owner_id: number
};

type userDetailsState = {
    userDetails: {
        id: string,
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
    let status = useSelector((state: isLoggedInState) => state.isLoggedIn);
    let user = useSelector((state: userDetailsState) => state.userDetails);

    useEffect(() => {
        console.log(user)
    }, [])

    function handleProjectList(projects: ProjectList[]) {
        return projects.map(({project_id, project_name}, i) => {
            return <li key={i} className="itemContainer" onClick={() => handleProjectItem(project_id)}>
                {project_id}{project_name}
                </li>
        })
    }

    function handleProjectItem(project_id: number) {

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