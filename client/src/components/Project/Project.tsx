import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProjectByProjectId } from "../../utils/axios/project";
import { useSelector } from "react-redux";
import { TProfileState, TProject } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import "../../style/Project/project.scss";
import { Rings } from "react-loader-spinner";
import ProfileOverview from "./components/ProfileOverview";
import { getProjectsByUserID } from "../../utils/axios/projects";
import Columns from "./components/Columns";

export default function Project() {
    const { projectId } = useParams();
    const userId = useSelector((state: TProfileState) => state.userDetails._id);
    const [project, setProject] = useState<TProject | null>(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [projects, setProjects] = useState<TProject[]>([]);

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
                                            />
                                            <section className="project-board">
                                                <h2>
                                                    {project.projectName}
                                                </h2>
                                                <Columns
                                                    columns={project.columns}
                                                    userId={userId}
                                                    setProject={setProject}
                                                    project={project}
                                                />
                                            </section>
                                        </>

                                    )
                                }
                            </>

                        )
                }
            </section>
        </section>
    )
}