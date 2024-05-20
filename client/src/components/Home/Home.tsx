import { useNavigate } from "react-router-dom";
import Footer from "../subcomponent/Footer.tsx/Footer";
import "../../style/Home/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../utils/redux/reducers";
import { TProfileState } from "../../common/types";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: TProfileState) => state.isLoggedIn);
    const [logoutRedirect, setLogoutRedirect] = useState(false);
    const [logoutPrompt, setLogoutPrompt] = useState(false);

    function handleGuest() {
        dispatch(actions.loginAsGuest());
        navigate("/Dashboard")
    }

    function handleLogout() {
        dispatch(actions.logout());
        setLogoutRedirect(true);
    }

    return (
        <section className="home-layout">
            <header className="home-header">
                <div className="home-header-title" onClick={() => navigate("/Home")}>ProjectManager</div>
                <div className="home-header-navigation">
                    {
                        isLoggedIn
                            ? (
                                <>
                                    <button className="home-header-navigation-option" onClick={() => handleLogout()}>Logout</button>
                                </>
                            )
                            : (
                                <>
                                    <button className="home-header-navigation-option" onClick={() => navigate("/Login")}>Login</button>
                                    <button className="home-header-navigation-option" onClick={() => navigate("/Register")}>Regsiter</button>
                                    <button className="home-header-navigation-option" onClick={() => handleGuest()}>Try it out as Guest</button>
                                </>
                            )
                    }

                </div>
            </header>

            <section className="home-display">
                message
            </section>
            {
                logoutRedirect && (
                    <div className="logout-redirect-container" onClick={() => setLogoutRedirect(false)}>
                        <div className="logout-redirect">
                            <div>You have successfully logged out.</div>
                            <div className="redirect-options">
                                <button>Home</button>
                                <button onClick={() => navigate("/Login")}>Login</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                    logoutPrompt && (
                        <div>

                        </div>
                    )
            }
            <Footer />
        </section>
    )
}