import { useState } from "react";
import { TColumns, TProjectCards, TProjectColumn } from "../../../common/types";
import { postCardInColumn, postColumnInProject } from "../../../utils/axios/project";

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
                <li key={i} className="p-2 border rounded-lg h-fit max-w-64 break-words">
                    <span>
                        {columnName}
                    </span>
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
        <ul className="project-board-columns">
            {
                columns.length && (
                    <>
                        {handleColumns(columns)}
                    </>
                )
            }
            <form id="addColumnForm" onSubmit={e => handleAddColumn(e)} className="flex justify-between">
                <input type="text" value={newColumnName || ""} placeholder="Add column" onChange={e => setNewColumnName(e.target.value)} />
                <button type="submit" form="addColumnForm">+</button>
            </form>

        </ul>
    )
}