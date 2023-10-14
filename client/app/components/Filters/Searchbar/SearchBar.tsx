import './searchbar.css';
import Image from 'next/image';
import searchbar from './manage-search.svg';

function SearchBar({toggleFilters}: any) {

    return (
      <div className="Searchbar">
        <label>
          <Image src={searchbar} className='searchbar-icon' alt='foto' />
          <input 
            className='searchbar-input' 
            type="text" 
            name="name" 
            placeholder='Filter by brand, occasion, color...' 
            onClick={toggleFilters}/>
        </label>
      </div>
    )
  }

export default SearchBar