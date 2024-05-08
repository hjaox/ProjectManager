import { ContentState, Editor, EditorState } from "draft-js";
import { TDisplayCard } from "../../../common/types";
import "../../../style/Project/displayCard.scss";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";

export default function DisplayCard({ displayCard, setDisplayCard }: TDisplayCard) {
    const [editorDetails, setEditorDetailsState] = useState(EditorState.createWithContent(ContentState.createFromText(displayCard.details)));
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="display-card-container" onClick={() => setDisplayCard(null)}>
            <div className="display-card" onClick={e => e.stopPropagation()}>
                <h3 className="display-card-cardname">
                    {displayCard.cardName}
                </h3>
                <div>
                    <div className="display-card-details-title">
                        <h4>Details</h4>
                        <div className="edit-icon-container" onClick={() => setEditMode(true)}>
                            <CiEdit className="edit-icon" />
                        </div>
                    </div>
                </div>
                <p className="display-card-details">
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
                                    {displayCard.details}
                                </div>
                            )
                    }
                </p>
                {
                    editMode && (
                        <div className="card-details-edit-options">
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                            <button>Save</button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}