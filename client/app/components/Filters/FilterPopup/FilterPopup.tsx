import './filterpopup.css';
import OccasionsFilter from '../OccasionsFilter/OccasionsFilter';
import SeasonsFilter from '../SeasonsFilter/SeasonsFilter';
import BrandsFilter from '../BrandsFilter/BrandsFilter';
import LocationsFilter from '../LocationsFilter/LocationsFilter';
import ColorFilter from '../ColorFilter/ColorFilter';
import { useDispatch, useSelector } from 'react-redux';
import { queryBrands } from "@/app/services/apiGraphQL";
import { resetFilters } from '@/app/GlobalRedux/Features/filter/filterSlice';
import useAuth from '@/app/hooks/useAuth';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import closeIcon from '../../../../public/icon-close.svg';
import closeIcon1 from '../../../../public/close.png';

function FilterPopup({displayFilters, toggleFilters}: any) {
  const [brands, setBrands] = useState<string[]>([]);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrands = async () => {
        try {
            const res = await queryBrands(user?.id!);
            setBrands(res.data?.getBrands || []);
        } catch (error) {
            console.log(error);
        }
    };
    fetchBrands();
}, [user?.id]);

  const handleResetFilters = () => {
    console.log('reset like a mf');
    dispatch(resetFilters())
    
  }

  return (
    <div className="FilterPopup">
      <div className={`general-filters-container ${displayFilters ? 'popup-active' : ''}`}>
        <div className='filters-popup'>
          <Image className='close-filter' onClick={toggleFilters} alt="close" src={closeIcon1}></Image>
          <h3>Filter</h3>
          {brands.length > 0 ? (
            <>
          <SeasonsFilter/>
          <BrandsFilter/>
          <ColorFilter/>
          <OccasionsFilter/>
          <LocationsFilter/>
          <div className="info-popup">
            <p onClick={handleResetFilters}>Clear filters</p>
            <button onClick={toggleFilters}>Done</button>
          </div>
          </>
          ) : (
            <div className="no-items">
            <h2>Oops! Nothing to see here... Add some items to start filtering your closets.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterPopup