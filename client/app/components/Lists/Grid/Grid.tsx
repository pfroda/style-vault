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
import { useSelector, useDispatch } from 'react-redux';

function Grid() {
  const selectedCategory = useSelector((state) => state.filter.category);
  const selectedSeason = useSelector((state) => state.filter.season);
  const selectedBrands = useSelector((state) => state.filter.brand);
  const selectedOccasion = useSelector((state) => state.filter.occasion);
  const selectedLocation = useSelector((state) => state.filter.location);
  const selectedColor = useSelector((state) => state.filter.color)

  const dispatch = useDispatch();
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useAuth();
  const [displayFilters, setDisplayFilters] = useState(false);
  const [activeItems, setActiveItems] = useState('filteredItems');

  const toggleFilters = () => {
    setDisplayFilters(!displayFilters);
  };

  const handleHeaderClick = (buttonId: string) => {
    if (buttonId === 'closet') {
      setActiveItems('filteredItems');
    } else if (buttonId === 'outfits') {
      setActiveItems('outfitItems');
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const  res = await queryItems({
          userId: user?.id!,
          category: selectedCategory,
          season: selectedSeason,
          brand: selectedBrands,
          occasion: selectedOccasion,
          location: selectedLocation,
          color: selectedColor
        });
        console.log('GraphQL res Grid:', res);
        setItems(res.data?.getItems || []);
      } catch (error) {
        console.log(error);
      }
    };
    // dispatch(setSelectedFilter({ type: 'category', value: 'All' }))
    // console.log('selectedFilterCat', selectedCategory)
    fetchItems();
  }, [user?.id, selectedCategory, selectedBrands, selectedSeason, selectedOccasion, selectedLocation, selectedColor]); 

  const filteredItems = selectedCategory === 'All'
    ? items.map((item) => ({
      url: item.itemUrl,
      brand: item.brand,
      id: item.id
    }))
    : items
      .filter(item => item.category === selectedCategory)
      .map((item) => ({
        url: item.itemUrl,
        brand: item.brand,
        id: item.id
      }))

  // Esto hay que pasarlo como parametros. Dejar de momento
  const itemCount = 7;
  const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  const outfitItems = Array.from({ length: itemCount }, (_, index) => ({
  id: index + 1,
  url: myUrl,
  brand: `Marca ${index + 1}`,
  }));
  const honduras = 'Puta espanya!';
  // Esto hay que pasarlo como parametros. Dejar de momento
  const headers = {
    closet: 'Closet',
    outfit: 'Outfit'
  };

  return (
    <div className='Grid'>
      <ItemHeader closetName={honduras} headers={headers} onHeaderClick={handleHeaderClick} />
      <SearchBar toggleFilters={toggleFilters}/>
      <Filters/>
      <ItemContainer items={filteredItems} />
      <FilterPopup toggleFilters={toggleFilters} displayFilters={displayFilters}/>
      <Footer />
    </div>
  );
}

export default Grid;