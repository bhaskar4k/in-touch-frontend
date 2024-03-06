import { useState } from 'react';
import '../CSS for Components/CreatePost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons'

function CreatePost() {
    //#region Global declarations
    const [uploaded_image_url, set_uploaded_image_url] = useState(null);
    const [value, setValue] = useState('');
    const [rows, setRows] = useState(6);
    const [letter_limit, set_letter_limit] = useState(6 * 38);
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

            let parent_div = document.getElementById("create_post_div").style.height;
            let parent_div_height = parseInt(parent_div.substring(0, parent_div.length - 2));
            document.getElementById("create_post_div").style.height = "" + (parent_div_height + 200) + "px";

            let child_div = document.getElementById("create_post_container").style.height;
            let child_div_height = parseInt(child_div.substring(0, child_div.length - 2));
            document.getElementById("create_post_container").style.height = "" + (child_div_height + 200) + "px";
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


    return (
        <>
            <div id='create_post_container' style={{ height: '320px' }}>
                <textarea id='post_text' placeholder='Share........' value={value} onChange={handleChange} rows={rows}></textarea>

                {uploaded_image_url && <div className='uploaded_image_for_post'>
                    <div className='unselect_image' onClick={unselect_image}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <img src={uploaded_image_url} alt=""></img>
                </div>}


                <div className="photo_upload_with_post">
                    <FontAwesomeIcon icon={faImage} />
                    <input type="file" accept="image/*" id="photo_upload_with_post" onChange={render_uploaded_image}></input>
                </div>

                <button className='upload_post_button'>Post</button>
            </div>
        </>
    );
}

export default CreatePost