import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage'; // Ensure this path is correct
import html2canvas from 'html2canvas';
import backgroundImage from '../images/current_summit.jpg'; // Ensure this path is correct
import blankImage from '../images/blank.png'; // Ensure this path is correct
import '../style/flyer.css'; // Ensure this path is correct

const CreateFlyer = () => {
  const [fileName, setFileName] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [flyerImage, setFlyerImage] = useState(blankImage);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setFlyerImage(croppedImage);
      // Smooth scroll to the bottom after saving crop
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadFlyer = () => {
    const flyerElement = document.getElementById('flyer');
    html2canvas(flyerElement, {
      scale: 3, // Increased scale for better resolution on download
      useCORS: true, // Important if images are from different origins (though usually not for local imports)
      // allowTaint: true, // Uncomment if you face CORS issues with images from other domains
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'flyer.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="flyer-container">
      <h1 className="flyer-title">Create Your LWFS Summit Avatar</h1>

      <div className="flyer-grid">
        {/* Cropper Section - This will be on the left on larger screens */}
        <div className="cropper-section">
          <div className="upload-container">
            <label htmlFor="file-upload" className="upload-button">
              Upload a Photo
              <input
                type="file"
                accept="image/*"
                className="file-input"
                id="file-upload"
                onChange={handleFileChange}
              />
            </label>
            {fileName && <span className="file-name">{fileName}</span>}
          </div>

          {imageSrc && (
            <div className="cropper-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1} // Aspect ratio for the crop area (1:1 for a square/circle avatar)
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}

          {imageSrc && (
            <button className="save-crop-button" onClick={handleSaveCrop}>
              Save Crop
            </button>
          )}
        </div>

        {/* Flyer Preview Section - This will be on the right on larger screens */}
        <div className="flyer-preview-section">
          <div
            id="flyer"
            className="flyer-preview"
            // The background image is now handled by an <img> tag inside
          >
            {/* The actual background image for the flyer */}
            <img
              src={backgroundImage}
              alt="Flyer Background"
              className="flyer-background-image"
            />
            {/* The cropped user's avatar */}
            <img
              src={flyerImage}
              alt="Cropped Avatar"
              className="cropped-image"
            />
          </div>

          {flyerImage !== blankImage && (
            <button className="download-button" onClick={handleDownloadFlyer}>
              Download Flyer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFlyer;