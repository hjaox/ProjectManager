import { useSelector } from "react-redux";
import { TProfileState, TProjects } from "../../../common/types"
import { removeProject } from "../../../utils/axios/projects";
import { useNavigate } from "react-router-dom";
import "../../../style/Dashboard/projectCard.scss";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";

export default function ProjectCard({ project, setProjects }: TProjects) {
    const userId = useSelector((state: TProfileState) => state.userDetails._id);
    const navigate = useNavigate();
    const [showProjectOptions, setShowProjectOptions] = useState<{ [key: string]: boolean }>
        ({});
    const [showDeleteProjectPrompt, setShowDeleteProjectPrompt] = useState<{ [key: string]: boolean }>
        ({});

    async function handleProjectDelete(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>, projectId: string) {
        e.stopPropagation();

        setShowDeleteProjectPrompt(showDeleteProjectPrompt => ({ ...showDeleteProjectPrompt, [projectId]: !showDeleteProjectPrompt[projectId] }));
        handleOptions(e, projectId)
    }

    async function deleteProject(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, projectId: string) {
        e.preventDefault();
        try {
            const updatedProjectList = await removeProject(userId, projectId);
            setProjects(() => [...updatedProjectList]);
        } catch {

        }
    }

    function handleOptions(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>, projectId: string) {
        e.stopPropagation();
        setShowProjectOptions(showProjectOptions => ({ ...showProjectOptions, [projectId]: !showProjectOptions[projectId] }));
    }

    function handleProjectItem(projectId: string, projectName: string) {
        navigate(`/Project/${projectName}/${projectId}`);
    }

    return (
        <li className="dashboard-projects-list-item" style={{backgroundImage: `url(${project.background})`}}>
            {
                showDeleteProjectPrompt?.[project._id]
                    ? (
                        <div className="project-delete-prompt-container" onClick={e => e.stopPropagation()}>
                            <div className="project-delete-prompt">
                                <div className="prompt-text">
                                    Delete Project?
                                </div>
                                <div className="prompt-options">
                                    <button onClick={e => handleProjectDelete(e, project._id)}>Cancel</button>
                                    <button onClick={e => deleteProject(e, project._id)}>Confirm</button>
                                </div>
                            </div>

                        </div>
                    )
                    : (
                        <div className="project-container" onClick={() => handleProjectItem(project._id, project.projectName)}>
                            <div className="projects-list-item-title">{project.projectName}</div>
                            <div className="project-options-container" onClick={e => handleOptions(e, project._id)} id={`${project._id}`}>
                                <div className="project-options-icon-container">
                                    <HiDotsVertical className="project-options-icon" />
                                </div>
                                {
                                    showProjectOptions[project._id] && (
                                        <div className="project-options" >
                                            <div className="project-options-item top">Edit</div>
                                            <div className="project-options-item bot" onClick={e => handleProjectDelete(e, project._id)}>Delete</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
            }
        </li>
    )
}