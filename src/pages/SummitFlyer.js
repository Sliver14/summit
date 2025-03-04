import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage';
import html2canvas from 'html2canvas';
import backgroundImage from '../images/16th_summit_registration.jpg';
import "../style/flyer.css";

const CreateFlyer = () => {
  const [fileName, setFileName] = useState("");

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [flyerImage, setFlyerImage] = useState("../images/blank.png");

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
      setFileName(file.name)
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
      scale: 3, // Increase the scale factor for higher quality
      useCORS: true, // Ensure cross-origin images are captured correctly (if needed)
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'flyer.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className='summitflyer' >
      <div style={{textAlign: "center"}}>
        <h1 className='summith1'>Create Your LWFS
        Summit Avatar</h1>
      </div>
      

      {/* Image Upload Section */}
      <div className='upload-container'>
        <label htmlFor="file-upload" className='file-upload-label'>
        Upload a photo
          <input type="file" accept="image/*" className='file-upload-input' id="file-upload" onChange={handleFileChange} />
        </label>
        {fileName && <span id="file-name">{fileName}</span>}
      </div>

      {/* Image Crop Section */}
      {imageSrc && (
        <div className='image-crop-session' style={{ position: 'relative', width: '100%', height: 400 }}>
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
        <button className='save-crop' style={{justifySelf: "center",  }} onClick={handleSaveCrop}>Save Crop</button>
      )}

      {/* Flyer Preview Section */}
      {/* {flyerImage && ( */}
        <div
          id="flyer"
          style={{
            position: 'relative',
            display: 'flex',
            // justifySelf: 'center',
            alignItems: "center",
            alignSelf: "center",
            width: '90%',
            height: 0,
            // width: "100vw",
            // height: "100vh",
            // border: '1px solid #ccc',
            backgroundImage: `url(${backgroundImage})`, // Link to your flyer template
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: "no-repeat",
            paddingTop: '90%',
            marginTop: "2em",
          }}
        >
            <img
            src={flyerImage}
            alt="Cropped"
            style={{
              position: 'absolute',
              width: '31%', // Adjust dimensions for proper placement
              height: 'auto',
              border: "0.15em solid #e8aa53",
              top: '63%', // Adjust positioning based on your template
              left: '18%',
              borderRadius: "50%",
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          
        </div>
      {/* )} */}

      {/* <img 
            src="../images/blank.png"
            alt=''
            style={{
              position: 'absolute',
              width: '60px', // Adjust dimensions for proper placement
              height: '60px',
              border: "0.15em solid #e8aa53",
              top: '63%', // Adjust positioning based on your template
              left: '18%',
              borderRadius: "50%",
              transform: 'translate(-50%, -50%)',
            }}
          /> */}

      {flyerImage && (
        <button className="download-flter" onClick={handleDownloadFlyer}>Download Flyer</button>
      )} 
    </div>
  );
};

export default CreateFlyer;
