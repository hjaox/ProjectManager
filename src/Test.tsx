import { getProjectsByUserID } from "./lib/axios/projects";

export default function Test() {

    function handleClick(): any {

        return getProjectsByUserID("1")
        .then(data => {
            console.log(data)
        })
    }

    return (
        <button onClick={handleClick}>test</button>
    )
}