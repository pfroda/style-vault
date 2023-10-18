import { Closet } from '../Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { postCloset, editCloset, deleteCloset } from '../services/apiCloset';
import { addCloset, removeCloset, updateCloset } from '@/app/GlobalRedux/Features/closet/closetSlice';

function useCloset() {
  const closet = useSelector((state: RootState) => state.closet.closets);
  const dispatch = useDispatch();

  const handlePostCloset = async (closet: Closet) => {
    const res = await postCloset(closet);
    if (res) {
      console.log('whaterver')
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

  return { closet, handlePostCloset, handleEditCloset, handleDeleteCloset };
}

export default useCloset

