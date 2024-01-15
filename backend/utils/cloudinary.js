const { v2 } = require("cloudinary");
const fs = require("fs");
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //uploaded file on cloudinary
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response.url);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation failed
    return null;
  }
};
module.exports = uploadOnCloudinary;
