import './addpopup.css';
import { useRouter } from 'next/navigation'; 

function AddPopup({ isPopupVisible }) {
  const router = useRouter();

  const handleAddItem = () => {
    router.push('/dashboard/itemform');
  }

  const handleAddOutfit = () => {
    router.push('/dashboard/outfitform');
  }

  return (
    <div className={`add-container ${isPopupVisible ? 'popup-active' : ''}`}>
      <button onClick={handleAddOutfit}>Add Outfit</button>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
}

export default AddPopup