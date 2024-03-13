import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../../utils/axios/login";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUsernameInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(event.target.value);
    }

    function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        loginUser(username, password)
            .then(loginDetails => {
                dispatch(actions.login(loginDetails))
                navigate(`/Dashboard`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <form id="loginForm"
            onSubmit={event => handleSubmit(event)}>
            <label htmlFor="usernameInput">Name:</label>
            <input className="border border-black" name="usernameInput" id="usernameInput" type="text" onChange={event => handleUsernameInput(event)} />

            <label htmlFor="usernameInput">Email:</label>
            <input className="border border-black" name="passwordInput" id="passwordInput" type="text" onChange={event => handlePasswordInput(event)} />

            <button type="submit" form="loginForm">Login</button>
        </form>
    )
}