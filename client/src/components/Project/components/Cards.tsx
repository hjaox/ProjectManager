import { useEffect, useState } from "react";
import { postCardInColumn } from "../../../utils/axios/project";
import { TCards, TProjectCard } from "../../../common/types";
import "../../../style/Project/cards.scss";
import { CiEdit } from "react-icons/ci";

export default function Cards({ userId, projectId, setProject, cards, columnId, setShowcardOptions, setCardToEdit }: TCards) {
    const [newCardName, setNewCardName] = useState<string>("");
    const [addCardError, setAddCardError] = useState(false);
    const [emptyCardError, setEmptyCardError] = useState(false);

    useEffect(() => {
        setShowcardOptions(showCardOptions => ({ ...showCardOptions, [columnId]: false }))
    }, []);

    async function handleAddCard(e: React.FormEvent) {
        e.preventDefault();
        if (!newCardName.trim().length) {
            setEmptyCardError(true);
            return;
        }
        setEmptyCardError(false);

        try {
            const updatedProject = await postCardInColumn(userId, projectId, columnId, newCardName);

            setNewCardName(() => "");
            setProject(() => ({ ...updatedProject }))
        } catch {
            setAddCardError(true);
        }
    }

    function handleCardOptionsOpen(card: TProjectCard) {
        setShowcardOptions(showCardOptions => ({ ...showCardOptions, [columnId]: true }));
        setCardToEdit(card);
    }

    function handleCards(cards: TProjectCard[]) {
        return cards.map((card, i) => {
            return (
                <li key={i} className="project-board-column-card-list-item">
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
                    <input name="card-add-form-input" type="text" value={newCardName || ""} placeholder="Add Card" onChange={e => setNewCardName(e.target.value)} className={`card-add-form-input ${emptyCardError ? "input-error" : ""}`} />
                    <button type="submit" form={`form-${columnId}`}>+</button>
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