import './itemdetails.css';
import { queryItemById } from '@/app/services/apiGraphQL';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import useItems from '@/app/hooks/useItem';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import GoBack from '../../GoBack/GoBack';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import trashIcon from '../../../../public/icon-delete.svg'
import { editItem, deleteItem } from '@/app/services/apiItem';

function ItemDetails() {
  const { user } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const { handleEditItem } = useItems();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [item, setItem] = useState<any>(null);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false);

//   const occasionsData = ["Lounge", "Active", "Work", "Formal", "Night", "Day", "Semi-Formal"];
//   const seasonsData = ["Winter", "Spring", "Summer", "Autumn"];
//   const categoriesData = ["Pants", "Tops", "Shirts", "Shoes", "Boots", "Bags", "Accessories", "Sandals", "Sneakers", "Heels", "Outerwear", "Dress", "Shorts", "One-Piece"];

  useEffect(() => {
    if (id) {
        queryItemById(user?.id!, id).then((itemData) => {
            setItem(itemData?.data?.getItemById);
            console.log(itemData.data.getItemById);
            setValue('location', item.location);
            setValue('closet', item.closet);
      });
    }
  }, [id]);

  const handleDeleteAlert = () => {
    setVisibleDelete(!visibleDelete);
  }

  const handleDelete = () => {
    console.log('deleting item');
    if (id) {
        deleteItem(id);
    }
    setConfirmDelete(true);
    router.push('/dashboard/grid');
  }

  const updateForm = handleSubmit(async (formData) => {
    // e.preventDefault();
    console.log('updating form');
    setVisibleUpdate(true);

    if (id) {
        const updatedItem = {
            userId: user?.id!,
            itemUrl: item?.itemUrl,
            color: item?.color,
            brand: item?.brand,
            location: formData.location,
            closet: formData.closet
        };
        console.log(updatedItem)
        await editItem(id, updatedItem)
    }
    setTimeout(() => {
        setVisibleUpdate(false);
      }, 2500);
  })

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
                        <label htmlFor="occasion" >Occasion</label>
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
                        <label htmlFor="location" id="occasionlab">Location</label>
                        <input type="text"
                        {...register('location')}
                        defaultValue={item?.location}/>
                    </div>
                </div>

                <div className="input-wrapper">
                    <div className="itemdetails-container">
                        <label htmlFor="closet">Closet</label>
                        <input type="text"
                        {...register('closet')}
                        defaultValue={item.closet}/>
                    </div>
                </div>

                <div className="itemdetails-actions">
                    <div className="itemdetails-delete" onClick={handleDeleteAlert}>
                        {/* <p>Delete item</p> */}
                        <Image src={trashIcon} alt="trash"/>
                    </div>
                    <div className="itemdetails-update">
                        <button type="submit">Update item</button>
                    </div>
                </div>
                <div className="message-confirmation">
                        {visibleUpdate && <div className="update-confirm" ><p>Yey! Item successfully updated!</p></div>}
                        {visibleDelete && <div className="delete-secure" onClick={() => handleDelete()} ><p>Sure? <span className='delete-secure-confirm'>Delete item ></span></p></div>}

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
