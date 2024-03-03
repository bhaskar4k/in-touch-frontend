import { useState } from 'react';
import '../CSS for Components/CreatePost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons'

function CreatePost() {
    //#region Global declarations
    const [uploaded_image_url, set_uploaded_image_url] = useState(null);
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
            document.getElementById("create_post_container").style.height = "520px";
            document.getElementById("create_post_div").style.height = "600px";
        }
    }
    //#endregion


    function unselect_image() {
        set_uploaded_image_url(null);
        document.getElementById("create_post_container").style.height = "320px";
        document.getElementById("create_post_div").style.height = "400px";
    }
    return (
        <>
            <div id='create_post_container'>
                <textarea id='post_text' placeholder='Share........'></textarea>

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