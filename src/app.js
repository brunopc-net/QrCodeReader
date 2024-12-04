import React, { useState } from "react";
import jsqr from "jsqr";

function App() {
  const [qrData, setQrData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        decodeQRCode(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeQRCode = (imageData) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Get image data from canvas
      const imageDataCanvas = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsqr(imageDataCanvas.data, img.width, img.height);

      if (code) {
        setQrData(code.data);
      } else {
        setQrData("QR code not found.");
      }
    };

    img.src = imageData;
  };

  return (
    <div className="App">
      <h1>QR Code Reader</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="QR code" width="200" />
        </div>
      )}

      {qrData && (
        <div>
          <h3>Decoded Data:</h3>
          <p>{qrData}</p>
        </div>
      )}
    </div>
  );
}

export default App;