import './filterpopup.css';


function FilterPopup({toggleFilters}: any) {
  return (
    <div className={`general-filters-container ${toggleFilters ? 'popup-active' : ''}`}>
      
      <div className='filters-popup'>
        <h3>Filter</h3>
      </div>
    </div>
  )
}

export default FilterPopup