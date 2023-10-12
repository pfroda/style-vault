const url = process.env.NEXT_PUBLIC_BASE_URL

export const uploadPhotoToCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file);
  console.log(formData)
  try {
    const response = await fetch(`${url}/item-foto`, {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Image upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
}


