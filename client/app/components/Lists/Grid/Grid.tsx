import './grid.css'
import ItemContainer from '../ItemContainer/ItemContainer';
import ItemHeader from '../ItemHeader/ItemHeader';
import Footer from '../../Footer/Footer';
import SearchBar from '../../Filters/Searchbar/SearchBar';
import Filters from '../../Filters/CategoryFilter/CategoryFilter';
import FilterPopup from '../../Filters/FilterPopup/FilterPopup';
import { queryItems } from '@/app/services/apiGraphQL';
import { Item } from '../../../Interfaces';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Grid() {
  const selectedFilter = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useAuth();
  const [displayFilters, setDisplayFilters] = useState(false);

  const toggleFilters = () => {
    console.log('changed:', displayFilters)
    setDisplayFilters(!displayFilters);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const  res = await queryItems({userId: user?.id!});
        console.log('queremos all items:', res.data?.getItems)
        setItems(res.data?.getItems || []);
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(setSelectedFilter('All'))
    fetchItems();
  }, [user?.id]); 

  const honduras = 'Puta espanya!';
  const filteredItems = selectedFilter === 'All'
    ? items.map((item) => ({
      url: item.itemUrl,
      brand: item.brand
    }))
    : items
      .filter(item => item.category === selectedFilter)
      .map((item) => ({
        url: item.itemUrl,
        brand: item.brand
      }))

  return (
    <div className='Grid'>
      <ItemHeader closetName={honduras} />
      <SearchBar toggleFilters={toggleFilters}/>
      <Filters/>
      <ItemContainer items={filteredItems} />
      <FilterPopup toggleFilters={displayFilters}/>
      <Footer />
    </div>
  );
}

export default Grid;