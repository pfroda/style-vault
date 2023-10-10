import axios from 'axios';
// process.env.VITE_APP_CLOUD_KEY;
const cloudKey = "qlofz1nj"
const urlCloud = 'https://api.cloudinary.com/v1_1/dizg5ajyl/image/upload';


export const uploadPhotoToCloudinary = async (file: File) => {
  if (!cloudKey) {
    throw new Error("Cloud key is not defined!");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudKey);

  try {
    const response = await axios.post(urlCloud, formData);
    console.log(response.data.secure_url)
    return response.data;
    
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.response?.data || error.message);
    throw error;
  }
};



