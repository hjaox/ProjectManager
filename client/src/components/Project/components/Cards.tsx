import { useState } from "react";
import { postCardInColumn } from "../../../utils/axios/project";
import { TCards, TProjectCards } from "../../../common/types";

export default function Cards({ userId, projectId, setProject, cards, columnId }: TCards) {
    const [newCardName, setNewCardName] = useState<string>("");

    function handleAddCard(e: React.FormEvent, columnId: string) {
        e.preventDefault();
        postCardInColumn(userId, projectId, columnId, newCardName)
            .then(updatedProject => {
                setNewCardName(() => "");
                setProject(() => ({ ...updatedProject }))
            });
    }

    function handleCards(cards: TProjectCards[]) {
        return cards.map(({ cardName }, i) => {
            return (
                <li key={i} className="border rounded-lg p-1">
                    <span>{cardName}</span>
                </li>
            )
        })
    }
    return (
        <ul className="project-board-column-card-list">
            {
                cards.length && (
                    <>
                        {handleCards(cards)}
                    </>
                )
            }
            <li>
                <form id="addCardForm" onSubmit={e => handleAddCard(e, columnId)} className="flex justify-between">
                    <input type="text" value={newCardName || ""} placeholder="Add Card" onChange={e => setNewCardName(e.target.value)} />
                    <button type="submit" form="addCardForm">+</button>
                </form>
            </li>
        </ul>
    )
}