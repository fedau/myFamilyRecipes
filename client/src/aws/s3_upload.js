import AWS from "aws-sdk";

const handleFileUpload = async (file) => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: "eu-west-2",
    signatureVersion: "v4",
  });

  const s3 = new AWS.S3();

  const post = s3.createPresignedPost({
    Bucket: "familyrecipeimages",
    Region: "eu-west-2",
    Fields: {
      key: file.name,
      "Content-Type": file.type,
    },
    Expires: 60,
    Conditions: [["content-length-range", 0, 1048576]],
  });

  const formData = new FormData();
  Object.entries(post.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);

  await fetch(post.url, {
    method: "POST",
    body: formData,
  });

  return `${post.url}/${file.name}`;
};

export default handleFileUpload;
