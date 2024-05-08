import { useEffect, useState } from "react";
import { postCardInColumn } from "../../../utils/axios/project";
import { TCards, TProjectCard } from "../../../common/types";
import "../../../style/Project/cards.scss";
import { CiEdit } from "react-icons/ci";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Editor, EditorState } from "draft-js";
import 'draft-js/dist/Draft.css';

export default function Cards({ userId, projectId, setProject, cards, columnId, setShowCardOptions, setCardToEdit, setDisplayCard }: TCards) {
    const [editorCardName, setEditorCardName] = useState(EditorState.createEmpty());
    const [addCardError, setAddCardError] = useState(false);
    const [emptyCardError, setEmptyCardError] = useState(false);

    useEffect(() => {
        setShowCardOptions(showCardOptions => ({ ...showCardOptions, [columnId]: false }))
    }, []);

    async function handleAddCard(e: React.FormEvent) {
        e.preventDefault();
        const cardName = editorCardName.getCurrentContent().getPlainText("\u000A");

        if (!cardName.trim().length) {
            setEmptyCardError(true);
            return;
        }
        setEmptyCardError(false);

        try {
            const updatedProject = await postCardInColumn(userId, projectId, columnId, cardName);

            setEditorCardName(EditorState.createEmpty());
            setProject(() => ({ ...updatedProject }))
        } catch {
            setAddCardError(true);
        }
    }

    function handleCardOptionsOpen(card: TProjectCard) {
        setShowCardOptions(showCardOptions => ({ ...showCardOptions, [columnId]: true }));
        setCardToEdit(card);
    }

    function handleCards(cards: TProjectCard[]) {
        return cards.map((card, i) => {
            return (
                <li key={i} className="project-board-column-card-list-item" onClick={() => setDisplayCard(card)}>
                    <h4 className="card-display">
                        {card.cardName}
                    </h4>
                    <div className="card-edit-open-container" onClick={() => handleCardOptionsOpen(card)}>
                        <CiEdit />
                    </div>
                </li>
            )
        })
    }

    return (
        <ul className="project-board-column-card-list">
            {
                !!cards.length && (
                    <>
                        {handleCards(cards)}

                    </>
                )
            }
            <li className="project-board-column-card-list-item-add">
                <form id={`form-${columnId}`} className="add-card-form" onSubmit={e => handleAddCard(e)}>
                    <div className={`card-add-form-input-container ${emptyCardError ? "emptyCardError": ""}`}>
                        <Editor
                            editorState={editorCardName}
                            onChange={setEditorCardName}
                            blockStyleFn={() => `newCardNameEditor column-${columnId}`}
                            placeholder={emptyCardError ? "Cannot be empty" : "Add Card"}
                        />
                    </div>
                    <button type="submit" form={`form-${columnId}`}>
                        <MdOutlineLibraryAdd />
                    </button>
                    {
                        addCardError && (
                            <div className="card-add-form-error">
                                Something went wrong. Please try again.
                            </div>
                        )
                    }
                </form>
            </li>
        </ul>
    )
}