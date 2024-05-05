import { useEffect, useState } from "react";
import { TEditCard } from "../../../common/types";
import "../../../style/Project/editCard.scss";
import { ContentState, Editor, EditorState } from "draft-js";
export default function EditCard({ cardToEdit }: TEditCard) {
    const [cardName, setCardName] = useState(EditorState.createEmpty());

    useEffect(() => {
        setCardName(EditorState.createWithContent(ContentState.createFromText(cardToEdit.cardName)));

    }, [cardToEdit])

    return (
        <div className="card-options">
            <form id="card-options-form">
                <div className="card-options-cardName-input-container">
                    <Editor editorState={cardName} onChange={setCardName} />
                </div>
                <ul className="card-options-items-container">
                    <div className="card-options-item">Delete</div>
                </ul>
                <button form="card-options-form">Save</button>
            </form>

        </div>
    )
}