const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINRY_NAME, // Replace with your cloud name
  api_key: process.env.CLOUDINRY_API_KEY, // Replace with your API key
  api_secret: process.env.CLOUDINRY_API_SECRET, // Replace with your API secret
});

async function uploadImage(imgBuffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject({
            status: false,
            reason: error,
          });
        } else {
          resolve({
            status: true,
            url: result.secure_url,
          });
        }
      }
    ).end(imgBuffer); 
  });
}

module.exports = async function (){
  return (
    {
      insertImg : async(buffer)=> await uploadImage(buffer),
    }
  )
}
