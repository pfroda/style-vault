'use client';
import './itemform.css';
import categoriesImg from '../../../public/category.png';
import seasonImg from '../../../public/season.svg';
import occasionImg from '../../../public/occasion.png';
import colorImg from '../../../public/color.png';
import brandImg from '../../../public/diamante.svg';
// import locationImg from '../../../public/location.png';
import expandLess from '../../../public/expand-less.png';
import expandMore from '../../../public/expand-more.png';

// Nuevos iconos, solo comentalos y pon los otros
import closetImg from '../../../public/closet.png';
import shirtImg  from '../../../public/tshirt.png';
import calendarImg  from '../../../public/calendar.png';
import colorBuck  from '../../../public/fill.png';
import locationImg  from '../../../public/loc.png';

import { useDispatch, useSelector } from 'react-redux';
import { setClosetState } from '@/app/GlobalRedux/Features/closet/closetSlice';

import { queryClosets } from '@/app/services/apiGraphQL';
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
  const dispatch = useDispatch();
  const closets = useSelector(state => state.closet.closets);

  const [imageInfo, setImageInfo] = useState<{ logos?: string, labels?: string, hexColor?: string } | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCloset, setSelectedCloset] = useState<string>('');

  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showOccasionMenu, setShowOccasionMenu] = useState(false);
  const [showSeasonMenu, setShowSeasonMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(true);
  const [showClosetMenu, setShowClosetMenu] = useState(false);

  const toggleColorMenu = () => {
    setShowColorMenu(!showColorMenu);
  };
  const toggleOccasionsMenu = () => {
    setShowOccasionMenu(!showOccasionMenu);
  };
  const toggleSeasonMenu = () => {
    setShowSeasonMenu(!showSeasonMenu);
  };
  const toggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };
  const toggleClosetMenu = () => {
    setShowClosetMenu(!showClosetMenu);
  };
  
  const categoriesArray = ["Pants", "Tops", "Shirts", "Shoes", "Boots", "Bags", "Accessories", "Sandals", "Sneakers", "Heels", "Outerwear", "Dress", "Shorts", "One-Piece"];
 
  for (let i = 0; i < categoriesArray.length; i++){
    if (categoriesArray[i] === imageInfo?.labels) {
      const deleteElement = categoriesArray.indexOf(imageInfo?.labels);
      categoriesArray.splice(deleteElement, 1);
        categoriesArray.unshift(imageInfo?.labels)
    } else {
      // console.log("No existe", imageInfo?.labels, "cambia nombre")
    }
  }

//   useEffect(() => {
//     if (!selectedCategory) {
//     setSelectedCategory(categoriesArray[0]);
//     console.log(categoriesArray[0])
// }
//   }, [categoriesArray]);
  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory(categoriesArray[0]);
      console.log(categoriesArray[0]);
    }
  }, [categoriesArray, selectedCategory]);


  // No borrar esto, es para el color. 
  
//   useEffect(() => {
//     if (!selectedColors.length && imageInfo?.hexColor) {
//         const color = rgbToColor(imageInfo.hexColor);
//         if (color) {
//             setSelectedColors([color]);
//         }
//     }
// }, [imageInfo?.hexColor, selectedColors]);

 
  useEffect(() => {
    if (itemUrl) {
      setPhotoIsLoading(false);
    }
  }, [itemUrl]);

  
  useEffect(() => {
    queryClosets(user?.id!)
      .then(data => {
        console.log(data);
        dispatch(setClosetState(data))
      })
  }, []);

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
    item.category = selectedCategory;
    item.occasion = selectedOccasions;
    item.season = selectedSeasons;
    item.color = selectedColors;
    item.closets = selectedCloset
    // item.brand = imageInfo?.logos
    
    handlePostItem(item);
    router.push('/dashboard/cupboard');
    console.log("item--->", item)
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  

  // const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = e.target.value;
  //   if (selectedSeasons.includes(selectedValue)) {
  //     setSelectedSeasons(prevSeasons => prevSeasons.filter(season => season !== selectedValue));
  //   } else {
  //     setSelectedSeasons(prevSeasons => [...prevSeasons, selectedValue]);
  //   }
  //   console.log("array:", selectedSeasons);
  // };

