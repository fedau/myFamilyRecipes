import { useState } from "react";

const UploadImage = ({ onUpload }) => {
  const [uploaded, setUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");


  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    setUploaded(true);
    onUpload(
      await fetch("/api/images", {
        method: "POST",
        body: formData
      })
        .then((response) => response.text())
        .then(body => {
          // Use the body value here
          console.log(body)
          setImageUrl(body)
        })
    );
  };

  return (
    <div>
      <div>
        <label htmlFor="file">
          <div>
            <p>Upload an image here</p>
          </div>
          <input
            style={{ cursor: "pointer" }}
            id="file"
            accept="image/png, image/jpeg"
            onChange={handleUpload}
            type="file"
            className="hidden"
          />
        </label>
      </div>
      {imageUrl &&
        <img alt="review upload" src={imageUrl} />
      }

    </div >
  );
};

export default UploadImage;
