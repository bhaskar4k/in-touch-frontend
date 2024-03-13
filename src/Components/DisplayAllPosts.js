import React, { useState, useEffect } from "react";
import '../CSS for Components/DisplayAllPosts.css';


function DisplayAllPosts() {
    //#region Global declarations
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    //#endregion

    useEffect(() => {
        async function get_all_posts() {
            try {
                const response = await fetch("http://localhost:4000/api/get_all_post/" + user_login_info_from_cache.user_name, { method: 'GET' });
                const posts = await response.json();
                console.log(posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        get_all_posts(); // Call the function here
    }, []);




    return (
        <>
            <h1>CHANDU RANDI BRO</h1>
        </>
    );
}

export default DisplayAllPosts;
