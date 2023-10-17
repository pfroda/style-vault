import './itemdetails.css';
import { queryItemById } from '@/app/services/apiGraphQL';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import useItems from '@/app/hooks/useItem';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import GoBack from '../../GoBack/GoBack';
import Image from 'next/image';
import { Item } from '@/app/Interfaces';
import { useForm } from 'react-hook-form';
import trashIcon from '../../../../public/icon-delete.svg'


function ItemDetails() {
  const { user } = useAuth();
  const { handleEditItem } = useItems();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [item, setItem] = useState<any>(null);

  const occasionsData = ["Lounge", "Active", "Work", "Formal", "Night", "Day", "Semi-Formal"];
  const seasonsData = ["Winter", "Spring", "Summer", "Autumn"];
  const categoriesData = ["Pants", "Tops", "Shirts", "Shoes", "Boots", "Bags", "Accessories", "Sandals", "Sneakers", "Heels", "Outerwear", "Dress", "Shorts", "One-Piece"];

  useEffect(() => {
    if (id) {
        queryItemById(user?.id!, id).then((itemData) => {
            setItem(itemData?.data?.getItemById);
            console.log(itemData.data.getItemById);
            console.log('item location:', item.location)
      });
    }
  }, [id]);


  const updateForm = () => {

  }

  return (
    <div className='ItemDetails'>
        <GoBack/>
      <div className="img-form-container">
        {item && (
          <div>
            <img src={item.itemUrl} alt="" />
            <div className="itemdetails-info">
            <div className='item-title'>
            <h2>{item.brand} {item.category}</h2>
            </div>

                <div className="input-wrapper">
                    <div className="itemdetails-container">
                        <label htmlFor="occasion">Season</label>
                        <ul className="itemdetails-ul">
                        {item.season.map((s) => (
                            <li className="itemdetails-li" key={s.id}>{s}</li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="input-wrapper">
                    <div className="itemdetails-container">
                        <label htmlFor="color">Color</label>
                        <ul className="itemdetails-ul">
                        {item.color.map((c) => (
                            <li key={c.id} className="itemdetails-li">
                             <span className={`colorDot ${c.toLowerCase()}`} style={{ backgroundColor: c }}></span>
                            {c}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                <div className="input-wrapper">
                    <div className="itemdetails-container">
                        <label htmlFor="occasion">Occasion</label>
                        <ul className="itemdetails-ul">
                        {item.occasion.map((o) => (
                            <li className="itemdetails-li" key={o.id}>{o}</li>
                        ))}
                        </ul>
                    </div>
                </div>
                
                <form onSubmit={updateForm} className='itemdetails-form'>

                <div className="input-wrapper">
                    <div className="itemdetails-container">
                        <label htmlFor="location">Location</label>
                        <input type="text" defaultValue={item.location}/>
                    </div>
                </div>

                <div className="input-wrapper">
                    <div className="itemdetails-container">
                        <label htmlFor="closet">Closet</label>
                        <input type="text" defaultValue={item.closet}/>
                    </div>
                </div>

                <div className="itemdetails-actions">
                    <div className="itemdetails-delete">
                        <p>Delete item</p>
                        <Image src={trashIcon} alt="trash"/>
                    </div>
                    <div className="itemdetails-update">
                        <button type="submit">Update item</button>
                    </div>
                </div>

                </form>

            </div>

            </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;
