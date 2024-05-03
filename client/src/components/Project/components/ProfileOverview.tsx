import { useState } from "react";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import "../../../style/Project/projectOverview.scss";
import { TProfileOverview } from "../../../common/types";

export default function ProfileOverview({ projects, project }: TProfileOverview) {
    const [expandOverview, setExpandOverview] = useState(true);

    function displayProjects() {
        return projects.map(({ projectName }, i) => {
            return (
                <li key={i} className="profile-overview-projects-list-item">
                    {projectName}
                </li>
            )
        })
    }

    return (
        <>
            <section className={`profile-overview ${expandOverview ? "overview-show" : "overview-hide"}`}>
                <h2>User Workspace</h2>
                <div className="profile-overview-projects">
                    <h3>Projects</h3>
                    {
                        projects.length && (
                            <ul className="profile-overview-projects-list">
                                {
                                    displayProjects()
                                }
                            </ul>
                        )
                    }


                </div>

                <div className="overview-expanded-expand-toggle" onClick={() => setExpandOverview(false)}>
                    <TfiArrowCircleLeft className="expand-icon-left" />
                </div>

            </section>

            <div className={`overview-minimized ${expandOverview ? "minimized-hide" : "minimized-show"}`}>
                <div className="overview-minimized-expand-toggle" onClick={() => setExpandOverview(true)}>
                    <TfiArrowCircleRight className="minimized-icon-right" />
                </div>
            </div>
        </>
    )
}