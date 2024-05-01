import { useEffect, useState } from "react";
import { getProjectsByUserID, removeProject, addProject } from "../../utils/axios/projects";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileState, ProjectList } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import "../../style/Dashboard/dashboard.scss";
import Footer from "../subcomponent/Footer.tsx/Footer";
import { Rings } from "react-loader-spinner";
import { RiDeleteBin2Fill } from "react-icons/ri";


export default function Dashboard() {
    const [projectListData, setProjectListData] = useState<ProjectList[]>([]);
    const navigate = useNavigate();
    //const status = useSelector((state: isLoggedInState) => state.isLoggedIn);
    const userDetails = useSelector((state: ProfileState) => state.userDetails);
    const [newProjectName, setNewProjectName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        (async () => {
            try {
                setLoading(true);
                const projectList = await getProjectsByUserID(userDetails._id);
                setProjectListData(() => [...projectList]);
                setLoading(false);
            } catch {

            }
        })();
    }, [])

    function handleProjectList(projects: ProjectList[]) {
        return projects.map(({ _id, projectName }, i) => {
            return <li key={i} className="dashboard-projects-list-item" onClick={() => handleProjectItem(_id, projectName)}>
                <div className="projects-list-item-title">{projectName}</div>
                <div className="projects-list-item-delete" onClick={e => handleProjectDelete(e, userDetails._id, _id)}>
                <RiDeleteBin2Fill className="projects-list-item-delete-icon" size={20}/>
                </div>
            </li>
        })
    }

    async function handleProjectDelete(e: React.MouseEvent, userId: string, projectId: string) {
        e.preventDefault();
        e.stopPropagation();

        try {
            const projectList = await removeProject(userId, projectId);
            setProjectListData(() => [...projectList]);
        } catch {

        }
    }

    function handleProjectItem(projectId: string, projectName: string) {
        navigate(`/Project/${projectName}/${projectId}`);
    }

    async function handleAddProject(e: React.FormEvent, userId: string, projectName: string) {
        e.preventDefault();

        try {
            const projectList = await addProject(userId, projectName);
            setProjectListData(() => [...projectList]);
            setNewProjectName(() => "");
        } catch {

        }
    }

    return (
        <section className="dashboard-page">
            <Header />

            <section className="dashboard-display">
                <h1 className="dashboard-header">Dashboard</h1>
                {
                    loading
                        ? (
                            <>
                                <Rings />
                            </>
                        )
                        : (
                            <section className="dashboard-projects">
                                <ul className="dashboard-projects-list">
                                    {handleProjectList(projectListData)}
                                    <li className="dashboard-addProject">
                                        <form id="addProjectForm" onSubmit={e => handleAddProject(e, userDetails._id, newProjectName)}>
                                            <input type="text" value={newProjectName || ""} placeholder="Add Project" onChange={e => setNewProjectName(e.target.value)} />
                                            <button type="submit" form="addProjectForm">+</button>
                                        </form>
                                    </li>
                                </ul>
                            </section>
                        )
                }
            </section>

            <Footer />
        </section>
    )
}