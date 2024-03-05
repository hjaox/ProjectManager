import { useSelector } from "react-redux"
import { ProfileState } from "../../../../common/types";
import { useEffect } from "react";

export default function SettingsSideBar() {
    const userDetails = useSelector((state: ProfileState) => state.userDetails);

    useEffect(() => {
        const settingsIcon = document.getElementById("settings-icon");
        const settingsOptions = document.getElementById("settings-options");

        settingsIcon?.addEventListener("click", () => {
            settingsOptions?.classList.toggle("hidden");
        })

    }, []);

    function handleName(name: string) {
        if(!name) return <>Guest</>;

        const splitName = name.split(" ");
        const formatName = splitName.length === 1
        ? `${splitName[0][0].toUpperCase()}`
        : `${splitName[0][0].toUpperCase()}${splitName[splitName.length - 1][0].toUpperCase()}`;

        return (
        <>{formatName}</>
        );
    }

    return (
        <div id="settings-icon" className="w-36 relative flex items-center justify-end">
            <div className="border-solid border-black rounded-full w-10 h-10 bg-slate-500 mr-1 justify-self-end flex place-items-center place-content-center">
                <span className="">{handleName(userDetails.name)}</span>
            </div>

            <div id="settings-options" className="flex flex-col absolute right-0 top-12">
                <span>settings</span>
                <span>settings</span>
            </div>
        </div>
    )
}