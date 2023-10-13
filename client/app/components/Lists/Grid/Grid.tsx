import ItemContainer from '../ItemContainer/ItemContainer';
import ItemHeader from '../ItemHeader/ItemHeader';
import Footer from '../../Footer/Footer';
import SearchBar from '../../Searchbar/SearchBar';
import Filters from '../../Filters/Filters';
import { queryItems } from '@/app/services/apiGraphQL';
import { Item } from '../../../Interfaces';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { useSelector } from 'react-redux';

function Grid() {
  const selectedFilter = useSelector((state) => state.filter.category);
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const  res = await queryItems(user?.id!);

        console.log('lo que queremos:', res.data?.getItems)
        setItems(res.data?.getItems || []);

      } catch (error) {
        setError('Network error.');
      }
    };
    
    fetchItems();
  }, [user?.id]); 

  const honduras = 'Puta espanya!'

  return (
    <>
      <ItemHeader closetName={honduras} />
      <SearchBar/>
      <Filters/>
      <ItemContainer items={
         items.filter(item => item.category === selectedFilter).map((item) => ({
          url: item.itemUrl,
          brand: item.brand,
        }))} />
      <Footer />
    </>
  );
}

export default Grid;





// const items = [
//   { id: 1, url: myUrl, brand: 'Marca 1' },
//   { id: 2, url: myUrl, brand: 'Marca 2' },
//   { id: 3, url: myUrl, brand: 'Marca 2' },
//   { id: 4, url: myUrl, brand: 'Marca 2' },
//   { id: 5, url: myUrl, brand: 'Marca 2' },
//   { id: 6, url: myUrl, brand: 'Marca 2' },
//   { id: 7, url: myUrl, brand: 'Marca 2' },
//   { id: 8, url: myUrl, brand: 'Marca 2' },
// ];