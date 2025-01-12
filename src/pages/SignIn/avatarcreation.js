import React, { useRef, useState } from 'react';

const AvatarCreation = ({ location }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        alert('Unable to access the camera. Please check your permissions.');
      });
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 300, 300); // Set dimensions
      const dataURL = canvasRef.current.toDataURL('image/png');
      setCapturedImage(dataURL);
    }
  };

  const uploadImage = async () => {
    if (capturedImage) {
      try {
        const formData = new FormData();
        formData.append('file', dataURItoBlob(capturedImage), 'avatar.png');

        const response = await fetch('http://localhost:8000/avatar-generator', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        console.log('Image processed:', result);
        alert('Image uploaded and processed successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    } else {
      alert('No image captured yet!');
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9', // Set a light background for better visuals
      }}
    >
      <h1 style={{ fontFamily: "'GraffitiYouth', sans-serif", fontSize: '3rem', color: '#4b287c' }}>
        Avatar Creation
      </h1>
      <p
        style={{
          fontSize: '1.5rem',
          color: '#6a35b7',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px',
        }}
      >
        Welcome, {location?.state?.dripsterName || 'Dripster'}!
      </p>
  
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            ></video>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
              }}
            >
              <button
                onClick={startCamera}
                style={{
                  backgroundColor: '#4b287c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Start Camera
              </button>
              <button
                onClick={captureImage}
                style={{
                  backgroundColor: '#6a35b7',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              >
                Capture Image
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={capturedImage}
              alt="Captured"
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
            <button
              onClick={() => setCapturedImage(null)}
              style={{
                backgroundColor: '#b72d7b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '15px',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Retake Image
            </button>
          </>
        )}
      </div>
  
      <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="300"></canvas>
      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={uploadImage}
            style={{
              backgroundColor: '#35b76a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 15px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
}
export default AvatarCreation;
  