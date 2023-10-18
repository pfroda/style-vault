import { Outfit } from '../Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { postOutfit, editOutfit, deleteOutfit } from '../services/apiOutfit';
import { addOutfit, removeOutfit, updateOutfit } from '@/app/GlobalRedux/Features/outfit/outfitSlice';

function useOutfit() {
  const outfit = useSelector((state: RootState) => state.outfit.outfits);
  const dispatch = useDispatch();

  const handlePostOutfit = async ({ 
    outfit, 
    closetId
  }: { outfit: Outfit, closetId: string }) => {
    const res = await postOutfit(outfit, closetId);
    if (res) {
      dispatch(addOutfit(res));
    }
  }

  const handleEditOutfit = async (id: string, outfit: Outfit) => {
    const res = await editOutfit(id, outfit);
    if (res) {
      dispatch(updateOutfit(res));
    }
  }

  const handleDeleteOutfit = async (id: string) => {
    const res = await deleteOutfit(id);
    if (res) {
      dispatch(removeOutfit(res));
    }
  }

  return { outfit, handlePostOutfit, handleEditOutfit, handleDeleteOutfit };
}

export default useOutfit

