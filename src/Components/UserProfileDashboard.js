import { React, useState, useEffect } from 'react';
import '../CSS for Components/UserProfileDashboard.css';
import ChangeProfilePhoto from '../Components/ChangeProfilePhoto';
import ViewImage from '../Components/ViewImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function UserProfileDashboard(props) {
    //#region Global declarations
    let loggedin_user_data = JSON.parse(localStorage.getItem("touch__user_login_info"));

    const [my_profile, set_my_profile] = useState(null); // true=my pfl, false=other pfl
    const page_url = window.location.href;
    let requested_username = "";

    for (let i = 30; i < page_url.length; i++) {
        requested_username += page_url[i];
    }

    const [view_clicked_image, set_view_clicked_image] = useState(null);
    //#endregion


    //#region Setting_my_profile variable true/false to know if it's loggedin user's profile
    useEffect(() => {
        if (loggedin_user_data.user_name === requested_username) {
            set_my_profile(true);
        } else {
            set_my_profile(false);
        }
    }, []);
    //#endregion


    //#region Open/Close Profile photo change area
    const [photo_change_component_visible, set_photo_change_component_visible] = useState(false);
    function open_changeProfilePhotoComponent() {
        set_photo_change_component_visible(true);
        document.getElementById("profile_dashboard_container").style.filter = "blur(5px)";
        document.getElementById("rest_of_profile").style.filter = "blur(5px)";
        document.getElementById("container_changeProfilePhotoComponent").style.height = "560px";
        document.getElementById("container_changeProfilePhotoComponent").style.width = "664px";
    }

    function close_changeProfilePhotoComponent() {
        setTimeout(function () {
            set_photo_change_component_visible(false);
            document.getElementById("profile_dashboard_container").style.filter = "blur(0px)";
            document.getElementById("rest_of_profile").style.filter = "blur(0px)";
        }, 300);
        document.getElementById("container_changeProfilePhotoComponent").style.height = "0px";
        document.getElementById("container_changeProfilePhotoComponent").style.width = "0px";
    }
    //#endregion


    //#region Open/close View image controller
    function view_image(url) {
        set_view_clicked_image(<ViewImage url={url} />);
        document.getElementById("view_image").style.display = "block";
    }

    function close_view_image() {
        set_view_clicked_image(null);
        document.getElementById("view_image").style.display = "none";
    }
    //#endregion

    return (
        <>
            <div id='profile_dashboard_container'>
                <div className='profile_dashboard_image_container'>
                    <img src={props.profile_photo} alt="Thobra" onClick={() => view_image(props.profile_photo)}></img>
                </div>
                <div className='profile_dashboard_info_container'>
                    <h1 className='profile_user_name'>@{props.user_name}</h1>
                    <h1 className='profile_bio'>{props.bio}</h1>
                    {my_profile && <button onClick={open_changeProfilePhotoComponent}>Update Photo</button>}
                </div>
            </div>

            {my_profile &&
                <div id='container_changeProfilePhotoComponent'>
                    {photo_change_component_visible && <div id='close_changeProfilePhotoComponent' onClick={close_changeProfilePhotoComponent}><FontAwesomeIcon icon={faTimes} /></div>}
                    {photo_change_component_visible && <ChangeProfilePhoto requested_username={loggedin_user_data.user_name} />}
                </div>
            }


            <div id='view_image'>
                <div className="view_image_close_btn"><FontAwesomeIcon icon={faTimes} onClick={close_view_image} /></div>
                {view_clicked_image}
            </div>
        </>
    );
}

export default UserProfileDashboard;
