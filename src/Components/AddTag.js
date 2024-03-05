import { useState } from 'react';
import '../CSS for Components/AddTag.css';

function AddTag(props) {
    const [value, setValue] = useState('1');
    const [size, setSize] = useState(1);

    const handleChange = (event) => {
        setValue(event.target.value);
        setSize(event.target.value.length);
    };


    return (
        <>
            <div className='each_tag_input'>
                <input type="text" id={"tag" + props.id} value={value} onChange={handleChange} size={size}></input>
            </div>
        </>
    );
}

export default AddTag