import { useEffect, useState } from "react";
import { getProjectsByUserID, addProject } from "../../utils/axios/projects";
import { useSelector } from "react-redux";
import { TProfileState, TProject } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import "../../style/Dashboard/dashboard.scss";
import Footer from "../subcomponent/Footer.tsx/Footer";
import { Rings } from "react-loader-spinner";
import Projects from "./components/Projects";

export default function Dashboard() {
    const [projects, setProjects] = useState<TProject[]>([]);
    //const status = useSelector((state: isLoggedInState) => state.isLoggedIn);
    const userDetails = useSelector((state: TProfileState) => state.userDetails);
    const [newProjectName, setNewProjectName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        (async () => {
            try {
                setLoading(true);
                const userProjectlist = await getProjectsByUserID(userDetails._id);
                setProjects(() => [...userProjectlist]);
                setLoading(false);
            } catch {

            }
        })();
    }, [])

    async function handleAddProject(e: React.FormEvent, userId: string, projectName: string) {
        e.preventDefault();

        try {
            const updatedProjectList = await addProject(userId, projectName);
            setProjects(() => [...updatedProjectList]);
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
                                    <Projects
                                        projects={projects}
                                        setProjects={setProjects} />

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