const handleSeasonClick = (seasonToRemove: string) => {
  if (selectedSeasons.includes(seasonToRemove)) {
    setSelectedSeasons(prevSeasons => prevSeasons.filter(season => season !== seasonToRemove));
  } else {
    setSelectedSeasons(prevSeasons => [...prevSeasons, seasonToRemove]);
  }
};

// const handleOccasionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   const selectedValue = e.target.value;
//   if (selectedOccasions.includes(selectedValue)) {
//     setSelectedOccasions(prevOccasions => prevOccasions.filter(occasion => occasion !== selectedValue));
//   } else {
//     setSelectedOccasions(prevOccasions => [...prevOccasions, selectedValue]);
//   }
// };

const handleOccasionClick = (occasionToRemove: string) => {
  if (selectedOccasions.includes(occasionToRemove)) {
    setSelectedOccasions(prevOccasions => prevOccasions.filter(occasion => occasion !== occasionToRemove));
  } else {
    setSelectedOccasions(prevOccasions => [...prevOccasions, occasionToRemove]);
  }
};

// const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   const selectedValue = e.target.value;
//   if (selectedColors.includes(selectedValue)) {
//     setSelectedColors(prevColors => prevColors.filter(color => color !== selectedValue));
//   } else {
//     setSelectedColors(prevColors => [...prevColors, selectedValue]);
//   }
// };


const handleColorClick = (color: string) => {
  if (selectedColors.includes(color)) {
    setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
  } else {
    setSelectedColors((prevColors) => [...prevColors, color]);
  }
};

const handleClosetSelect = (closetId: string) => {
  setSelectedCloset(closetId);
  // toggleClosetMenu();
};

const circleStyle = { backgroundColor: rgbToColor(imageInfo?.hexColor) || 'white'};

const colorsData = [
  { id: 1, color: 'Red', value: '#fd6767' },
  { id: 2, color: 'Blue', value: '#619bfe' },
  { id: 3, color: 'Green', value: '#468146' },
  { id: 4, color: 'Yellow', value: '#fff872' },
  { id: 5, color: 'Black', value: '#000000' },
  { id: 6, color: 'White', value: '#FFFFFF' },
  { id: 7, color: 'Purple', value: '#cd7cff' }
];

const occasionsData = ["Lounge", "Active", "Work", "Formal", "Night", "Day", "Semi-Formal"];

const seasonsData = ["Winter", "Spring", "Summer", "Autumn"];


