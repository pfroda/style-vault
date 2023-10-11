const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(req, res) {
  try {
    if (!req.files || !req.files[0]) {
      return res.status(400).json({ error: 'No file provided' });
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          use_filename: true,
          unique_filename: false,
          background_removal: 'cloudinary_ai', 
        },
        onDone
      ).end(req.files[0].buffer);

      function onDone(error, result) {
        if (error) {
          reject({ success: false, error });
        } else {
          resolve({ success: true, result });
        }
      }
    }).then((result) => {
      res.json(result);
    }).catch((error) => {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'An error occurred while uploading to Cloudinary', details: error.message });
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'An error occurred while uploading to Cloudinary', details: error.message });
  }
}

export default {
  uploadToCloudinary
};
