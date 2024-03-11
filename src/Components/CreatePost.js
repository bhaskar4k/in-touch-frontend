import { useState } from 'react';
import Popup from './Popup';

import '../CSS for Components/CreatePost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons'

function CreatePost() {
    //#region Global declarations
    const [uploaded_image_url, set_uploaded_image_url] = useState(null);
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const [has_image, set_has_image] = useState(false);
    const [value, setValue] = useState('');
    const [rows, setRows] = useState(6);
    const [showPopup, setShowPopup] = useState(false);
    const [popup_message, set_popup_message] = useState("");
    const [popup_type, set_popup_type] = useState("");
    //#endregion


    //#region Display uploaded image
    const render_uploaded_image = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                set_uploaded_image_url(e.target.result);
            };
            reader.readAsDataURL(file);

            if (has_image === false) {
                let parent_div = document.getElementById("create_post_div").style.height;
                let parent_div_height = parseInt(parent_div.substring(0, parent_div.length - 2));
                document.getElementById("create_post_div").style.height = "" + (parent_div_height + 200) + "px";

                let child_div = document.getElementById("create_post_container").style.height;
                let child_div_height = parseInt(child_div.substring(0, child_div.length - 2));
                document.getElementById("create_post_container").style.height = "" + (child_div_height + 200) + "px";

                set_has_image(true);
            }
        }
    }
    //#endregion


    //#region Unselect image
    function unselect_image() {
        set_uploaded_image_url(null);
        let parent_div = document.getElementById("create_post_div").style.height;
        let parent_div_height = parseInt(parent_div.substring(0, parent_div.length - 2));
        document.getElementById("create_post_div").style.height = "" + (parent_div_height - 200) + "px";

        let child_div = document.getElementById("create_post_container").style.height;
        let child_div_height = parseInt(child_div.substring(0, child_div.length - 2));
        document.getElementById("create_post_container").style.height = "" + (child_div_height - 200) + "px";

        set_has_image(false);
    }
    //#endregion


    //#region handling height of this div
    const handleChange = (event) => {
        let str = event.target.value;
        let count = str.length;
        let newRows = parseInt(count / 38) + 1;

        if (parseInt(count / 38) < 6) newRows = 6;

        let parent_div = document.getElementById("create_post_div").style.height;
        let parent_div_height = parseInt(parent_div.substring(0, parent_div.length - 2));
        let child_div = document.getElementById("create_post_container").style.height;
        let child_div_height = parseInt(child_div.substring(0, child_div.length - 2));

        if (newRows > rows) {
            document.getElementById("create_post_div").style.height = "" + (parent_div_height + 35) + "px";
            document.getElementById("create_post_container").style.height = "" + (child_div_height + 35) + "px";
        } else if (newRows < rows) {
            document.getElementById("create_post_div").style.height = "" + (parent_div_height - 35) + "px";
            document.getElementById("create_post_container").style.height = "" + (child_div_height - 35) + "px";
        }

        setRows(newRows);
        setValue(str);
    };
    //#endregion


    async function make_post() {
        let post_text = document.getElementById("post_text").value;
        const file = document.getElementById('uploaded_image_for_post');

        if ((post_text === "" || post_text === null) && (file === null || file === undefined)) {
            openPopup("Post is empty", "2");
            return;
        }

        let blob = null;

        if (file !== null) {
            const imageUrl = file.src;
            let response = await fetch(imageUrl);
            blob = await response.blob();
        }

        var currentdate = new Date();
        var date = currentdate.getDate() + "." + (currentdate.getMonth() + 1) + "." + currentdate.getFullYear();
        var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        let post_count = 0;
        let url = "http://localhost:4000/api/get_post_count/" + user_login_info_from_cache.user_name;

        try {
            const response = await fetch(url, { method: 'GET' })
            post_count = await response.json() + 1;
        } catch {
            console.log("Error");
        }

        let post_desc = {
            "post_id": "post|" + user_login_info_from_cache.user_name + "|" + post_count,
            "username": user_login_info_from_cache.user_name,
            "post_description": post_text,
            "post_image": blob,
            "tag": [],
            "upload_date": date,
            "upload_time": time
        }

        console.log(post_desc)

        url = "http://localhost:4000/api/add_post";

        try {
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(post_desc),
                headers: {
                    'Content-Type': 'applicaton/json'
                }
            })
            window.location.reload();
        } catch {
            console.log("Error");
        }
    }

    //#region POPUP
    // Popup open
    const openPopup = (message, type) => {
        set_popup_message(message);
        set_popup_type(type);
        setShowPopup(true);
    };

    // Popup close
    const closePopup = () => {
        set_popup_message("");
        set_popup_type("");
        setShowPopup(false);
    };
    //#endregion

    return (
        <>
            {showPopup && <Popup onClose={closePopup} message={popup_message} type={popup_type} />}

            <div id='create_post_container' style={{ height: '320px' }}>
                <textarea id='post_text' placeholder='Share........' value={value} onChange={handleChange} rows={rows}></textarea>

                {uploaded_image_url && <div className='uploaded_image_for_post'>
                    <div className='unselect_image' onClick={unselect_image}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <img src={uploaded_image_url} alt="" id="uploaded_image_for_post"></img>
                </div>}


                <div className="photo_upload_with_post">
                    <FontAwesomeIcon icon={faImage} />
                    <input type="file" accept="image/*" id="photo_upload_with_post" onChange={render_uploaded_image}></input>
                </div>

                <button className='upload_post_button' id='upload_post_button' onClick={make_post}>Post</button>
            </div>
        </>
    );
}

export default CreatePost