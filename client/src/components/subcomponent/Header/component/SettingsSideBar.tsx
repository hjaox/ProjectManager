import { useDispatch, useSelector } from "react-redux"
import { TProfileState } from "../../../../common/types";
import { useState } from "react";
import "../../../../style/subcomponents/settingsSideBar.scss";
import { actions } from "../../../../utils/redux/reducers";
import { useNavigate } from "react-router-dom";

export default function SettingsSideBar() {
    const userDetails = useSelector((state: TProfileState) => state.userDetails);
    const [showSettings, setShowSettings] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleName(name: string) {
        if (!name) return <>G</>;

        const splitName = name.split(" ");
        const formatName = splitName.length === 1
            ? `${splitName[0][0].toUpperCase()}`
            : `${splitName[0][0].toUpperCase()}${splitName[splitName.length - 1][0].toUpperCase()}`;

        return (
            <>{formatName}</>
        );
    }

    function handleLogout() {
        console.log("test")
        dispatch(actions.logout());
        navigate("/Home");
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
                <div className="settings-dropdown-option" onClick={() => handleLogout()}>Logout</div>
            </div>
        </section>
    )
}