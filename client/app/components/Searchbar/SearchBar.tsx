import './searchbar.css';
import searchbar from './search-icon.svg';
import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '@/app/GlobalRedux/Features/filter/filterSlice';
import { queryItems } from '@/app/services/apiGraphQL';

function SearchBar() {
  const selectedFilter = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const res = await queryItems(user?.id!);
  //       console.log('searchbar query res:', res)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchItems()
  // }, [user?.id])

  function handleInputChange(event:any) {
    console.log('event: ', event.target.value)
    setSearchQuery(event.target.value);
    // console.log(searchQuery)
  }

  function handleResultClick(result) {

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
            placeholder='Search by brand, occasion, color...' 
            value={searchQuery}
            onChange={handleInputChange}/>
          {searchResults.length > 0 && (
            <div className='dropdown'>
              {searchResults.map((result) => (
                <div
                 key={result}
                 onClick={() => handleResultClick(result)}
                 className='dropbown-option'>
                  {result}
                </div>
              ))}
            </div>
          )}
        </label>
      </div>
    )
  }

export default SearchBar