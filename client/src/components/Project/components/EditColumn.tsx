import { useState } from "react";
import { TEditColumn } from "../../../common/types";
import { ContentState, Editor, EditorState } from "draft-js";
import "../../../style/Project/editColumn.scss";
import { IoSaveOutline } from "react-icons/io5";
import { patchColumn } from "../../../utils/axios/project";

export default function EditColumn({userId, projectId, columnId, columnName, setProject }: TEditColumn) {
    const [updatedColumnName, setUpdatedColumnName] = useState(EditorState.createWithContent(ContentState.createFromText(columnName)));

    async function updateColumnName() {
        try {
            const updatedProject = await patchColumn(userId, projectId, columnId, updatedColumnName.getCurrentContent().getPlainText("\u000A"));

            setProject(() => ({...updatedProject}));
        } catch {

        }
    }

    return (
        <div className="column-edit-container">
            <div className="column-edit-input-container">
                <Editor editorState={updatedColumnName} onChange={setUpdatedColumnName} />
            </div>
            <div className="column-edit-save-icon-container" onClick={() => updateColumnName()}>
                <IoSaveOutline className="column-edit-save-icon" />
            </div>
        </div>
    )
}