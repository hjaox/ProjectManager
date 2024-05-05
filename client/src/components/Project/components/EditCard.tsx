import { useEffect, useState } from "react";
import { TEditCard, TProfileState } from "../../../common/types";
import "../../../style/Project/editCard.scss";
import { ContentState, Editor, EditorState } from "draft-js";
import { deleteCard } from "../../../utils/axios/project";
import { useSelector } from "react-redux";
export default function EditCard({ cardToEdit, projectId, columnId, setProject }: TEditCard) {
    const userId = useSelector((state: TProfileState) => state.userDetails._id);
    const [cardName, setCardName] = useState(EditorState.createEmpty());

    useEffect(() => {
        setCardName(EditorState.createWithContent(ContentState.createFromText(cardToEdit.cardName)));

    }, [cardToEdit])

    async function handleDeleteCard() {
        try {
            console.log(userId, projectId, columnId, cardToEdit._id)
            const updatedProject = await deleteCard(userId, projectId, columnId, cardToEdit._id)
            if (updatedProject) {
                setProject(() => ({ ...updatedProject }))
            }
        } catch {

        }
    }

    return (
        <div className="card-options">
            <form id="card-options-form">
                <div className="card-options-cardName-input-container">
                    <Editor editorState={cardName} onChange={setCardName} />
                </div>
                <ul className="card-options-items-container">
                    <div className="card-options-item" onClick={() => handleDeleteCard()}>Delete</div>
                </ul>
                <button form="card-options-form">Save</button>
            </form>

        </div>
    )
}