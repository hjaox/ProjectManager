import { useEffect, useState } from "react";
import { TEditCard, TProfileState } from "../../../common/types";
import "../../../style/Project/editCard.scss";
import { ContentState, Editor, EditorState } from "draft-js";
import { deleteCard } from "../../../utils/axios/project";
import { useSelector } from "react-redux";

export default function EditCard({ cardToEdit, projectId, columnId, setProject, setShowCardOptions, setShowDeletePrompt, showDeletePrompt }: TEditCard) {
    const userId = useSelector((state: TProfileState) => state.userDetails._id);
    const [cardName, setCardName] = useState(EditorState.createEmpty());

    useEffect(() => {
        setCardName(EditorState.createWithContent(ContentState.createFromText(cardToEdit.cardName)));

    }, [cardToEdit])

    async function handleDeleteCard() {
        try {
            const updatedProject = await deleteCard(userId, projectId, columnId, cardToEdit._id)

            if (updatedProject) {
                setShowCardOptions(showCardOptions => {
                    return Object.entries(showCardOptions).reduce((newOptions, option: [string, boolean]) => {
                        const key = option[0];
                        const value = option[1];

                        if (key !== cardToEdit._id) {
                            return { ...newOptions, key: false };
                        }
                        return { ...newOptions, key: value };
                    }, {});
                });

                setProject(() => ({ ...updatedProject }));
            }
        } catch {
        }
    }

    return (
        <div className={`card-options ${showDeletePrompt ? "delete-prompt-container" : ""}`}>
            {
                showDeletePrompt
                    ? (
                        <div className="card-options-delete-prompt">
                            <div>Delete Card?</div>
                            <div className="card-options-delete-prompt-select-container">
                                <button className="delete-prompt-select-option" onClick={() => handleDeleteCard()}>Confirm</button>
                                <button className="delete-prompt-select-option" onClick={() => setShowDeletePrompt(false)}>Cancel</button>
                            </div>
                        </div>
                    )
                    : (
                        <form id="card-options-form">
                            <div className="card-options-cardName-input-container">
                                <Editor editorState={cardName} onChange={setCardName} />
                            </div>
                            <ul className="card-options-items-container">
                                <div className="card-options-item" onClick={() => setShowDeletePrompt(true)}>Delete</div>
                            </ul>
                            <button form="card-options-form">Save</button>
                        </form>
                    )
            }
        </div>
    )
}