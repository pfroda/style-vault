import './socialsearch.css';
import searchUser from '../../../../public/search-user.png';
import userImage from '../../../../public/user.png';
import Image from 'next/image';
import { useState } from 'react';
import { queryUsersForSearch } from '@/app/services/apiGraphQL';

function SocialSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (event) => {
    const newSearch = event.target.value;
    setSearchTerm(newSearch);

    const result: any = await queryUsersForSearch(newSearch);
    console.log(result);
    console.log('filtered results', result.data.getAllUsers)
    setSearchResults(result.data.getAllUsers)
  }

  return (
    <div className='SocialSearch'>
      <div className="social-header-container">
        <Image src={searchUser} alt="" className='search-user' />
        <input
        type="text"
        placeholder='Search user...'
        value={searchTerm}
        onChange={handleSearchChange}/>
      </div>
      <div className="social-results">
      {searchResults.map((user) => (
          <div className="user-result" key={user?.id}>
            <Image alt="profile"
            src={user?.profilePicture}
            className='profile-image'
            width={100}
            height={20}/>
            <div className="profile-username">@{user?.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialSearch;