import { useEffect, useState } from "react";
import { getProjectsByUserID, addProject } from "../../utils/axios/projects";
import { useSelector } from "react-redux";
import { TProfileState, TProject } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import "../../style/Dashboard/dashboard.scss";
import Footer from "../subcomponent/Footer.tsx/Footer";
import { Rings } from "react-loader-spinner";
import Projects from "./components/ProjectCard";
import { Editor, EditorState } from "draft-js";
import { MdOutlineLibraryAdd } from "react-icons/md";

export default function Dashboard() {
    const [projects, setProjects] = useState<TProject[]>([]);
    const userDetails = useSelector((state: TProfileState) => state.userDetails);
    const [newProjectName, setNewProjectName] = useState(EditorState.createEmpty());
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

    async function handleAddProject(e: React.FormEvent) {
        e.preventDefault();

        try {
            const updatedProjectList = await addProject(userDetails._id, newProjectName.getCurrentContent().getPlainText("\u000A"));
            setProjects(() => [...updatedProjectList]);
            setNewProjectName(EditorState.createEmpty());
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
                                    {
                                        projects.map(project => {
                                            return (
                                                <Projects
                                                project={project}
                                                setProjects={setProjects}/>
                                            )
                                        })
                                    }

                                    <li className="dashboard-addProject">
                                        <form id="addProjectForm" onSubmit={e => handleAddProject(e)}>
                                            <div className="project-add-form-input-container">
                                                <Editor
                                                    onChange={setNewProjectName}
                                                    editorState={newProjectName}
                                                    blockStyleFn={() => "project-add-form-input"}
                                                    placeholder="Add Project" />
                                            </div>
                                            <button type="submit" form="addProjectForm"><MdOutlineLibraryAdd className="project-add-form-container-icon" />
                                            </button>
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