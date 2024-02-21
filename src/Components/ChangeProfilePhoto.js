import '../CSS for Components/ChangeProfilePhoto.css';
import { useState } from 'react';
import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.min.css';

function ChangeProfilePhoto(props) {
    //#region Cropperjs logic to crop the uploaded image------------------------------------------------------
    const [selectedImage, setSelectedImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [displayCroppedImage, setDisplayCroppedImage] = useState(false);
    const cropperRef = useRef(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.onerror = (error) => {
                console.error('Error reading image:', error);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
                width: 600,
                height: 600,
            });
            if (croppedCanvas) {
                croppedCanvas.toBlob((blob) => {
                    const croppedImageUrl = URL.createObjectURL(blob);
                    setSelectedImage(null);
                    setCroppedImage(croppedImageUrl);
                    setDisplayCroppedImage(true);
                });
            }
        }
    };
    //#endregion --------------------------------------------------------------------------------------------


    //#region Push the cropped image into database ----------------------------------------------------------------
    async function push_cropped_image_into_DB() {
        const file = document.getElementById('output');
        const imageUrl = file.src;

        // Load the image
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('image', blob);
        formData.append('user_name', props.requested_username);

        try {
            const response = await fetch('http://localhost:8080/change_profile_photo', {
                method: 'POST',
                body: formData
            })
            const wholeResponse = await response.text();
            console.log(wholeResponse)
        } catch {
            console.log("0", "Internal server error");
        }
    }
    // #endregion ----------------------------------------------------------------------------------------------------

    return (
        <>
            <div className='change_profile_photo_container'>
                <input type="file" accept="image/*" id="imageInput" onChange={handleImageChange} />
                {selectedImage && (<div className='cropping_container'>
                    <Cropper
                        ref={cropperRef}
                        src={selectedImage}
                        aspectRatio={1 / 1} // Adjust aspect ratio as needed
                        guides={false} // Remove guides if desired
                        viewMode={1} // Set view mode for initial zoom
                        cropmove={true} // Enable crop area movement
                        cropend={(data) => console.log('Crop data:', data)} // Optionally log crop data
                        className='cropping_image'
                    />
                </div>
                )}
                <div>
                    <button onClick={handleCrop}>Crop Image</button>
                    <button onClick={push_cropped_image_into_DB}>Change profile photo</button>
                </div>
                {displayCroppedImage && <img src={croppedImage} alt="Cropped Image" id="output" />}
            </div>
        </>
    );
}

export default ChangeProfilePhoto;
