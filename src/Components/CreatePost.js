import { useState } from 'react';
import '../CSS for Components/CreatePost.css';
import AddTag from '../Components/AddTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons'

function CreatePost() {
    //#region Global declarations
    const [uploaded_image_url, set_uploaded_image_url] = useState(null);
    const [tag_insertion_area, set_tag_insertion_area] = useState(null);
    const [renderCount, setRenderCount] = useState(1);
    const [value, setValue] = useState('');
    const [rows, setRows] = useState(2);
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
        const newRows = parseInt(count / 38) + 2;

        if (newRows > rows) {
            let parent_div = document.getElementById("create_post_div").style.height;
            let parent_div_height = parseInt(parent_div.substring(0, parent_div.length - 2));
            document.getElementById("create_post_div").style.height = "" + (parent_div_height + 35) + "px";

            let child_div = document.getElementById("create_post_container").style.height;
            let child_div_height = parseInt(child_div.substring(0, child_div.length - 2));
            document.getElementById("create_post_container").style.height = "" + (child_div_height + 35) + "px";
        } else if (newRows < rows) {
            let parent_div = document.getElementById("create_post_div").style.height;
            let parent_div_height = parseInt(parent_div.substring(0, parent_div.length - 2));
            document.getElementById("create_post_div").style.height = "" + (parent_div_height - 35) + "px";

            let child_div = document.getElementById("create_post_container").style.height;
            let child_div_height = parseInt(child_div.substring(0, child_div.length - 2));
            document.getElementById("create_post_container").style.height = "" + (child_div_height - 35) + "px";
        }

        setRows(newRows);
        setValue(str);
    };
    //#endregion

    const renderComponents = () => {
        const components = [];
        for (let i = 0; i < renderCount; i++) {
            components.push(<AddTag id={i} />);
        }
        //console.log(document.getElementById("tag_insertion_div").style.height)
        return components;
    };

    return (
        <>
            <div id='create_post_container' style={{ height: '170px' }}>
                <textarea id='post_text' placeholder='Share........' value={value} onChange={handleChange} rows={rows}></textarea>
                <div id='tag_insertion_div' style={{ height: '0px' }}>
                    {renderComponents()}
                </div>

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
                <p className='add_tag_button' onClick={() => setRenderCount(renderCount + 1)}>Add tag</p>
                <button className='upload_post_button'>Post</button>
            </div>
        </>
    );
}

export default CreatePost