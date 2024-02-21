import '../CSS for Components/Profile.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import UserProfileDashboard from '../Components/UserProfileDashboard';
import ChangeProfilePhoto from '../Components/ChangeProfilePhoto';

function Profile() {
    //#region Geting username from URL and cache then setting pfl info else logout if there's nothing in cache
    const navigate = useNavigate();
    const [my_profile, set_my_profile] = useState(null); // true=my pfl, false=other pfl
    const [loggedin_person_user_name, set_loggedin_person_user_name] = useState(null);
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const page_url = window.location.href;
    let requested_username = "";

    for (let i = 30; i < page_url.length; i++) {
        requested_username += page_url[i];
    }

    /* Checking if session is active. If it's active then get
    user_info from cache else route to signup/login page */
    useEffect(() => {
        if (user_login_info_from_cache !== null) {
            let screen_height = window.innerHeight;
            document.getElementById("whole_profile_container").style.height = "" + (screen_height - 70) + "px";
            document.getElementById("profile_container").style.height = "" + (screen_height - 70) + "px";
            set_loggedin_person_user_name(user_login_info_from_cache.user_name);
            document.title = 'Profile/@' + requested_username;

            if (user_login_info_from_cache.user_name === requested_username) {
                set_my_profile(true);
            } else {
                set_my_profile(false);
                update_previously_searched_cache(requested_username);
            }
        } else {
            navigate(`/home`);
        }
    }, []);
    //#endregion ------------------------------------------------------------------------------------------------

    //#region Update the searched user cache when a new profile has been opened
    function update_previously_searched_cache(username) {
        const localStorageData = localStorage.getItem('previously_searched_profiles');
        let updated_searched_cache = [];

        if (localStorageData !== null) {
            const retrievedArray = JSON.parse(localStorageData);
            localStorage.removeItem('previously_searched_profiles');

            const retrivedSet = new Set(retrievedArray);
            retrivedSet.add(username);

            updated_searched_cache = Array.from(retrivedSet);
        } else {
            updated_searched_cache.push(username);
        }

        updated_searched_cache.sort();
        localStorage.setItem("previously_searched_profiles", JSON.stringify(updated_searched_cache));
    }
    //#endregion


    return (
        <>
            <Header />
            <div id='whole_profile_container'>
                <div id='profile_container'>
                    <UserProfileDashboard />
                    {my_profile && <ChangeProfilePhoto requested_username={requested_username} />}
                </div>
            </div>
        </>
    );
}

export default Profile;
