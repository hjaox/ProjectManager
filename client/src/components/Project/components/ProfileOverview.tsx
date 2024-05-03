import { useState } from "react";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import "../../../style/Project/projectOverview.scss";

export default function ProfileOverview() {
    const [expandOverview, setExpandOverview] = useState(true);


    return (
        <>
            <div className={`profile-overview ${expandOverview ? "overview-show" : "overview-hide"}`}>
                <h2>User Workspace</h2>
                <div className="overview-expanded-expand-toggle" onClick={() => setExpandOverview(false)}>
                    <TfiArrowCircleLeft className="expand-icon-left" />
                </div>

            </div>

            <div className={`overview-minimized ${expandOverview ? "minimized-hide" : "minimized-show"}`}>
                <div className="overview-minimized-expand-toggle" onClick={() => setExpandOverview(true)}>
                    <TfiArrowCircleRight className="minimized-icon-right" />
                </div>
            </div>


            <section className="project-board">
                {`${expandOverview}`}
            </section>
        </>
    )
}