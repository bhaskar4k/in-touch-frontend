import React, { useState, useEffect } from "react";
import '../CSS for Components/PostModal.css';
import default_user_logo from '../Images/Default User Logo 2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentBox from '../Components/CommentBox';
import { faHeart, faCommentDots, faUpload } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

function PostModal(props) {
    //#region Global declarations
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    let post_photo_container = "post_photo_container" + props.post_id;
    let post_photo = "post_photo" + props.post_id;
    let profile_photo = props.profile_photo;
    const [color, set_color] = useState("white");
    const [view_comment, set_view_comment] = useState(false);
    let comment_input_field_id = "comment_input_field_id" + props.post_id;
    //#endregion


    //#region Useeffect
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

        is_this_post_liked_by_loggedin_user();

        async function is_this_post_liked_by_loggedin_user() {
            try {
                const response = await fetch("http://localhost:4000/api/is_liked/" + props.post_id + "/" + user_login_info_from_cache.user_name, { method: 'GET' });
                const res = await response.json();

                if (response.status === 200) {
                    if (res.message === "true") {
                        set_color("rgb(0, 145, 255)")
                    } else {
                        set_color("white")
                    }
                }
            } catch {
                console.log("error")
            }
        }
    }, []);
    //#endregion


    //#region Like control
    async function like_control() {
        const info = {
            post_id: props.post_id,
            username: user_login_info_from_cache.user_name
        }
        try {
            let response = await fetch("http://localhost:4000/api/like_control", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })

            if (response.status === 200) {
                if (color === "white") {
                    set_color("rgb(0, 145, 255)")
                } else {
                    set_color("white")
                }
            }
        } catch {
            console.log("error")
        }
    }
    //#endregion


    //#region Do comment
    async function do_comment() {
        let comment_text = document.getElementById(comment_input_field_id).value;
        var currentdate = new Date();
        var date = currentdate.getDate() + "." + (currentdate.getMonth() + 1) + "." + currentdate.getFullYear();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        let comment = {
            "comment_id": "comment," + props.post_id + "," + user_login_info_from_cache.user_name + "," + date + "," + time,
            "post_id": props.post_id,
            "username": user_login_info_from_cache.user_name,
            "comment_description": comment_text,
            "upload_date": date,
            "upload_time": time
        }

        try {
            let response = await fetch("http://localhost:4000/api/do_comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })

            if (response.status === 200) {
                document.getElementById(comment_input_field_id).value = "";
                let cmnt = await response.json();
                socket.emit('send_message', cmnt);
            }
        } catch {
            console.log("error")
        }
    }
    //#endregion


    //#region Display comment box
    function show_comment_box() {
        if (view_comment === false) {
            set_view_comment(true);
        } else {
            set_view_comment(false);
        }
    }
    //#endregion


    return (
        <>
            <div className="post_container">
                <div className="post_heading_info">
                    <div className="post_owner_photo">
                        <img src={profile_photo} alt="" />
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
                        <div className="like" onClick={like_control}>
                            <FontAwesomeIcon icon={faHeart} style={{ color: color }} />
                        </div>
                        <div className="view_comment">
                            <FontAwesomeIcon icon={faCommentDots} onClick={show_comment_box} />
                        </div>
                    </div>
                    <div className="comment">
                        <input type="text" id={comment_input_field_id} />
                        <div className="do_comment">
                            <FontAwesomeIcon icon={faUpload} onClick={do_comment} />
                        </div>
                    </div>
                </div>

                {view_comment && <CommentBox post_id={props.post_id} loggedin_user_profile_photo={profile_photo} />}
            </div>
        </>
    );
}

export default PostModal;
