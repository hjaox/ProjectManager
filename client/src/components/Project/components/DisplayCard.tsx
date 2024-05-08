import { ContentState, Editor, EditorState } from "draft-js";
import { TDisplayCard } from "../../../common/types";
import "../../../style/Project/displayCard.scss";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { patchCard } from "../../../utils/axios/project";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function DisplayCard({ displayCard, setDisplayCard, setProject }: TDisplayCard) {
    const [editorDetails, setEditorDetailsState] = useState(EditorState.createWithContent(ContentState.createFromText(displayCard.card.details)));
    const [editMode, setEditMode] = useState(false);

    async function updateCardDetails() {
        const updatedDetails = editorDetails.getCurrentContent().getPlainText("\u000A");
        const { userId, projectId, columnId, card: { _id } } = displayCard;

        try {
            const updatedProject = await patchCard(userId, projectId, columnId, _id, updatedDetails);

            setProject(() => ({ ...updatedProject }));
            setEditMode(false);
        } catch {

        }
    }

    return (
        <div className="display-card-container" onClick={() => setDisplayCard(null)}>
            <div className="display-card" onClick={e => e.stopPropagation()}>
                <div className="display-card-close-icon-container">
                    <IoCloseCircleOutline className="display-card-close-icon" onClick={() => setDisplayCard(null)}/>
                </div>
                <h3 className="display-card-cardname">
                    {displayCard.card.cardName}
                </h3>
                <div>
                    <div className="display-card-details-title">
                        <h4>Details</h4>
                        <div className="edit-icon-container" onClick={() => setEditMode(true)}>
                            <CiEdit className="edit-icon" />
                        </div>
                    </div>
                </div>
                <div className="display-card-details">
                    {
                        editMode
                            ? (
                                <>
                                    <div className="card-details-editor-container">
                                        <Editor editorState={editorDetails} onChange={setEditorDetailsState} />
                                    </div>
                                </>

                            )
                            : (
                                <div className="card-details-text">
                                    {
                                        editorDetails.getCurrentContent().getPlainText("\u000A")
                                    }
                                </div>
                            )
                    }
                </div>
                {
                    editMode && (
                        <div className={`card-details-edit-options card-${displayCard.card._id}`}>
                            <button className="card-details-edit-options-item" onClick={() => setEditMode(false)}>Cancel</button>
                            <button className="card-details-edit-options-item" onClick={() => updateCardDetails()}>Save</button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}