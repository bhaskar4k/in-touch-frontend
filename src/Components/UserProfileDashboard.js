import { React, useState, useEffect } from 'react';
import default_user_logo from '../Images/Default User Logo 2.jpg';
import '../CSS for Components/UserProfileDashboard.css';

function UserProfileDashboard() {
    let user_data = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const [login_user_profile_photo, set_login_user_profile_photo] = useState(default_user_logo);

    useEffect(() => {
        get_profile_photo(user_data.user_name)
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
            <div>
                <div className='profile_dashboard_image_container'>
                    <img src={login_user_profile_photo} alt="Thobra"></img>
                </div>
                <h1>@{user_data.user_name}</h1>

            </div>
        </>
    );
}

export default UserProfileDashboard;
