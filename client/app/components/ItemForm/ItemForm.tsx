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
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [showColorMenu, setShowColorMenu] = useState(false);



  const toggleColorMenu = () => {
    setShowColorMenu(!showColorMenu);
  };

  console.log("item-->", selectedOccasions)
  console.log("ImageInfo-->", selectedOccasions)

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
    "Outerwear",
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
    } else{
      console.log("No existe", imageInfo?.labels, "cambia nombre")
    }
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
  console.log("item--->", item)
});

const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = e.target.value;
  if (selectedSeasons.includes(selectedValue)) {
    setSelectedSeasons(prevSeasons => prevSeasons.filter(season => season !== selectedValue));
  } else {
    setSelectedSeasons(prevSeasons => [...prevSeasons, selectedValue]);
  }
   console.log("array:", selectedSeasons);
};

const handleSeasonClick = (seasonToRemove: string) => {
  setSelectedSeasons(prevSeasons => prevSeasons.filter(season => season !== seasonToRemove));
}

const handleOccasionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = e.target.value;
  if (selectedOccasions.includes(selectedValue)) {
    setSelectedOccasions(prevOccasions => prevOccasions.filter(occasion => occasion !== selectedValue));
  } else {
    setSelectedOccasions(prevOccasions => [...prevOccasions, selectedValue]);
  }
};

const handleOccasionClick = (occasionToRemove: string) => {
  setSelectedOccasions(prevOccasions => prevOccasions.filter(occasion => occasion !== occasionToRemove));
};

// d
const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = e.target.value;
  if (selectedColors.includes(selectedValue)) {
    setSelectedColors(prevColors => prevColors.filter(color => color !== selectedValue));
  } else {
    setSelectedColors(prevColors => [...prevColors, selectedValue]);
  }
};


// const handleColorClick = (colorToRemove: string) => {
//   setSelectedColors(prevColors => prevColors.filter(color => color !== colorToRemove));
// };
const handleColorClick = (color: string) => {
  if (selectedColors.includes(color)) {
    setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
  } else {
    setSelectedColors((prevColors) => [...prevColors, color]);
  }
};

console.log("colores--->",selectedColors)



console.log("Label-->", imageInfo?.labels)

const circleStyle = {
  backgroundColor: rgbToColor(imageInfo?.hexColor) || 'white'
};

  const colorsData = [
    { id: 1, color: 'Red', value: '#FF0000' },
    { id: 2, color: 'Blue', value: '#0000FF' },
    { id: 3, color: 'Green', value: '#008000' },
    { id: 4, color: 'Yellow', value: '#FFFF00' },
    { id: 5, color: 'Black', value: '#000000' },
    { id: 6, color: 'White', value: '#FFFFFF' },
    { id: 7, color: 'Purple', value: '#800080' }
  ];

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
              id="category" className='item-input' {...register("category", { required: true })} value={imageInfo?.labels || ''}  onChange={e => setImageInfo(prev => ({ ...prev, labels: e.target.value }))}>
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
            <div className='seasonArray'>
            {selectedSeasons.map((season, index) => (
              <div className='eachSeason'key={index} onClick={() => handleSeasonClick(season)}>{season}</div>))} 
            </div>
            <select multiple  id="season" className='item-input' {...register("season", { required: true, setValueAs: () => selectedSeasons })} value={selectedSeasons} onChange={handleSeasonChange}  defaultValue="Season" 
            style={{ height: "20px", overflowY: "visible", boxShadow: "1px 1px 5px gray" }}>
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
          <div className='occasionArray'>
          {selectedOccasions.map((occasion, index) => (
            <div className='eachOccasion' key={index} onClick={() => handleOccasionClick(occasion)}>{occasion}
            </div>))}
          </div>
          <select multiple id="occasion" className='item-input' {...register("occasion", { required: true, setValueAs: () => selectedOccasions })} value={selectedOccasions} onChange={handleOccasionChange}
            style={{ height: "20px", overflowY: "visible", boxShadow: "1px 1px 5px gray" }}>
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
          <div className='label-container colorDropdownButton' onClick={toggleColorMenu}>
            <Image src={colorImg} alt="Icono" />
            <label htmlFor="colorSelect">Color</label>
          </div>
        
        </div>
        <ul className="colors-dropdown" style={{ display: showColorMenu ? 'flex' : 'none' }}>
          {colorsData.map((colorItem) => (
            <li className={`li-wrapper ${selectedColors.includes(colorItem.color) ? 'active' : ''}`} key={colorItem.id} onClick={() => handleColorClick(colorItem.color)}>
              <div className="color" style={{ backgroundColor: colorItem.value }}></div>
              {colorItem.color}
            </li>
          ))}
        </ul>


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






  {/* <div className='colorArray'>
            {selectedColors.map((color, index) => (
              <div className='eachColor' key={index} onClick={() => handleColorClick(color)}>
                <span className='colorDot' style={{ backgroundColor: color }}></span> {color}
              </div>))}
          </div> */}
          {/* <select multiple id="colorSelect" className='item-input' {...register("color", { required: true, setValueAs: () => selectedColors })} value={selectedColors} onChange={handleColorChange}
             style={{ display: showColorMenu ? 'block' : 'none' }}>
            <option className='hey' value="Red">Red</option>
            <option className='hey' value="Blue">Blue</option>
            <option className='hey' value="Green">Green</option>
            <option className='hey' value="Yellow">Yellow</option>
            <option className='hey' value="Black">Black</option>
            <option className='hey' value="White">White</option>
            <option className='hey' value="Purple">Purple</option>
            <option className='hey' value="Orange">Orange</option>
          </select> */}