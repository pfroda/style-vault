'use-client'
import './outfit.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

function Outfit({ id, name, url }) {
  const router = useRouter();

  const handleOutfitDetails = () => {
    // router.push(`/dashboard/itemdetails?id=${id}`);
  }

  return (
    <div className="outfit" onClick={handleOutfitDetails}>
      <img className="image" src={url} alt="" />
      <div className="brand">{name}</div>
    </div>
  )
}

export default Outfit