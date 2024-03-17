import React, { useState, useEffect } from "react";
import PostModal from '../Components/PostModal'
import LoadingPopup from '../Components/LoadingPopup';
import '../CSS for Components/DisplayAllPosts.css';


function DisplayAllPosts(props) {
    //#region Global declarations
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const [render_all_posts, set_render_all_posts] = useState(null);
    const [render_loading_popup, set_render_loading_popup] = useState(null);
    let all_posts = [];
    //#endregion

    useEffect(() => {
        async function get_all_posts() {
            try {
                set_render_loading_popup(<LoadingPopup />);
                document.getElementById("root").style.opacity = "0.5";
                const response = await fetch("http://localhost:4000/api/get_all_post/" + props.user_name + "/0", { method: 'GET' });
                const posts = await response.json();

                for (let i = 0; i < posts.length; i++) {
                    all_posts.push(<PostModal
                        post_id={posts[i].post_id}
                        uploader_username={posts[i].username}
                        upload_time={posts[i].upload_date + " " + posts[i].upload_time}
                        post_desc={posts[i].post_description}
                        post_photo={posts[i].post_image}
                        owner_profile_photo={props.owner_profile_photo} />)
                }

                // console.log(posts)

                set_render_all_posts(all_posts)

                setTimeout(() => {
                    document.getElementById("root").style.opacity = "1";
                    set_render_loading_popup(null);
                }, 500);

            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        get_all_posts();
    }, []);


    return (
        <>
            <div id="all_posts">
                {render_loading_popup}
                {render_all_posts}
            </div>
        </>
    );
}

export default DisplayAllPosts;
