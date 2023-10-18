import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { getUserData } from '../services/apiUser';
import { setFriend } from '../GlobalRedux/Features/friend/friendSlice';

function useFriend() {
  const friend = useSelector((state: RootState) => state.friend.friend);
  const dispatch = useDispatch();


  useEffect(() => {
    // console.log(friend);
  }, [friend]);


  const handleFriendData = async (userId: string) => {
    const res = await getUserData(userId);
    if (res) {
      dispatch(setFriend(res));
    }
  }

  return { friend, handleFriendData };
}

export default useFriend

