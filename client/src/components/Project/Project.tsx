import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProjectByProjectId, postColumnInProject, postCardInColumn } from "../../utils/axios/project";
import { useSelector } from "react-redux";
import { CardDetails, ColumnDetails, TProfileState, TProject } from "../../common/types";
import Header from "../subcomponent/Header/Header";
import "../../style/Project/project.scss";
import { Rings } from "react-loader-spinner";
import ProfileOverview from "./components/ProfileOverview";
import { getProjectsByUserID } from "../../utils/axios/projects";

export default function Project() {
    const { projectId } = useParams();
    const userDetails = useSelector((state: TProfileState) => state.userDetails);
    const [newColumnName, setNewColumnName] = useState<string>("");
    const [newCardName, setNewCardName] = useState<string>("");
    const [project, setProject] = useState<null | TProject>(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [projects, setProjects] = useState<TProject[]>([]);

    useEffect(() => {
        if (projectId) {
            setPageLoading(true);
            (async () => {
                try {
                    const projectDetails = await getProjectByProjectId(userDetails._id, projectId);
                    const userProjectlist = await getProjectsByUserID(userDetails._id);
                    setProjects(() => ([ ...userProjectlist ]));
                    setProject(() => ({ ...projectDetails }));
                } catch {

                }
            })();

            setPageLoading(false);
        }
    }, [])

    function handleColumns(columns: ColumnDetails[]) {
        return columns.map(({ columnName, cards, _id }, i) => {
            return (
                <li key={i} className="p-2 border rounded-lg h-fit max-w-64 break-words">
                    <span>
                        {columnName}
                    </span>

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
                    }

                </li>
            )
        });
    }

    function handleCards(cards: CardDetails[]) {
        return cards.map(({ cardName }, i) => {
            return (
                <li key={i} className="border rounded-lg p-1">
                    <span>{cardName}</span>
                </li>
            )
        })
    }

    function handleAddColumn(e: React.FormEvent) {
        e.preventDefault();
        if (project?._id && newColumnName) {
            postColumnInProject(userDetails._id, project._id, newColumnName)
                .then(updatedProject => {
                    setNewColumnName(() => "");
                    setProject(() => ({ ...updatedProject }));

                })
        }
    }

    function handleAddCard(e: React.FormEvent, columnId: string) {
        e.preventDefault();
        if (project?._id && newCardName) {
            postCardInColumn(userDetails._id, project._id, columnId, newCardName)
                .then(updatedProject => {
                    setNewCardName(() => "");
                    setProject(() => ({ ...updatedProject }));

                })
        }
    }
    console.log(projects)
    return (
        <section className="project-page">
            <Header />

            <section className="project-display">
                {
                    pageLoading
                        ? (
                            <Rings />
                        )
                        : (
                            <>
                                <ProfileOverview
                                projects={projects}
                                project={project}
                                />
                                <section className="project-board">
                                </section>
                            </>

                        )
                }
                {/* {
                    !project
                        ? (<>isLoading</>)
                        : (
                            <>
                                <div className="bg-gray-400 h-10">
                                    <h2>{project.projectName}</h2>
                                </div>
                                <div>
                                    {
                                        !project.columns.length
                                            ? (<>isEmpty</>)
                                            : (
                                                <ul className="flex gap-6 p-1">
                                                    {handleColumns(project.columns)}
                                                    <li className="p-2 border rounded-lg h-fit">
                                                        <form id="addColumnForm" onSubmit={e => handleAddColumn(e)} className="flex justify-between">
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
                } */}
            </section>
        </section>
    )
}