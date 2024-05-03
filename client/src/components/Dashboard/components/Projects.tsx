import { useSelector } from "react-redux";
import { TProfileState, TProjects } from "../../../common/types"
import { removeProject } from "../../../utils/axios/projects";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "../../../style/Dashboard/projectCard.scss";

export default function Projects({ projects, setProjects }: TProjects) {
    const userId = useSelector((state: TProfileState) => state.userDetails._id);
    const navigate = useNavigate();

    async function handleProjectDelete(e: React.MouseEvent, userId: string, projectId: string) {
        e.preventDefault();
        e.stopPropagation();

        try {
            const updatedProjectList = await removeProject(userId, projectId);
            setProjects(() => [...updatedProjectList]);
        } catch {

        }
    }

    function handleProjectItem(projectId: string, projectName: string) {
        navigate(`/Project/${projectName}/${projectId}`);
    }

    return projects.map(({ _id, projectName }, i) => {
        return (
            <li key={i} className="dashboard-projects-list-item" onClick={() => handleProjectItem(_id, projectName)}>
                <div className="projects-list-item-title">{projectName}</div>
                <div className="projects-list-item-delete" onClick={e => handleProjectDelete(e, userId, _id)}>
                    <RiDeleteBin2Fill className="projects-list-item-delete-icon" size={20} />
                </div>
            </li>
        )
    })
}