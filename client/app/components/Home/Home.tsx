import { useForm } from "react-hook-form"
import { Interface } from "readline"
import { useState } from "react";
import { uploadPhotoToCloudinary } from "@/app/services/apiCloudinary";
import Link from 'next/link';

interface imgData {
  file?: FileList;
}
function Home() {
  const {register, handleSubmit} = useForm<imgData>()
  const [image, setImage] = useState<string | null>(null);

  const onSubmit = async (data: imgData) => {
    if (data.file && data.file.length > 0) {
      console.log('trying')
      const response = await uploadPhotoToCloudinary(data.file[0]);
      if (response.data && response.data.secure_url) {

        setImage(response.data.secure_url);
      }
    }
  };
  return (
    <div>
      <p>Home</p>
      <Link href="/dashboard/userprofile">Profile</Link>
    </div>
  )
}

export default Home