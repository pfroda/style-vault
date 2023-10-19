import './closetgrid.css'
import ItemContainer from '../../Lists/ItemContainer/ItemContainer';
import OutfitContainer from '../../Lists/OutfitContainer/OutfitContainer';
import ItemHeader from '../../Lists/ItemHeader/ItemHeader';
import Footer from '../../Footer/Footer';
import SearchBar from '../../Filters/Searchbar/SearchBar';
import Filters from '../../Filters/CategoryFilter/CategoryFilter';
import FilterPopup from '../../Filters/FilterPopup/FilterPopup';
import { queryItems, queryOutfits } from '@/app/services/apiGraphQL';
import { Item, Outfit } from '../../../Interfaces';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import useFriend from '@/app/hooks/useFriend';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { queryItemsByCloset, queryOutfitsByCloset } from '@/app/services/apiGraphQL';


function ClosetGrid() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.filter.category);
  const selectedSeason = useSelector((state) => state.filter.season);
  const selectedBrands = useSelector((state) => state.filter.brand);
  const selectedOccasion = useSelector((state) => state.filter.occasion);
  const selectedLocation = useSelector((state) => state.filter.location);
  const selectedColor = useSelector((state) => state.filter.color)

  const searchParams = useSearchParams();
  const friendUsername = searchParams.get('friend');

  const [items, setItems] = useState<Item[]>([]);
  const [outfits, setOutfits ] = useState<Outfit[]>([]);

  const { user } = useAuth();
  const { friend } = useFriend(); 
  const [displayFilters, setDisplayFilters] = useState(false);
  const [activeItems, setActiveItems] = useState('filteredItems');

  const toggleFilters = () => {
    setDisplayFilters(!displayFilters);
  };

  const handleHeaderClick = (buttonId: string) => {
    if (buttonId === 'closet') {
      setActiveItems('filteredItems');
      console.log('closet changing')
    } else if (buttonId === 'outfit') {
      setActiveItems('filteredOutfits');
      console.log('outfit changing');
    }
  };

  useEffect(() => {
    const fetchItemsAndOutfitsByCloset = async () => {
      
      try {

        if (friendUsername) {

          const  resItems = await queryItemsByCloset({
            userId: friend?.id!,
            category: selectedCategory,
            season: selectedSeason,
            brand: selectedBrands,
            occasion: selectedOccasion,
            location: selectedLocation,
            color: selectedColor
          });

          setItems(resItems.data?.getItems || []);

          const resOutfits = await queryOutfits(friend?.id!);
          setOutfits(resOutfits.data?.getOutfits || []);

        } else {
          const  resItems = await queryItems({
            userId: user?.id!,
            category: selectedCategory,
            season: selectedSeason,
            brand: selectedBrands,
            occasion: selectedOccasion,
            location: selectedLocation,
            color: selectedColor
          });

          setItems(resItems.data?.getItems || []);

          const resOutfits = await queryOutfits(user?.id!);
          setOutfits(resOutfits.data?.getOutfits || []);
          console.log('HERE ARE THE OUTFITS', resOutfits)

        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchItemsAndOutfitsByCloset();
  }, [user?.id, friend?.id, selectedCategory, selectedBrands, selectedSeason, selectedOccasion, selectedLocation, selectedColor]); 

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
  const closetName = 'ClosetName';
  
  const headers = {
    closet: 'Items',
    outfit: 'Outfits'
  };

  return (
    <>
      <div className='Grid'>
        <ItemHeader closetName={closetName} headers={headers} onHeaderClick={handleHeaderClick} />
        {activeItems === 'filteredItems' ? (
          <>
            <SearchBar toggleFilters={toggleFilters} />
            <Filters />
            <ItemContainer items={filteredItems} />
            <FilterPopup toggleFilters={toggleFilters} displayFilters={displayFilters} />
          </>
        ) : (
          <OutfitContainer outfits={outfits} />
        )}
        <Footer />
      </div>
    </>
  );
}

export default ClosetGrid;