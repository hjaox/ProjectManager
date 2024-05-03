import { useState } from "react";
import { TColumns, TProjectCards, TProjectColumn } from "../../../common/types";
import { postCardInColumn, postColumnInProject } from "../../../utils/axios/project";
import "../../../style/Project/columns.scss";

export default function Columns({ columns, setProject, userId, project }: TColumns) {
    const [newColumnName, setNewColumnName] = useState<string>("");
    const [newCardName, setNewCardName] = useState<string>("");

    function handleAddColumn(e: React.FormEvent) {
        e.preventDefault();
        if (project?._id && newColumnName) {
            postColumnInProject(userId, project._id, newColumnName)
                .then(updatedProject => {
                    setNewColumnName(() => "");
                    setProject(() => ({ ...updatedProject }));

                })
        }
    }

    function handleColumns(columns: TProjectColumn[]) {
        return columns.map(({ columnName, cards, _id }, i) => {
            return (
                <li key={i} className="project-board-column-list-item">
                    <h3>
                        {columnName}
                    </h3>
                    {/*
                    {
                        !!cards.length && (
                            <ul className="flex pt-2 flex-col gap-2">
                                {handleCards(cards)}
                                <li className="border rounded-lg p-1">
                                    <form id="addCardForm" onSubmit={e => handleAddCard(e, _id)} className="flex justify-between">
                                        <input type="text" value={newCardName || ""} placeholder="Add Card" onChange={e => setNewCardName(e.target.value)} />
                                        <button type="submit" form="addCardForm">+</button>
                                    </form>
                                </li>
                            </ul>
                        )
                    } */}

                </li>
            )
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



    function handleAddCard(e: React.FormEvent, columnId: string) {
        e.preventDefault();
        if (project?._id && newCardName) {
            postCardInColumn(userId, project._id, columnId, newCardName)
                .then(updatedProject => {
                    setNewCardName(() => "");
                    setProject(() => ({ ...updatedProject }));

                })
        }
    }

    return (
        <ul className="project-board-column-list">
            {
                columns.length && (
                    <>
                        {handleColumns(columns)}
                    </>
                )
            }
            <li className="project-board-column-list-item add-column">
                <form id="column-add-form" onSubmit={e => handleAddColumn(e)} className="flex justify-between">
                    <input type="text" value={newColumnName || ""} placeholder="Add column" onChange={e => setNewColumnName(e.target.value)} />
                    <button type="submit" form="column-add-form">+</button>
                </form>
            </li>
        </ul>
    )
}