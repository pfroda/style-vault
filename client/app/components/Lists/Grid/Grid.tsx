import ItemContainer from '../ItemContainer/ItemContainer';
import ItemHeader from '../ItemHeader/ItemHeader';
import Footer from '../../Footer/Footer';
import SearchBar from '../../Searchbar/SearchBar';
import Filters from '../../Filters/Filters';
import { queryItems } from '@/app/services/apiGraphQL';
import { Item } from '../../../Interfaces';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';

function Grid() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const  res = await queryItems(user?.id!);
        // if (errors) {
        //   setError('Error fetching items.');
        //   return;
        // }
        // setItems(data?.getItems || []);
        console.log(res)
        console.log('lo que queremos:', res.data?.getItems)
        setItems(res.data?.getItems || []);

      } catch (error) {
        setError('Network error.');
      }
    };
    
    fetchItems();
  }, [user?.id]); 


  // const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';

  // const itemCount = 7;

  // const items = Array.from({ length: itemCount }, (_, index) => ({
  //   id: index + 1,
  //   url: myUrl,
  //   brand: `Marca ${index + 1}`,
  // }));

  const honduras = 'Puta espanya!'

  return (
    <>
      <ItemHeader closetName={honduras} />
      <SearchBar/>
      <Filters/>
      <ItemContainer items={
         items.map((item) => ({
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