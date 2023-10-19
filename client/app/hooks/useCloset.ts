import { Closet } from '../Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { queryClosets } from '@/app/services/apiGraphQL';
import { postCloset, editCloset, deleteCloset } from '../services/apiCloset';
import { addCloset, removeCloset, updateCloset, setClosetState } from '@/app/GlobalRedux/Features/closet/closetSlice';

function useCloset() {
  const closet = useSelector((state: RootState) => state.closet.closets);
  const dispatch = useDispatch();

  const loadClosets = async (userId: string) => {
    try {
      const res = await queryClosets(userId);
      dispatch(setClosetState(res.data?.getClosets || []));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostCloset = async (closet: Closet) => {
    const res = await postCloset(closet);
    if (res) {
      dispatch(addCloset(res));
    }
  }

  const handleEditCloset = async (id: string, closet: Closet) => {
    const res = await editCloset(id, closet);
    if (res) {
      dispatch(updateCloset(res));
    }
  }

  const handleDeleteCloset = async (id: string) => {
    const res = await deleteCloset(id);
    if (res) {
      dispatch(removeCloset(res));
    }
  }

  return { closet, loadClosets, handlePostCloset, handleEditCloset, handleDeleteCloset };
}

export default useCloset

