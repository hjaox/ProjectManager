import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"

export default function ProjectPage() {
    const {state: {project_id}} = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log(project_id, params)
    }, [])
    return <p>Project Card</p>
}