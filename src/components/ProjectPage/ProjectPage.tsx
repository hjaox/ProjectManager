import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProjectByProjectId, postColumnInProject, postCardInColumn } from "../../utils/axios/project";
import { useSelector } from "react-redux";
import { CardDetails, ColumnDetails, ProfileState, ProjectDetails } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import Footer from "../subcomponent/Footer.tsx/Footer";

export default function ProjectPage() {
    const { projectId } = useParams();
    const userDetails = useSelector((state: ProfileState) => state.userDetails);
    const [newColumnName, setNewColumnName] = useState<string>("");
    const [newCardName, setNewCardName] = useState<string>("");
    const [projectDetails, setProjectDetails] = useState<null | ProjectDetails>(null);

    useEffect(() => {
        if (projectId) {
            console.log(projectId)
            getProjectByProjectId(userDetails._id, projectId)
                .then(projectDetails => {
                    setProjectDetails(() => ({ ...projectDetails }))
                })
        }
    }, [])

    function handleColumns(columns: ColumnDetails[]) {
        return columns.map(({ columnName, cards, _id }, i) => {
            return (
                <li key={i} className="p-2 border">
                    <span className="">
                        {columnName}
                    </span>

                    {
                        !!cards.length && (
                            <ul className="flex pt-2 flex-col">
                                {handleCards(cards)}
                                <li className="border h-fit p-1">
                                    <form id="addCardForm" onSubmit={e => handleAddCard(e, _id)}>
                                        <input type="text" value={newCardName || ""} placeholder="Add Card" onChange={e => setNewCardName(e.target.value)} />
                                        <button type="submit" form="addCardForm">+</button>
                                    </form>
                                </li>
                            </ul>
                        )
                    }

                </li>
            )
        });
    }

    function handleCards(cards: CardDetails[]) {
        return cards.map(({ cardName }, i) => {
            return (
                <li key={i}>
                    <span>{cardName}</span>
                </li>
            )
        })
    }

    function handleAddColumn(e: React.FormEvent) {
        e.preventDefault();
        if (projectDetails?._id && newColumnName) {
            postColumnInProject(userDetails._id, projectDetails._id, newColumnName)
                .then(updatedProject => {
                    setNewColumnName(() => "");
                    setProjectDetails(() => ({ ...updatedProject }));

                })
        }
    }

    function handleAddCard(e: React.FormEvent, columnId: string) {
        e.preventDefault();
        if (projectDetails?._id && newCardName) {
            postCardInColumn(userDetails._id, projectDetails._id, columnId, newCardName)
                .then(updatedProject => {
                    setNewCardName(() => "");
                    setProjectDetails(() => ({ ...updatedProject }));

                })
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="h-full">
                {
                    !projectDetails
                        ? (<>isLoading</>)
                        : (
                            <>
                                <div className="bg-gray-400 h-10">
                                    <h2>{projectDetails.projectName}</h2>
                                </div>
                                <div>
                                    {
                                        !projectDetails.columns.length
                                            ? (<>isEmpty</>)
                                            : (
                                                <ul className="flex gap-6 p-1">
                                                    {handleColumns(projectDetails.columns)}
                                                    <li className="border h-fit p-1">
                                                        <form id="addColumnForm" onSubmit={e => handleAddColumn(e)}>
                                                            <input type="text" value={newColumnName || ""} placeholder="Add column" onChange={e => setNewColumnName(e.target.value)} />
                                                            <button type="submit" form="addColumnForm">+</button>
                                                        </form>
                                                    </li>
                                                </ul>
                                            )
                                    }
                                </div>
                            </>
                        )
                }
            </div>
            <Footer />
        </div>
    )
}