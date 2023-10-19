import './itemdetails.css';
import React, { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import { queryItemById } from '@/app/services/apiGraphQL';
import { editItem, deleteItem } from '@/app/services/apiItem';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import GoBack from '../../GoBack/GoBack';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import trashIcon from '../../../../public/icon-delete.svg';

function ItemDetails() {
  const { user } = useAuth();
  const { handleSubmit } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [item, setItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    location: '',
    closet: '',
  });
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);

  // Check if item is from current user visitor to show or not form

  useEffect(() => {
  
      (async () => {
        try {
          const itemData = await queryItemById(user?.id!, id);
          setItem(itemData?.data?.getItemById);


          setFormData({
            location: itemData?.data?.getItemById?.location || '',
            closet: itemData?.data?.getItemById?.closet || '',
          });

        } catch (error) {
          console.error(error);
        }
      })();
  
  }, [id]);

  const handleDeleteAlert = () => {
    setVisibleDelete(!visibleDelete);
  };

  const handleDelete = () => {

    if (id) {
      deleteItem(id);
    }
    setConfirmDelete(true);
    router.push('/dashboard/grid');
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateForm = handleSubmit(async () => {
    setVisibleUpdate(true);

    if (id) {
      const updatedItem = {
        userId: user?.id!,
        itemUrl: item?.itemUrl,
        color: item?.color,
        brand: item?.brand,
        location: formData.location,
        closet: formData.closet,
      };
      console.log(updatedItem);
      await editItem(id, updatedItem);
    }
    setTimeout(() => {
      setVisibleUpdate(false);
    }, 2500);
  });




  return (
    <div className="ItemDetails">
      <GoBack />
      <div className="img-form-container">
        {item && (
          <div>
            <img src={item.itemUrl} alt="" />
            <div className="itemdetails-info">
              <div className="item-title">
                <h2>
                  {item.brand} {item.category}
                </h2>
              </div>

              <div className="input-wrapper">
                <div className="itemdetails-container">
                  <label htmlFor="occasion">Season</label>
                  <ul className="itemdetails-ul">
                    {item.season.map((s) => (
                      <li className="itemdetails-li" key={s.id}>
                        {s}
                      </li>
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
                        <div className={`colorDot ${c}`} style={{ backgroundColor: c }}></div>
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
                      <li className="itemdetails-li" key={o.id}>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

   
              <form onSubmit={updateForm} className="itemdetails-form">
                <div className="input-wrapper">
                  <div className="itemdetails-container">
                    <label htmlFor="location" id="occasionlab">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
{/* 
                <div className="input-wrapper">
                  <div className="itemdetails-container">
                    <label htmlFor="closet">Closet</label>
                    <input
                      type="text"
                      name="closet"
                      value={formData.closet}
                      onChange={handleFormChange}
                    />
                  </div>
                </div> */}

                <div className="itemdetails-actions">
                  <div className="itemdetails-delete" onClick={handleDeleteAlert}>
                    <Image src={trashIcon} alt="trash" />
                  </div>
                  <div className="itemdetails-update">
                    <button type="submit">Update item</button>
                  </div>
                </div>
                <div className="message-confirmation">
                  {visibleUpdate && (
                    <div className="update-confirm">
                      <p>Yey! Item successfully updated!</p>
                    </div>
                  )}
                  {visibleDelete && (
                    <div className="delete-secure" onClick={handleDelete}>
                      <p>
                        Sure? <span className="delete-secure-confirm">Delete item</span>
                      </p>
                    </div>
                  )}
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
