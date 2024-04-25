import { Link } from "react-router-dom";

export default function Homepage() {
    
    return (
        <>
        <div>
            <Link to={`/Login`}>
                <p>Login</p>
            </Link>
        </div>

        <div>
            <Link to={`/Guest`}>
                <p>Guest</p>
            </Link>
        </div>

        <div>
            <Link to={`/Register`}>
                <p>Register</p>
            </Link>
        </div>
        </>
    )
}