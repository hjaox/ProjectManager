import { useEffect } from "react";
import SettingsSideBar from "./component/SettingsSideBar";

export default function Header() {

    useEffect(() => {}, []);

    return (
        <div className="text-red-500 border-black border h-12 flex justify-between">
            ProjectManager
            <SettingsSideBar />
        </div>
    )
}