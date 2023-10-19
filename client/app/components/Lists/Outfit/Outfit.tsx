'use-client'
import './outfit.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';

function Outfit({ id, name, url }) {
  const router = useRouter();

  useEffect(() => {
    console.log('url', url)
    console.log('id', id)
    console.log('name', name)
  })
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