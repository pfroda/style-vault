'use client'
import './itemform.css'
import { useForm } from 'react-hook-form';

function ItemFrom() {
  const { register, handleSubmit } = useForm();

  const submitForm = handleSubmit(() => {
    console.log('clicked')
    // router.push('/home');
  });
  
  return (
    <div className='ItemForm'>
      <div className="img-form-container">
        <img className="img-form" src="#" alt="" />
      </div>
      <form onSubmit={submitForm} className='item-form'>
        <div className='input-container'>
          <div className='input-wrapper'>
            <div className='label-container'>
              <img src="#" alt="Icono" />
              <label htmlFor="categories">Categories</label>
            </div>
            <input id="categories" className='item-input' type="text" {...register("categories", { required: true })} placeholder='Categories' />
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
      </form>
    </div>
  )
}

export default ItemFrom