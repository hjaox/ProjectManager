import { useState } from "react";
import { TColumns, TProjectCard, TProjectColumn } from "../../../common/types";
import { postColumnInProject } from "../../../utils/axios/project";
import "../../../style/Project/columns.scss";
import Cards from "./Cards";
import { IoCloseCircleOutline } from "react-icons/io5";
import EditCard from "./EditCard";

export default function Columns({ columns, setProject, userId, project, setDisplayCard }: TColumns) {
    const [newColumnName, setNewColumnName] = useState<string>("");
    const [showCardOptions, setShowCardOptions] = useState<{ [key: string]: boolean }>
        ({ _id: true });
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [cardToEdit, setCardToEdit] = useState<TProjectCard>({ cardName: "", _id: "", details: "'"});

    function handleAddColumn(e: React.FormEvent) {
        e.preventDefault();
        postColumnInProject(userId, project._id, newColumnName)
            .then(updatedProject => {
                setNewColumnName(() => "");
                setProject(() => ({ ...updatedProject }));

            })
    }

    function handleCardOptionsClose(colId: string) {
        setShowCardOptions(showCardOptions => ({ ...showCardOptions, [colId]: false }));
        setShowDeletePrompt(false);
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
                            setShowCardOptions={setShowCardOptions}
                            setCardToEdit={setCardToEdit}
                            setDisplayCard={setDisplayCard}
                        />
                    }
                    <div className={`card-options-container ${showCardOptions[_id] ? "card-options-show" : "card-options-hide"}`} >
                        <div className="card-edit-close-container" onClick={() => handleCardOptionsClose(_id)}>
                            <IoCloseCircleOutline />
                        </div>
                        {
                            <EditCard
                                projectId={project._id}
                                columnId={_id}
                                cardToEdit={cardToEdit}
                                setProject={setProject}
                                setShowCardOptions={setShowCardOptions}
                                setShowDeletePrompt={setShowDeletePrompt}
                                showDeletePrompt={showDeletePrompt}
                            />
                        }
                    </div>
                </li>
            )
        });
    }

    return (
        <ul className="project-board-column-list">
            {
                !!columns.length && (
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

