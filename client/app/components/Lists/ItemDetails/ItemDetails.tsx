import { queryItemById } from '@/app/services/apiGraphQL';
import { Item } from '../../../Interfaces';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import Footer from '../../Footer/Footer';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function ItemDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (id) {
        queryItemById(user?.id!, id).then((itemData) => {
            setItem(itemData?.data?.getItemById);
            // console.log(itemData.data.getItemById); 
            // console.log(item.itemUrl)
      });
    }
    
  }, [id]);

  return (
    <div className='ItemDetails'>
      <div className="img-form-container">
        {item && (
          <div>
            <img src={item.itemUrl} alt="" />
            <div className='brand'>{item.brand}</div>
            {/* Render other item details here */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ItemDetails;
