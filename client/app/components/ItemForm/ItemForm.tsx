'use client'
import './itemform.css'
import { useForm } from 'react-hook-form';
import ItemAuth from '@/app/hooks/useItem';
import useAuth from '@/app/hooks/useAuth';
import { Item } from '@/app/Interfaces';
import { useState } from 'react';
import { uploadPhotoToCloudinary } from '@/app/services/apiCloudinary';

function ItemForm() {
  const { register, handleSubmit } = useForm<Item>();
  const { item, handleItem } = ItemAuth();
  const { user } = useAuth()
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false)



  async function handleFileChange (event: any) {
    const selectedFile = event?.target.files[0];
    setFile(selectedFile)
    console.log(file)
    setShowForm(true)
    await uploadPhotoToCloudinary(file);
  }

  const submitForm = handleSubmit(async (item: Item) => {
    console.log('user:', user);
    console.log('item user id:', item.userId);
    item.userId = user?.id!;
    console.log(item)
    handleItem(item)
  });
  
  return (
    <div className='ItemForm'>
      <div className="img-form-container">
        <input className="img-form" type="file" onChange={handleFileChange} />
      </div>

      {showForm &&
      <form onSubmit={submitForm} className='item-form'>
        <div className='input-container'>

          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="categories">Categories</label>
            </div>
            <input id="categories" className='item-input' type="text" {...register("category", { required: true })} placeholder='Categories' />
          </div>
          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="season">Season</label>
            </div>
            <input id="season" className='item-input' type="text" {...register("season", { required: true })} placeholder='Season' />
          </div>
          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="occasion">Occasion</label>
            </div>
            <input id="occasion" className='item-input' type="text" {...register("occasion", { required: true })} placeholder='Occasion' />
          </div>
          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="color">Color</label>
            </div>
            <input id="color" className='item-input' type="text" {...register("color", { required: true })} placeholder='Color' />
          </div>
          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="brand">Brand</label>
            </div>
            <input id="brand" className='item-input' type="text" {...register("brand", { required: true })} placeholder='Brand' />
          </div>
          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="location">Location</label>
            </div>
            <input id="location" className='item-input' type="text" {...register("location", { required: true })} placeholder='Location' />
          </div>
        </div>
        <button className='register-button' type="submit">Add Item</button>
      </form>}
    </div>
  )
}

export default ItemForm