import { useForm } from "react-hook-form"
import { Interface } from "readline"

import { useState } from "react";

interface imgData {
  image?: FileList;
}

function Home() {
  const {register, handleSubmit} = useForm<imgData>()

  const onSubmit = (data: imgData) => {
    //  console.log(data[0])
}

   
  return (
    <div>
      <div>Home</div>

      <br></br>

      <form onSubmit={handleSubmit(onSubmit)}>
      <input   {...register("image", { required: true })} placeholder='image' type="file" name="picture" />
     
      <br></br>
      <button className='photo-button' type="submit" >Upload Img</button>
      </form>
    </div>
  )
}

export default Home