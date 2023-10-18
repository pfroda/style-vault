'use-client'
import './item.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

function Item({ url, brand, id }) {
  const router = useRouter();

  const handleItemDetails = () => {
    router.push(`/dashboard/itemdetails?id=${id}`);
  }

  return (
    <div className="item" onClick={handleItemDetails}>
      <img className="image" src={url} alt="" />
      <div className="brand">{brand}</div>
    </div>
  )
}

export default Item