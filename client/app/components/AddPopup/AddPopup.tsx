import './addpopup.css';
import { useRouter } from 'next/navigation'; 

function AddPopup() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard/itemform');
  }

  return (
    <div className='add-container'>
      <button>Add Outfit</button>
      <button onClick={handleClick}>Add Item</button>
    </div>
  )
}

export default AddPopup