import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import getProjectByProjectId from "../../utils/axios/project";
import { useSelector } from "react-redux";
import { CardDetails, ColumnDetails, ProfileState, ProjectDetails } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import Footer from "../subcomponent/Footer.tsx/Footer";

export default function ProjectPage() {
    const {state: {projectId}} = useLocation();
    const userDetails = useSelector((state: ProfileState) => state.userDetails);
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
                        <ul className="flex pt-2">
                            {handleCards(cards)}
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