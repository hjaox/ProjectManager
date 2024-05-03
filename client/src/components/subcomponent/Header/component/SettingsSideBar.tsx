import { useSelector } from "react-redux"
import { TProfileState } from "../../../../common/types";
import { useState } from "react";
import "../../../../style/subcomponents/settingsSideBar.scss";

export default function SettingsSideBar() {
    const userDetails = useSelector((state: TProfileState) => state.userDetails);
    const [showSettings, setShowSettings] = useState(false);

    function handleName(name: string) {
        if (!name) return <>Guest</>;

        const splitName = name.split(" ");
        const formatName = splitName.length === 1
            ? `${splitName[0][0].toUpperCase()}`
            : `${splitName[0][0].toUpperCase()}${splitName[splitName.length - 1][0].toUpperCase()}`;

        return (
            <>{formatName}</>
        );
    }

    return (
        <section className="settings">
            <div className="settings-user">
                <span>{handleName(userDetails.name)}</span>
            </div>

            <div className="settings-icon" onClick={() => setShowSettings(() => !showSettings)}>
                {
                    showSettings
                        ? (
                            <div className="settings-open">
                                <div className="settings-open-line slash"></div>
                                <div className="settings-open-line backslash"></div>
                            </div>
                        )
                        : (
                            <div className="settings-closed">
                                <div className="settings-closed-line"></div>
                                <div className="settings-closed-line"></div>
                                <div className="settings-closed-line"></div>
                            </div>
                        )
                }

            </div>
            <div className={`settings-dropdown ${showSettings ? "dropdown-show" : "dropdown-hide"}`}>
                <div className="settings-dropdown-option">settings</div>
                <div className="settings-dropdown-option">settings</div>
                <div className="settings-dropdown-option">settings</div>
                <div className="settings-dropdown-option">settings</div>
                <div className="settings-dropdown-option">settings</div>
            </div>
        </section>
    )
}