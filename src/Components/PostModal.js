import React, { useState, useEffect } from "react";
import '../CSS for Components/PostModal.css';


function PostModal(props) {
    //#region Global declarations
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    let post_photo_container = "post_photo_container" + props.post_id;
    let post_photo = "post_photo" + props.post_id;
    //#endregion

    useEffect(() => {
        function auto_adjust_height_or_width() {
            var img = document.getElementById(post_photo);
            let width = img.naturalWidth, height = img.naturalHeight

            if (width > height) {
                document.getElementById(post_photo_container).style.width = "410px";
                document.getElementById(post_photo).style.width = "400px";
            } else {
                document.getElementById(post_photo_container).style.height = "410px";
                document.getElementById(post_photo).style.height = "400px";
            }

            document.getElementById(post_photo).style.display = "block";
        }

        if (props.post_photo !== null) auto_adjust_height_or_width();
    }, []);


    return (
        <>
            <div className="post_container">
                <div className="post_heading_info">
                    <div className="post_owner_photo"></div>
                    <div className="post_header">
                        <p className="post_owner_name">@{props.uploader_username}</p>
                        <p className="post_uploaded_time">{props.upload_time}</p>
                    </div>
                </div>

                <p className="post_description">{props.post_desc}</p>

                <div className="post_photo_container" id={post_photo_container}>
                    <img src={props.post_photo} id={post_photo} alt="" />
                </div>

                <div className="engagement">
                    <div className="like">
                        <p>like</p>
                    </div>
                    <div className="view_comment">
                        <button>Comments</button>
                    </div>
                </div>

                <div className="comment">
                    <input type="text" />
                    <button>Post</button>
                </div>
            </div>
        </>
    );
}

export default PostModal;
