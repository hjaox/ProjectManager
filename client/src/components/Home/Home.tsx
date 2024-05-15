import { useNavigate } from "react-router-dom";
import Footer from "../subcomponent/Footer.tsx/Footer";
import "../../style/Home/home.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../utils/redux/reducers";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleGuest() {
        dispatch(actions.loginAsGuest());
        navigate("/Dashboard")
    }

    return (
        <section className="home-layout">
            <header className="home-header">
                <div className="home-header-title" onClick={() => navigate("/Home")}>ProjectManager</div>
                <div className="home-header-navigation">
                    <button className="home-header-navigation-option" onClick={() => navigate("/Login")}>Login</button>
                    <button className="home-header-navigation-option" onClick={() => navigate("/Register")}>Regsiter</button>
                    <button className="home-header-navigation-option" onClick={() => handleGuest()}>Try it out as Guest</button>
                </div>
            </header>

            <section className="home-display">
                message
            </section>
            <Footer />
        </section>
    )
}