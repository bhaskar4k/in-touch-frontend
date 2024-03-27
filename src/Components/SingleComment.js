import React, { useState, useEffect } from "react";
import '../CSS for Components/SingleComment.css';
import default_user_logo from '../Images/Default User Logo 2.jpg';

function SingleComment(props) {
    //#region Global declarations
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    //#endregion

    return (
        <>
            <div className="a_single_comment">
                <div className="cmnt_header">
                    <div className="cmnt_creator_dp">
                        <img src={props.loggedin_user_profile_photo} alt="" />
                    </div>
                    <div className="cmnt_info">
                        <p className="cmnt_creator_name">@{(props.username === user_login_info_from_cache.user_name) ? "You" : props.username}</p>
                        <p className="cmnt_creating_time">{props.upload_time}</p>
                    </div>
                </div>

                <p className="cmnt_desc">{props.comment_desc}</p>
            </div>
        </>
    );
}

export default SingleComment;
