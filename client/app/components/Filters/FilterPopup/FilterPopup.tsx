import './filterpopup.css';
import OccasionsFilter from '../OccasionsFilter/OccasionsFilter';
import SeasonsFilter from '../SeasonsFilter/SeasonsFilter';
import BrandsFilter from '../BrandsFilter/BrandsFilter';

function FilterPopup({toggleFilters}: any) {
  return (
    <div className="FilterPopup">
      <div className={`general-filters-container ${toggleFilters ? 'popup-active' : ''}`}>
        <div className='filters-popup'>
          <h3>Filter</h3>
          <SeasonsFilter/>
          <BrandsFilter/>
        </div>
      </div>
    </div>
  )
}

export default FilterPopup