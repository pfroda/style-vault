import './searchbar.css';
import { useState } from "react";
import searchbar from './searchbar.png';
import Image from 'next/image';

function SearchBar() {
  
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(event:any) {
      setInputValue(event.target.value);
    }
  
    return (
      <div className="Searchbar">
        <label>
          <Image src={searchbar} className='searchbar-icon' alt='foto' />
          {/* logo */}
          <input 
            className='searchbar-input' 
            type="text" 
            name="name" 
            placeholder='Search by label, color, brand...' 
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
      </div>
    )
  }

export default SearchBar