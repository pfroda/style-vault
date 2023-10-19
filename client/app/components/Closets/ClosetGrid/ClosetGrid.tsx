import './closetgrid.css'
import ItemContainer from '../../Lists/ItemContainer/ItemContainer';
import OutfitContainer from '../../Lists/OutfitContainer/OutfitContainer';
import ItemHeader from '../../Lists/ItemHeader/ItemHeader';
import Footer from '../../Footer/Footer';
import SearchBar from '../../Filters/Searchbar/SearchBar';
import Filters from '../../Filters/CategoryFilter/CategoryFilter';
import FilterPopup from '../../Filters/FilterPopup/FilterPopup';
import { Item, Outfit } from '../../../Interfaces';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import useFriend from '@/app/hooks/useFriend';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { queryItemsByCloset, queryOutfitsByCloset } from '@/app/services/apiGraphQL';

function ClosetGrid() {
  const selectedCloset = useSelector((state) => state.closet.selectedCloset);

  const selectedCategory = useSelector((state) => state.filter.category);
  const selectedSeason = useSelector((state) => state.filter.season);
  const selectedBrands = useSelector((state) => state.filter.brand);
  const selectedOccasion = useSelector((state) => state.filter.occasion);
  const selectedLocation = useSelector((state) => state.filter.location);
  const selectedColor = useSelector((state) => state.filter.color)

  const searchParams = useSearchParams();
  
  // not necessary here since its always the last selected closet
//   const friendUsername = searchParams.get('friend');

  const [closetItems, setClosetItems] = useState<Item[]>([]);
  const [closetOutfits, setClosetOutfits ] = useState<Outfit[]>([]);

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
    } else if (buttonId === 'outfit') {
      setActiveItems('filteredOutfits');
    }
  };

  useEffect(() => {

    const fetchItemsAndOutfitsByCloset = async () => {
      
      try {

          const  resItems = await queryItemsByCloset(selectedCloset.id);

          setClosetItems(resItems.data?.getItemsByCloset || []);

          const resOutfits = await queryOutfitsByCloset(selectedCloset.id);
          setClosetOutfits(resOutfits.data?.getOutfitsByCloset || []);

      } catch (error) {
        console.log(error);
      }
    };

    fetchItemsAndOutfitsByCloset();

  }, [user?.id, friend?.id, selectedCategory, selectedBrands, selectedSeason, selectedOccasion, selectedLocation, selectedColor]); 

  const filteredItems = selectedCategory === 'All'
    ? closetItems.map((item) => ({
      url: item.itemUrl,
      brand: item.brand,
      id: item.id
    }))
    : closetItems
      .filter(item => item.category === selectedCategory)
      .map((item) => ({
        url: item.itemUrl,
        brand: item.brand,
        id: item.id
      }))

  
  const headers = {
    closet: 'Items',
    outfit: 'Outfits'
  };

  return (

      <>
      <div className='Grid'>
        <ItemHeader closetName={selectedCloset.name} headers={headers} onHeaderClick={handleHeaderClick} />
        {activeItems === 'filteredItems' ? (
          <>
            <SearchBar toggleFilters={toggleFilters} />
            <Filters />
            <ItemContainer items={filteredItems} />
            <FilterPopup toggleFilters={toggleFilters} displayFilters={displayFilters} />
          </>
        ) : (
          <OutfitContainer outfits={closetOutfits} />
        )}
        <Footer />
      </div>
    </>
  );
}

export default ClosetGrid;