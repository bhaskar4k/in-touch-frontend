import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS for Components/Header.css';
import Searchbar from '../Components/Searchbar.js';
import Settings from '../Components/Settings';
import default_user_logo from '../Images/Default User Logo 2.jpg';

function Header() {
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const login_user_profile_page_url = "http://localhost:3000/profile/" + user_login_info_from_cache.user_name;

    // #region Function to open/close settings modal----------
    const [setting_component_visible, set_setting_component_visible] = useState(false);
    function setting() {
        if (document.getElementById("settings_div").style.height === "0px") {
            set_setting_component_visible(true);
            document.getElementById("settings_div").style.height = "550px";
            document.getElementById("settings_div").style.width = "700px";
        } else {
            setTimeout(function () {
                set_setting_component_visible(false);
            }, 300);
            document.getElementById("settings_div").style.height = "0px";
            document.getElementById("settings_div").style.width = "0px";
        }
    }
    // #endregion --------------------------------------------

    // #region Function to logout/Clearing user_data from cache
    const navigate = useNavigate();
    function logout() {
        if (localStorage.getItem("touch__user_login_info") !== null) {
            localStorage.removeItem("touch__user_login_info");
        }
        navigate(`/home`);
    }
    // #endregion ---------------------------------------------------

    // #region Function to open/close the user activity modal
    function control_user_setting_activity_window() {
        if (document.getElementById("user_setting_activity").style.height === "0px") {
            document.getElementById("user_setting_activity").style.height = "180px";
            //document.getElementById("user_setting_activity").style.padding = "10px";
        } else {
            document.getElementById("user_setting_activity").style.height = "0px";
            //document.getElementById("user_setting_activity").style.padding = "0px";
        }
    }
    // #endregion ---------------------------------------------


    return (
        <>
            <div className='parent_of_header'>
                <div className='child_of_header'>
                    <div style={{ display: 'flex' }}>
                        <div className='app_name'>
                            <h1>In Touch</h1>
                        </div>

                        <Searchbar />
                    </div>

                    <div className='header_controls_parent'>
                        <div className='header_controls'>
                            <img src={default_user_logo} alt="default user logo" onClick={control_user_setting_activity_window} />
                        </div>
                        <div id="user_setting_activity">
                            <div className='user_activity_container'>
                                <a className='button1' href={login_user_profile_page_url} target='blank'>Profile</a>
                                <p className='button1' onClick={setting}>Settings</p>
                                <p className='button1' onClick={logout}>Logout</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div id="settings_div">
                {setting_component_visible && <Settings />}
            </div>
        </>
    );
}

export default Header;
