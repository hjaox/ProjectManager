import SettingsSideBar from "./component/SettingsSideBar";
import "../../../style/subcomponents/header.scss"
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <section className="header">
            <div className="header-title" onClick={() => navigate("/Home")}>
                ProjectManager
            </div>

            <SettingsSideBar />
        </section>
    )
}