import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getProjectByProjectId } from "../../utils/axios/project";
import { useSelector } from "react-redux";
import { TProfileState, TProject, TProjectCard } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import "../../style/Project/project.scss";
import { Rings } from "react-loader-spinner";
import ProfileOverview from "./components/ProfileOverview";
import { getProjectsByUserID } from "../../utils/axios/projects";
import Columns from "./components/Columns";
import DisplayCard from "./components/DisplayCard";

export default function Project() {
    const { projectId } = useParams();
    const userId = useSelector((state: TProfileState) => state.userDetails._id);
    const isLoggedIn = useSelector((state: TProfileState) => state.isLoggedIn);
    const [project, setProject] = useState<TProject | null>(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [expandOverview, setExpandOverview] = useState(true);
    const [projects, setProjects] = useState<TProject[]>([]);
    const [displayCard, setDisplayCard] = useState<{
        card: TProjectCard, userId: string, projectId: string, columnId: string
    } | null>(null);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (projectId) {
                setPageLoading(true);
                (async () => {
                    try {
                        const projectDetails = await getProjectByProjectId(userId, projectId);
                        const userProjectlist = await getProjectsByUserID(userId);
                        setProjects(() => ([...userProjectlist]));
                        setProject(() => ({ ...projectDetails }));
                    } catch {

                    }
                })();

                setPageLoading(false);
            }
        } else {
            setRedirectLogin(!isLoggedIn);
        }

    }, [])

    useEffect(() => {
        if (projectId) {
            (async () => {
                const projectDetails = await getProjectByProjectId(userId, projectId);
                setProject(() => ({ ...projectDetails }));
            })();
        }

    }, [projectId]);

    return (
        <section className="project-page">
            <Header />
            {
                redirectLogin
                    ? (
                        <div className="redirectToLogin-container">
                            <div className="redirectToLogin">
                                <div className="redirectToLogin-text">
                                    You are not logged in. Please login.
                                </div>
                                <div className="redirectToLogin-options">
                                    <button className="redirectToLogin-options-item" onClick={() => navigate("/Home")}>Home</button>
                                    <button className="redirectToLogin-options-item" onClick={() => navigate("/Login")}>Login</button>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <section className="project-display">
                            {
                                pageLoading
                                    ? (
                                        <Rings />
                                    )
                                    : (
                                        <>
                                            {
                                                project && (
                                                    <>
                                                        <ProfileOverview
                                                            projects={projects}
                                                            project={project}
                                                            setExpandOverview={setExpandOverview}
                                                            expandOverview={expandOverview}
                                                        />

                                                        <section className={`project-board ${expandOverview ? "p-left-15rem" : "p-left-1rem"}`}>
                                                            <h2>
                                                                {project.projectName}
                                                            </h2>
                                                            <Columns
                                                                columns={project.columns}
                                                                userId={userId}
                                                                setProject={setProject}
                                                                project={project}
                                                                setDisplayCard={setDisplayCard}
                                                            />
                                                        </section>
                                                    </>

                                                )
                                            }
                                            {
                                                displayCard && (
                                                    < DisplayCard
                                                        displayCard={displayCard}
                                                        setDisplayCard={setDisplayCard}
                                                        setProject={setProject}
                                                    />
                                                )
                                            }
                                        </>

                                    )
                            }
                        </section>
                    )
            }

        </section>
    )
}