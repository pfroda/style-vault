import './socialsearch.css';
import searchIcon from '../../../../public/search-user.png';
import userImage from '../../../../public/user.png';
import Image from 'next/image';
import { useState } from 'react';
import { queryUsersForSearch } from '@/app/services/apiGraphQL';
import { useRouter } from 'next/navigation'; 
import useAuth from '@/app/hooks/useAuth';

function SocialSearch() {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [clickedUser, setClickedUser] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  
  let searchTimeout: any;
  
  const handleInputChange = (e) => {
    const query = e.target.value;
    //delay the api call until user types more
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const searchedUsers = await queryUsersForSearch(query);
      const matchedUsers = searchedUsers?.data?.getAllUsers.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase()));
      
      const filteredResults = matchedUsers?.filter((match) => match.id !== user?.id)
      // console.log('userid:', user?.id)
      // console.log('matched users:', matchedUsers);
      // console.log('filtered results;', filteredResults);

      if (filteredResults) setSearchResults(filteredResults);

    } catch (error) {
      console.log(error);
    }
  };

  const handleResultClick = (user) => {
    console.log('clicked mf');
    console.log(user);
    setClickedUser(user);
    router.push(`/dashboard/socialprofile?user=${user?.username}`)
  }

  return (
    <div className='SocialSearch'>
      <div className="social-header-container">
        <Image src={searchIcon} alt="search" className='search-user' />
        <input
          type="text"
          placeholder='Search user...'
          onChange={handleInputChange}
        />
      </div>
      <div className="social-results">
        {searchResults.length > 0 && (
          searchResults.map((user) => (
            <div className="user-result" key={user.id} onClick={()=> handleResultClick(user)}>
              <Image
                alt="profile"
                src={user.profilePicture || userImage}
                className='profile-image'
                width={100}
                height={100}
              />
              <div className="profile-username">@{user.username || 'Unknown'}</div>
            </div>
          )).slice(0,4)
        )}
      </div>
    </div>
  );
}

export default SocialSearch;
