import { React, useState, useEffect } from 'react';
import default_user_logo from '../Images/Default User Logo 2.jpg';
import '../CSS for Components/UserProfileDashboard.css';
import ChangeProfilePhoto from '../Components/ChangeProfilePhoto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function UserProfileDashboard() {
    let loggedin_user_data = JSON.parse(localStorage.getItem("touch__user_login_info"));

    const [login_user_profile_photo, set_login_user_profile_photo] = useState(default_user_logo);
    const [my_profile, set_my_profile] = useState(null); // true=my pfl, false=other pfl
    const page_url = window.location.href;
    let requested_username = "";

    for (let i = 30; i < page_url.length; i++) {
        requested_username += page_url[i];
    }

    useEffect(() => {
        get_profile_photo(requested_username);
        if (loggedin_user_data.user_name === requested_username) {
            set_my_profile(true);
        } else {
            set_my_profile(false);
        }
    }, []);


    //#region Get profile photo
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


    //#region Open/Close Profile photo change area
    const [photo_change_component_visible, set_photo_change_component_visible] = useState(false);
    function open_changeProfilePhotoComponent() {
        set_photo_change_component_visible(true);
        document.getElementById("profile_dashboard_container").style.filter = "blur(5px)";
        document.getElementById("settings_div").style.filter = "blur(5px)";
        document.getElementById("container_changeProfilePhotoComponent").style.height = "560px";
        document.getElementById("container_changeProfilePhotoComponent").style.width = "664px";
    }

    function close_changeProfilePhotoComponent() {
        setTimeout(function () {
            set_photo_change_component_visible(false);
        }, 300);
        document.getElementById("profile_dashboard_container").style.filter = "blur(0px)";
        document.getElementById("settings_div").style.filter = "blur(0px)";
        document.getElementById("container_changeProfilePhotoComponent").style.height = "0px";
        document.getElementById("container_changeProfilePhotoComponent").style.width = "0px";
    }
    //#endregion


    return (
        <>
            <div id='profile_dashboard_container'>
                <div className='profile_dashboard_image_container'>
                    <img src={login_user_profile_photo} alt="Thobra"></img>
                </div>
                <div className='profile_dashboard_info_container'>
                    <h1 className='profile_user_name'>@{loggedin_user_data.user_name}</h1>
                    <h1 className='profile_bio'>{loggedin_user_data.bio}</h1>
                    {my_profile && <button onClick={open_changeProfilePhotoComponent}>Update Photo</button>}
                </div>
            </div>

            {my_profile &&
                <div id='container_changeProfilePhotoComponent'>
                    {photo_change_component_visible && <div id='close_changeProfilePhotoComponent' onClick={close_changeProfilePhotoComponent}><FontAwesomeIcon icon={faTimes} /></div>}
                    {photo_change_component_visible && <ChangeProfilePhoto requested_username={loggedin_user_data.user_name} />}
                </div>
            }
        </>
    );
}

export default UserProfileDashboard;
