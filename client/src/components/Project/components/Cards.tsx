import { useState } from "react";
import { postCardInColumn } from "../../../utils/axios/project";
import { TCards, TProjectCards } from "../../../common/types";
import "../../../style/Project/cards.scss";
import { CiEdit } from "react-icons/ci";

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
                <li key={i} className="project-board-column-card-list-item">
                    <h4>
                        {cardName}
                        <CiEdit />
                    </h4>
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
            <li>
                <form id="card-add-form" onSubmit={e => handleAddCard(e, columnId)}>
                    <input type="text" value={newCardName || ""} placeholder="Add Card" onChange={e => setNewCardName(e.target.value)} />
                    <button type="submit" form="card-add-form">+</button>
                </form>
            </li>
        </ul>
    )
}