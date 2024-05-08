import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
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
    const [project, setProject] = useState<TProject | null>(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [projects, setProjects] = useState<TProject[]>([]);
    const [expandOverview, setExpandOverview] = useState(true);
    const [displayCard, setDisplayCard] = useState<TProjectCard | null>(null);

    useEffect(() => {
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
                                        />
                                        // <div className="display-card-container" onClick={() => setDisplayCard(null)}>
                                        //     <div className="display-card" onClick={e => e.stopPropagation()}>
                                        //         <h3 className="display-card-cardname">
                                        //             {displayCard.cardName}
                                        //         </h3>
                                        //         <h4 className="display-card-details-title">
                                        //             Details
                                        //         </h4>
                                        //         <p className="display-card-details">
                                        //             {displayCard.details}
                                        //         </p>
                                        //     </div>
                                        // </div>
                                    )
                                }
                            </>

                        )
                }
            </section>
        </section>
    )
}