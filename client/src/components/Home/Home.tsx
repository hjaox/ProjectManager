import { useNavigate } from "react-router-dom";
import Footer from "../subcomponent/Footer.tsx/Footer";

export default function Home() {
    const navigate = useNavigate();

    return (
        <section className="home-page">
            <header>
                <div>ProjectManager</div>
                <div>
                    <div>
                        <button onClick={() => navigate("/Login")}>Login</button>
                        <button onClick={() => navigate("/Register")}>Regsiter</button>
                        <button>Guest</button>
                    </div>
                </div>
            </header>

            <div>
                message
            </div>
            <Footer />
        </section>
    )
}