import React, { useState, useEffect } from "react";
import '../CSS for Components/PostModal.css';
import default_user_logo from '../Images/Default User Logo 2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCommentDots, faUpload } from '@fortawesome/free-solid-svg-icons'


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
                document.getElementById(post_photo_container).style.width = "610px";
                document.getElementById(post_photo).style.width = "600px";
                document.getElementById(post_photo).style.border = "4px solid rgb(0, 145, 255)";
            } else {
                document.getElementById(post_photo_container).style.height = "410px";
                document.getElementById(post_photo_container).style.width = "610px";
                document.getElementById(post_photo_container).style.borderRadius = "10px";
                document.getElementById(post_photo_container).style.border = "4px solid rgb(0, 145, 255)";
                document.getElementById(post_photo_container).style.backgroundImage = "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)";
                document.getElementById(post_photo).style.height = "400px";
                document.getElementById(post_photo).style.margin = "0 auto";
            }

            document.getElementById(post_photo).style.display = "block";
        }

        if (props.post_photo !== null) auto_adjust_height_or_width();
    }, []);


    return (
        <>
            <div className="post_container">
                <div className="post_heading_info">
                    <div className="post_owner_photo">
                        <img src={props.owner_profile_photo} alt="" />
                    </div>
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
                    <div className="like_comment_box_div">
                        <div className="like">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <div className="view_comment">
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                    </div>
                    <div className="comment">
                        <input type="text" />
                        <div className="do_comment">
                            <FontAwesomeIcon icon={faUpload} />
                        </div>
                    </div>
                </div>

                {/* <div className="comment">
                    <input type="text" />
                    <button>Post</button>
                </div> */}
            </div>
        </>
    );
}

export default PostModal;
