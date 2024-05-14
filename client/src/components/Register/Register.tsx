import { useState } from "react";
import "../../style/Register/register.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import registerUser from "../../utils/axios/regsiter";

export default function Register() {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState(false);

    function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(event.target.value);
    }

    function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(event.target.value);
    }

    function handleNameInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const userDetails = await registerUser(name, email, password);
            dispatch(actions.login(userDetails));
            navigate("/Dashboard");
        } catch {
            setRegisterError(true)
        }
    }

    return (
        <section className="register-page">
            <div className="register-display">
                <div className="register-title">
                    <div onClick={() => navigate("/Home")} className="title-projectname">Project Manager</div>
                    <div className="title-register">register</div>
                    <div className={`title-error ${registerError ? "show-error" : "hide-error"}`}>Incorrect email or password</div>
                </div>

                <form id="register-form" onSubmit={event => handleSubmit(event)}>
                    <div className="form-input">
                        <label htmlFor="input-name" className={`${registerError ? "error-label" : ""}`}>name:</label>
                        <input className="border border-black" name="input-name" id="input-name" type="text" onChange={event => handleNameInput(event)} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="input-email" className={`${registerError ? "error-label" : ""}`}>Email:</label>
                        <input className="border border-black" name="input-email" id="input-email" type="text" onChange={event => handleEmailInput(event)} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="input-password" className={`${registerError ? "error-label" : ""}`}>Password:</label>
                        <input className="border border-black" name="input-password" id="input-password" type="text" onChange={event => handlePasswordInput(event)} />
                    </div>

                    <button type="submit" form="register-form">register</button>
                </form>
            </div>
        </section>
    )
}