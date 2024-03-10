import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getProjectByProjectId, postColumnInProject } from "../../utils/axios/project";
import { useSelector } from "react-redux";
import { CardDetails, ColumnDetails, ProfileState, ProjectDetails } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import Footer from "../subcomponent/Footer.tsx/Footer";

export default function ProjectPage() {
    const {state: {projectId}} = useLocation();
    const userDetails = useSelector((state: ProfileState) => state.userDetails);
    const [newColumnName, setNewColumnName] = useState<null | string>(null);
    let [projectDetails, setProjectDetails] = useState<null | ProjectDetails>(null);

    useEffect(() => {
        getProjectByProjectId(userDetails._id, projectId)
        .then(projectDetails => {
            setProjectDetails(() => ({...projectDetails}))
        })
    }, [])

    function handleColumns(columns: ColumnDetails[]) {
        return columns.map(({columnName, cards}, i) => {
            return (
                <li key={i} className="p-2 border">
                    <span className="">
                        {columnName}
                    </span>

                    {
                    !!cards.length && (
                        <ul className="flex pt-2 flex-col">
                            {handleCards(cards)}
                            <li>add card</li>
                        </ul>
                    )
                    }

                </li>
            )
        });
    }

    function handleCards(cards: CardDetails[]) {
        return cards.map(({cardName}, i) => {
            return (
                <li key={i}>
                    <span>{cardName}</span>
                </li>
            )
        })
    }

    function handleAddColumn(e: React.FormEvent) {
        e.preventDefault();

        if(projectDetails?._id && newColumnName) {
            postColumnInProject(userDetails._id, projectDetails._id, newColumnName)
            .then(res => {
                console.log(res)
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
                                    <form id="addColumnForm" onSubmit={e =>handleAddColumn(e)}>
                                        <input type="text" placeholder="Add column" onChange={e => setNewColumnName(e.target.value)}/>
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