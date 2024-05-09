import { useState } from "react";
import { TColumns, TProjectCard, TProjectColumn } from "../../../common/types";
import { postColumnInProject } from "../../../utils/axios/project";
import "../../../style/Project/columns.scss";
import Cards from "./Cards";
import { IoCloseCircleOutline } from "react-icons/io5";
import EditCard from "./EditCard";
import { HiDotsVertical } from "react-icons/hi";

export default function Columns({ columns, setProject, userId, project, setDisplayCard }: TColumns) {
    const [newColumnName, setNewColumnName] = useState<string>("");
    const [showCardOptions, setShowCardOptions] = useState<{ [key: string]: boolean }>
        ({});
    const [showDeleteCardPrompt, setShowDeleteCardPrompt] = useState(false);
    const [cardToEdit, setCardToEdit] = useState<TProjectCard>({ cardName: "", _id: "", details: "'" });
    const [showColumnOptions, setShowColumnOptions] = useState<{ [key: string]: boolean }>
        ({});
    const [showDeleteColumnPrompt, setShowDeleteColumnPrompt] = useState<{ [key: string]: boolean }>({});

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
        setShowDeleteCardPrompt(false);
    }

    function handleDeleteColumn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, colId: string) {
        e.preventDefault();
        setShowDeleteColumnPrompt(showDeleteColumnPrompt => ({ ...showDeleteColumnPrompt, [colId]: true }));
        handleShowColumnOptions(colId);
        try {

        } catch {

        }
    }

    function handleShowColumnOptions(colId: string) {
        setShowColumnOptions(showColumnOptions => ({ ...showColumnOptions, [colId]: !showColumnOptions[colId] }))
    }

    function handleColumns(columns: TProjectColumn[]) {
        return columns.map(({ columnName, cards, _id }, i) => {
            return (
                <li key={i} className="project-board-column-list-item">
                    <div className="column-header">
                        <div className="column-header-name">
                            {columnName}
                        </div>
                        <div className={`column-header-options`} onClick={() => handleShowColumnOptions(_id)}>
                            <HiDotsVertical className="column-header-options-icon" />
                        </div>
                    </div>
                    {
                        showColumnOptions?.[_id] && (
                            <div className="column-options-container">
                                <button className="column-options-item column-options-item-top">
                                    Edit
                                </button>
                                <button className="column-options-item column-options-item-bottom" onClick={e => handleDeleteColumn(e, _id)}>
                                    Delete
                                </button>
                            </div>
                        )
                    }
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
                                setShowDeleteCardPrompt={setShowDeleteCardPrompt}
                                showDeleteCardPrompt={showDeleteCardPrompt}
                            />
                        }
                    </div>
                    {
                        showDeleteColumnPrompt?.[_id] && (
                            <div className="column-delete-prompt-container">
                                <div className="column-delete-prompt">
                                    <h4 className="column-delete-promp-columnName">
                                        {columnName}
                                    </h4>
                                    <p className="column-delete-promp-text">
                                        Delete list?
                                    </p>
                                    <div className="column-delete-prompt-options">
                                        <button className="column-delete-prompt-options-item">
                                            Cancel
                                        </button>
                                        <button className="column-delete-prompt-options-item">
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
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
                <form id="column-add-form" onSubmit={e => handleAddColumn(e)}>
                    <input name="column-add-form-input" type="text" value={newColumnName || ""} placeholder="Add column" onChange={e => setNewColumnName(e.target.value)} />
                    <button type="submit" form="column-add-form">+</button>
                </form>
            </li>
        </ul>
    )
}

