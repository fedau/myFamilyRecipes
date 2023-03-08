import { useState } from "react";
import handleFileUpload from "../aws/s3_upload";

const UploadImage = ({ onUpload }) => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const uploadUrl = await handleFileUpload(file);
    setUploaded(true);
    onUpload(uploadUrl);
  };

  return (
    <>
      <div className="">
        {/* <label htmlFor="email" className="text-sm font-medium text-slate-800">
          Profile image*
        </label> */}
        <div className="">
          <label
            htmlFor="file"
            className=""
          >
            <div className="">
              <p>Upload an image here</p>
            </div>
            <input
              id="file"
              accept="image/png, image/jpeg"
              onChange={handleUpload}
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </div>

      {uploaded && <p>Uploaded successfully!</p>}
    </>
  );
};

export default UploadImage;
