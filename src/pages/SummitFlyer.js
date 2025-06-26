import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage';
import html2canvas from 'html2canvas';
import backgroundImage from '../images/current_summit.jpg';
import blankImage from '../images/blank.png';
import '../style/flyer.css';

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
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadFlyer = () => {
    const flyerElement = document.getElementById('flyer');
    html2canvas(flyerElement, {
      scale: 3,
      useCORS: true,
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
        {/* Cropper Section */}
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
                aspect={1}
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

        {/* Flyer Preview Section */}
        <div className="flyer-preview-section">
          <div
            id="flyer"
            className="flyer-preview"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <img
              src={flyerImage}
              alt="Cropped"
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