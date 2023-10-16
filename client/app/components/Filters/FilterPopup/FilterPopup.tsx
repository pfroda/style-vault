import './filterpopup.css';
import OccasionsFilter from '../OccasionsFilter/OccasionsFilter';
import SeasonsFilter from '../SeasonsFilter/SeasonsFilter';
import BrandsFilter from '../BrandsFilter/BrandsFilter';
import LocationsFilter from '../LocationsFilter/LocationsFilter';
import ColorFilter from '../ColorFilter/ColorFilter';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/app/GlobalRedux/Features/filter/filterSlice';

function FilterPopup({displayFilters, toggleFilters}: any) {
  const dispatch = useDispatch();

  const handleResetFilters = () => {
    console.log('reset like a mf');
    dispatch(resetFilters())
    
  }

  return (
    <div className="FilterPopup">
      <div className={`general-filters-container ${displayFilters ? 'popup-active' : ''}`}>
        <div className='filters-popup'>
          <p onClick={toggleFilters}>X</p>
          <h3>Filter</h3>
          <SeasonsFilter/>
          <BrandsFilter/>
          <OccasionsFilter/>
          <LocationsFilter/>
          <ColorFilter/>
          <div className="info-popup">
            <p onClick={handleResetFilters}>Clear filters</p>
            <button onClick={toggleFilters}>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPopup