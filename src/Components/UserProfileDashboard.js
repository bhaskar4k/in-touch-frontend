import { React, useState, useEffect } from 'react';
import default_user_logo from '../Images/Default User Logo 2.jpg';
import '../CSS for Components/UserProfileDashboard.css';
import ChangeProfilePhoto from '../Components/ChangeProfilePhoto';

function UserProfileDashboard() {
    let user_data = JSON.parse(localStorage.getItem("touch__user_login_info"));

    const [login_user_profile_photo, set_login_user_profile_photo] = useState(default_user_logo);
    const [my_profile, set_my_profile] = useState(null); // true=my pfl, false=other pfl
    const page_url = window.location.href;
    let requested_username = "";

    for (let i = 30; i < page_url.length; i++) {
        requested_username += page_url[i];
    }

    useEffect(() => {
        get_profile_photo(user_data.user_name)
        if (user_data.user_name === requested_username) {
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

    return (
        <>
            <div className='profile_dashboard_container'>
                <div className='profile_dashboard_image_container'>
                    <img src={login_user_profile_photo} alt="Thobra"></img>
                </div>
                <div className='profile_dashboard_info_container'>
                    <h1 className='profile_user_name'>@{user_data.user_name}</h1>
                    <h1 className='profile_bio'>{user_data.bio}</h1>
                </div>
            </div>
            {my_profile && <ChangeProfilePhoto requested_username={requested_username} />}
        </>
    );
}

export default UserProfileDashboard;
