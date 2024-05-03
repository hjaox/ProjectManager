import { useState } from "react";
import { TColumns, TProjectColumn } from "../../../common/types";
import { postColumnInProject } from "../../../utils/axios/project";
import "../../../style/Project/columns.scss";
import Cards from "./Cards";

export default function Columns({ columns, setProject, userId, project }: TColumns) {
    const [newColumnName, setNewColumnName] = useState<string>("");


    function handleAddColumn(e: React.FormEvent) {
        e.preventDefault();
        if (project?._id && newColumnName) {
            postColumnInProject(userId, project._id, newColumnName)
                .then(updatedProject => {
                    setNewColumnName(() => "");
                    setProject(() => ({ ...updatedProject }));

                })
        }
    }

    function handleColumns(columns: TProjectColumn[]) {
        return columns.map(({ columnName, cards, _id }, i) => {
            return (
                <li key={i} className="project-board-column-list-item">
                    <h3>
                        {columnName}
                    </h3>
                    {
                        <Cards
                            userId={userId}
                            projectId={project._id}
                            setProject={setProject}
                            cards={cards}
                            columnId={_id}
                        />
                    }
                </li>
            )
        });
    }

    return (
        <ul className="project-board-column-list">
            {
                columns.length && (
                    <>
                        {handleColumns(columns)}
                    </>
                )
            }
            <li className="project-board-column-list-item add-column">
                <form id="column-add-form" onSubmit={e => handleAddColumn(e)} className="flex justify-between">
                    <input type="text" value={newColumnName || ""} placeholder="Add column" onChange={e => setNewColumnName(e.target.value)} />
                    <button type="submit" form="column-add-form">+</button>
                </form>
            </li>
        </ul>
    )
}