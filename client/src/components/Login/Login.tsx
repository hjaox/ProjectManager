import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../../utils/axios/login";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import "../../style/Login/login.scss";

export default function Login() {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);

    function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(event.target.value);
    }

    function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const loginDetails = await loginUser(email, password);
            dispatch(actions.login(loginDetails));
            navigate("/Dashboard");
        } catch {
            setLoginError(true)
        }
    }

    return (
        <section className="login-page">
            <div className="login-display">
                <div className="login-title">
                    <div onClick={() => navigate("/Home")} className="title-projectname">Project Manager</div>
                    <div className="title-login">Login</div>
                    <div className={`title-error ${loginError ? "show-error" : "hide-error"}`}>Incorrect email or password</div>
                </div>

                <form id="login-form" onSubmit={event => handleSubmit(event)}>
                    <div className="form-input">
                        <label htmlFor="input-email" className={`${loginError ? "error-label" : ""}`}>Email:</label>
                        <input className="border border-black" name="input-email" id="input-email" type="text" onChange={event => handleEmailInput(event)} />
                    </div>

                    <div className="form-input">
                        <label htmlFor="input-password" className={`${loginError ? "error-label" : ""}`}>Password:</label>
                        <input className="border border-black" name="input-password" id="input-password" type="text" onChange={event => handlePasswordInput(event)} />
                    </div>

                    <button type="submit" form="login-form">Login</button>
                </form>
            </div>
        </section>
    )
}