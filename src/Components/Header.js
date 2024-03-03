import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS for Components/Header.css';
import Searchbar from '../Components/Searchbar.js';
import Settings from '../Components/Settings';
import CreatePost from '../Components/CreatePost';
import default_user_logo from '../Images/Default User Logo 2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faTimes } from '@fortawesome/free-solid-svg-icons'

function Header() {
    //#region Global declarations
    const navigate = useNavigate();
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const [login_user_profile_page_url, set_login_user_profile_page_url] = useState("");
    const [login_user_profile_photo, set_login_user_profile_photo] = useState(default_user_logo);
    const [setting_component_visible, set_setting_component_visible] = useState(false);
    const [create_post_component_visible, set_create_post_component_visible] = useState(false);
    //#endregion


    //#region Getting profile photo of loggedin user and setting loggedin user's profile page url 
    useEffect(() => {
        if (user_login_info_from_cache !== null) {
            get_profile_photo(user_login_info_from_cache.user_name);
            set_login_user_profile_page_url("http://localhost:3000/profile/" + user_login_info_from_cache.user_name);
        } else {
            navigate(`/home`);
        }
    }, []);
    //#endregion


    // #region Function to open/close settings modal----------
    function setting() {
        if (document.getElementById("settings_div").style.height === "0px") {
            // If create post div is opened then close it
            if (document.getElementById("create_post_div").style.height === "400px") {
                setTimeout(function () {
                    set_create_post_component_visible(false);
                }, 300);
                document.getElementById("create_post_div").style.height = "0px";
                document.getElementById("create_post_div").style.width = "0px";
                document.getElementById("create_post_div").style.border = "none";
            }

            // If change profile photo div is opened then close
            if (document.getElementById("container_changeProfilePhotoComponent") !== null && document.getElementById("container_changeProfilePhotoComponent").style.height === "560px") {
                document.getElementById("container_changeProfilePhotoComponent").style.height = "0px";
                document.getElementById("container_changeProfilePhotoComponent").style.width = "0px";
                document.getElementById("profile_dashboard_container").style.filter = "blur(0px)";
            }

            if (document.getElementById("profile_container") !== null) {
                document.getElementById("profile_container").style.filter = "blur(5px)";
            }

            if (document.getElementById("actual_feed_container") !== null) {
                document.getElementById("actual_feed_container").style.filter = "blur(5px)";
            }

            set_setting_component_visible(true);
            document.getElementById("settings_div").style.height = "600px";
            document.getElementById("settings_div").style.width = "700px";
            document.getElementById("settings_div").style.border = "2px solid rgb(0, 140, 255)";
        } else {
            setTimeout(function () {
                set_setting_component_visible(false);
                if (document.getElementById("profile_container") !== null) {
                    document.getElementById("profile_container").style.filter = "blur(0px)";
                }
                if (document.getElementById("actual_feed_container") !== null) {
                    document.getElementById("actual_feed_container").style.filter = "blur(0px)";
                }
            }, 300);
            document.getElementById("settings_div").style.height = "0px";
            document.getElementById("settings_div").style.width = "0px";
            document.getElementById("settings_div").style.border = "none";
        }
    }
    // #endregion --------------------------------------------


    // #region Function to logout/Clearing user_data from cache
    function logout() {
        if (localStorage.getItem("touch__user_login_info") !== null) {
            localStorage.removeItem("touch__user_login_info");
            localStorage.removeItem("previously_searched_profiles");
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


    //#region Get profile photo from database
    async function get_profile_photo(user_name) {
        let dataa = {
            user_name: user_name,
            profile_photo: "NULL"
        };
        try {
            let response = await fetch('http://localhost:8080/get_profile_photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user_name
            })

            dataa = await response.json();
            if (dataa.profile_photo !== "NULL") set_login_user_profile_photo("data:image/jpeg;base64," + dataa.profile_photo)
        } catch {
            console.log("Internal server error");
        }
    }
    //#endregion


    //#region Navigate to feed on clicking the name of website
    function get_back_to_feed() {
        navigate("/feed");
    }
    //#endregion


    //#region Open/close create post component
    function open_create_post() {
        if (document.getElementById("create_post_div").style.height === "0px") {
            // Closing setting div if it is open
            if (document.getElementById("settings_div").style.height === "600px") {
                setTimeout(function () {
                    set_setting_component_visible(false);
                }, 300);
                document.getElementById("settings_div").style.height = "0px";
                document.getElementById("settings_div").style.width = "0px";
                document.getElementById("settings_div").style.border = "none";
            }

            // If change profile photo div is opened then close
            if (document.getElementById("container_changeProfilePhotoComponent") !== null && document.getElementById("container_changeProfilePhotoComponent").style.height === "560px") {
                document.getElementById("container_changeProfilePhotoComponent").style.height = "0px";
                document.getElementById("container_changeProfilePhotoComponent").style.width = "0px";
                document.getElementById("profile_dashboard_container").style.filter = "blur(0px)";
            }

            set_create_post_component_visible(true);

            document.getElementById("create_post_div").style.height = "400px";
            document.getElementById("create_post_div").style.width = "700px";
            document.getElementById("create_post_div").style.border = "3px solid rgb(0, 140, 255)";
            if (document.getElementById("profile_container") !== null) {
                document.getElementById("profile_container").style.filter = "blur(5px)";
            }
            if (document.getElementById("actual_feed_container") !== null) {
                document.getElementById("actual_feed_container").style.filter = "blur(5px)";
            }
        } else {
            setTimeout(function () {
                set_create_post_component_visible(false);
                if (document.getElementById("profile_container") !== null) {
                    document.getElementById("profile_container").style.filter = "blur(0px)";
                }
                if (document.getElementById("actual_feed_container") !== null) {
                    document.getElementById("actual_feed_container").style.filter = "blur(0px)";
                }
            }, 300);
            document.getElementById("create_post_div").style.height = "0px";
            document.getElementById("create_post_div").style.width = "0px";
            document.getElementById("create_post_div").style.border = "none";
        }
    }

    function close_create_post() {
        setTimeout(function () {
            set_create_post_component_visible(false);
            if (document.getElementById("profile_container") !== null) {
                document.getElementById("profile_container").style.filter = "blur(0px)";
            }
            if (document.getElementById("actual_feed_container") !== null) {
                document.getElementById("actual_feed_container").style.filter = "blur(0px)";
            }
        }, 300);
        document.getElementById("create_post_div").style.height = "0px";
        document.getElementById("create_post_div").style.width = "0px";
        document.getElementById("create_post_div").style.border = "none";
    }
    //#endregion


    return (
        <>
            <div className='parent_of_header' id='parent_of_header'>
                <div className='child_of_header'>
                    <div style={{ display: 'flex' }}>
                        <div className='app_name'>
                            <h1 onClick={get_back_to_feed}>In Touch</h1>
                        </div>

                        <Searchbar />
                    </div>

                    <div className='header_controls_parent'>
                        <div className='create_post_button' onClick={open_create_post}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                        </div>
                        <div className='header_controls'>
                            <img src={login_user_profile_photo} alt="default user logo" onClick={control_user_setting_activity_window} />
                        </div>
                        <div id="user_setting_activity">
                            <div className='user_activity_container'>
                                <a className='button1' href={login_user_profile_page_url}>Profile</a>
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

            <div id="create_post_div">
                {create_post_component_visible &&
                    <div>
                        <div id="settings_close_btn">
                            <FontAwesomeIcon icon={faTimes} onClick={close_create_post} />
                        </div>
                        <CreatePost />
                    </div>
                }
            </div>
        </>
    );
}

export default Header;
