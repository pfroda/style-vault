import './addpopup.css';
import { useRouter } from 'next/navigation'; 

function AddPopup({ isPopupVisible }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard/itemform');
  }

  return (
    <div className={`add-container ${isPopupVisible ? 'popup-active' : ''}`}>
      <button>Add Outfit</button>
      <button onClick={handleClick}>Add Item</button>
    </div>
  )
}

export default AddPopup