return (
  <div className='ItemForm'>
    <div className="img-form-container">
      {itemUrl && <img  src={itemUrl} alt="" />}
      {photoIsLoading && <div className='spinner'></div>}
    </div>
    <div className="custom-file-input">
      <input className="img-form" type="file" onChange={handleFileChange} />
      <label htmlFor="file-input">Select a Photo</label>
    </div>

      {showForm &&
      <form onSubmit={submitForm} className='item-form'>
        <div className='input-container'>
          
          {/* CATEOGRY DROPDOWN */}
          <div className='input-wrapper' onClick={toggleCategoryMenu}>
            <div className='label-container colorDropdownButton'>
              <Image src={shirtImg} alt="Icono" />
              <label htmlFor="categories">Categories</label>
            </div>
            <Image className="expand-icon" src={showCategoryMenu ? expandLess : expandMore} alt="" />
          </div>

          <ul className={`colors-dropdown ${showCategoryMenu ? 'activedropdown' : ''}`}>
          {categoriesArray.map((categoryItem) => (
            <li className={`li-wrapper ${selectedCategory === categoryItem ? 'active' : ''}`} key={categoryItem} onClick={() => handleCategorySelect(categoryItem)} >{categoryItem}</li>
          ))}
          </ul>
          {/* CATEOGRY DROPDOWN */}
          
          {/* SEASON DROPDOWN */}
          <div className='input-wrapper' onClick={toggleSeasonMenu}>
            <div className='label-container colorDropdownButton'>
              <Image src={seasonImg} alt="Icono" />
              <label htmlFor="season">Season</label>
            </div>
            <Image className="expand-icon" src={showSeasonMenu ? expandLess : expandMore} alt="" />
          </div>

        <ul className={`colors-dropdown ${showSeasonMenu ? 'activedropdown' : ''}`}>
          {seasonsData.map((seasonItem) => (
            <li className={`li-wrapper ${selectedSeasons.includes(seasonItem) ? 'active' : ''}`} key={seasonItem} onClick={() => handleSeasonClick(seasonItem)}>
              {seasonItem}
            </li>
          ))}
        </ul>
        {/* SEASONS DROPDOWN */}
      
        {/* OCASSIONS DROPDOWN */}
        <div className='input-wrapper' onClick={toggleOccasionsMenu}>
          <div className='label-container colorDropdownButton'>
            <Image src={calendarImg} alt="Icono" />
            <label htmlFor="occasion">Occasion</label>
          </div>
          <Image className="expand-icon" src={showOccasionMenu ? expandLess : expandMore} alt="" />
        </div>

        <ul className={`colors-dropdown ${showOccasionMenu ? 'activedropdown' : ''}`}>
          {occasionsData.map((occasionItem) => (
            <li className={`li-wrapper ${selectedOccasions.includes(occasionItem) ? 'active' : ''}`} key={occasionItem} onClick={() => handleOccasionClick(occasionItem)}>
              {occasionItem}
            </li>
          ))}
        </ul>
        {/* <input type="hidden" value={selectedCategory} {...register("category")} /> */}

        {/* OCASSIONS DROPDOWN */}

        {/* COLORS DROPDOWN */}
        <div className='input-wrapper' onClick={toggleColorMenu}>
          <div className='label-container colorDropdownButton'>
            <Image src={colorBuck} alt="Icono" />
            <label htmlFor="colorSelect">Color</label>
          </div>
          <Image className="expand-icon" src={showColorMenu ? expandLess : expandMore} alt="" />
        </div>

        <ul className={`colors-dropdown ${showColorMenu ? 'activedropdown' : ''}`}>
          {colorsData.map((colorItem) => (
            <li className={`li-wrapper ${selectedColors.includes(colorItem.color) ? 'active' : ''}`} key={colorItem.id} onClick={() => handleColorClick(colorItem.color)}>
              <div className="color" style={{ backgroundColor: colorItem.value }}></div>
              {colorItem.color}
            </li>
          ))}
        </ul>
        {/* COLORS DROPDOWN */}

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

        {/* CLOSET DROPDOWN */}
      <div className='input-wrapper' onClick={toggleClosetMenu}>
        <div className='label-container colorDropdownButton'>
          <Image src={closetImg} alt="Icono" />
          <label htmlFor="closets">Closet</label>
        </div>
        <Image className="expand-icon" src={showClosetMenu ? expandLess : expandMore} alt="" />
      </div>

      <ul className={`colors-dropdown ${showClosetMenu ? 'activedropdown' : ''}`}>
        {closets.data.getClosets.map((closetItem: any) => (
          <li className={`li-wrapper ${selectedCloset === closetItem.id ? 'active' : ''}`}
            key={closetItem.id} onClick={() => handleClosetSelect(closetItem.id)}>{closetItem.name}
          </li>))}
      </ul>
      {/* CLOSET DROPDOWN */}

      </div>
      <button className='register-button' type="submit">Add Item</button>
    </form>}
  </div>
)
}

export default ItemForm