'use client'
import './itemform.css'
import categoriesImg from '../../../public/category.png';
import seasonImg from '../../../public/season.png';
import occasionImg from '../../../public/occasion.png';
import colorImg from '../../../public/color.png';
import brandImg from '../../../public/brand.png';
import locationImg from '../../../public/location.png';

import { useForm } from 'react-hook-form';
import useItems from '@/app/hooks/useItem';
import useAuth from '@/app/hooks/useAuth';
import { Item } from '@/app/Interfaces';
import { useState, useEffect } from 'react';
import { uploadPhotoToCloudinary } from '@/app/services/apiCloudinary';
import { useRouter } from 'next/navigation'; 
import { fetchInfoFromImage } from '@/app/services/apiCloudVision';
import rgbToColor from '@/app/utils/rgbToColor';
import Image from 'next/image';
import { it } from 'node:test';

function ItemForm() {
  const { register, handleSubmit, reset } = useForm<Item>();
  const { item, handlePostItem } = useItems();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [itemUrl, setItemUrl] = useState('');
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const router = useRouter();

  // Google Cloud states
  const [imageInfo, setImageInfo] = useState<{ logos?: string, labels?: string, hexColor?: string } | null>(null);

  const categoriesArray = [
    "Pants",
    "Tops",
    "Shirts",
    "Shoes",
    "Boots",
    "Bags",
    "Accessories",
    "Sandals",
    "Sneakers",
    "Heels",
    "Outwear",
    "Dress",
    "Shorts",
    "One-Piece"
  ];

 
  for (let i = 0; i< categoriesArray.length; i++){
      if(categoriesArray[i] === imageInfo?.labels ){
       const deleteElement = categoriesArray.indexOf(imageInfo?.labels)
       categoriesArray.splice(deleteElement, 1)
          categoriesArray.unshift(imageInfo?.labels)
          console.log("------->", categoriesArray)
      }else{
        console.log("No existe", imageInfo?.labels, "cambia nombre")
      }
      //  console.log(categoriesArray[i])
  }

 
  useEffect(() => {
    if (itemUrl) {
      setPhotoIsLoading(false);
    }
  }, [itemUrl]); 

  async function handleFileChange(event: any) {
    setPhotoIsLoading(true);
    const selectedFile = event?.target.files[0];
    setFile(selectedFile);
    setShowForm(true);

  
    if (selectedFile) {
      try {
        const imageUrl = await uploadPhotoToCloudinary(selectedFile); 
        setItemUrl(imageUrl);
          
        const info = await fetchInfoFromImage(imageUrl);
        reset()
        setImageInfo(prevState => ({
          ...prevState, 
          ...info
        }));
        
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setPhotoIsLoading(false);
      }
    }
  }

  const submitForm = handleSubmit(async (item: Item) => {
    item.userId = user?.id!;
    item.itemUrl = itemUrl;
    handlePostItem(item);
    router.push('/dashboard/cupboard');
  });

  console.log("Label-->", imageInfo?.labels)

  const circleStyle = {
    backgroundColor: rgbToColor(imageInfo?.hexColor) || 'white'
  };

  return (
    <div className='ItemForm'>
      <div className="img-form-container">
        {itemUrl && <img src={itemUrl} alt="" />}
        {photoIsLoading && <div className='spinner'></div>}
      </div>
      <div className="custom-file-input">
        <input className="img-form" type="file" onChange={handleFileChange} />
        <label htmlFor="file-input">Select a Photo</label>
      </div>

      {showForm &&
      <form onSubmit={submitForm} className='item-form'>
        <div className='input-container'>
          
          <div className='input-wrapper'>
            <div className='label-container'>
              <Image src={categoriesImg} alt="Icono" />
              <label htmlFor="categories">Categories</label>
            </div>
            <select 
              id="category" className='item-input' {...register("category", { required: true })} value={imageInfo?.labels || ''}  onChange={e => setImageInfo(prev => ({ ...prev, labels: e.target.value }))} >
              {categoriesArray.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            </select>
           </div>


           <div className='input-wrapper'>
          <div className='label-container'>
          <Image src={seasonImg} alt="Icono" />
            <label htmlFor="season">Season</label>
          </div>
          <select  id="season" className='item-input' {...register("season", { required: true })}   defaultValue="Season" 
          >
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
        </div>



          <div className='input-wrapper'>
            <div className='label-container'>
              <Image src={occasionImg} alt="Icono" />
              <label htmlFor="occasion">Occasion</label>
            </div>
            <select id="occasion" className='item-input'  {...register("occasion", { required: true })} placeholder='Occasion' 
            >
        <option value="Lounge">Lounge</option>
          <option value="Active">Active</option>
          <option value="Work">Work</option>
          <option value="Formal">Formal</option>
          <option value="Night">Night</option>
          <option value="Day">Day</option>
          <option value="Semi-Formal">Semi-Formal</option>
         </select>
            
          </div>

          <div className='input-wrapper'>
            <div className='label-container'>
              <Image src={colorImg} alt="Icono" />
              <label htmlFor="color">Color</label>
            </div>
              <p className='colorDot' style={circleStyle}> </p>
            <input id="color" 
            className='item-input' type="text"  {...register("color", { required: true })} placeholder="Color" value={rgbToColor (imageInfo?.hexColor) || ' '}  onChange={e => setImageInfo(prev => ({ ...prev, hexColor: e.target.value }))} />
            </div>

          <div className='input-wrapper'>
            <div className='label-container'>
              <Image src={brandImg} alt="Icono" />
              <label htmlFor="brand">Brand</label>
            </div>
            <input id="brand" className='item-input' type="text" {...register("brand", { required: true })} placeholder="Brand" value={imageInfo?.logos || ''} onChange={e => setImageInfo(prev => ({ ...prev, logos: e.target.value }))} />
          </div>

          <div className='input-wrapper'>
            <div className='label-container'>
              <Image src={locationImg} alt="Icono" />
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
