import { Item } from '@/app/Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { postItem, editItem, deleteItem } from '../services/apiItem';
import { addItem, removeItem, updateItem } from '@/app/GlobalRedux/Features/item/itemSlice';

function useItems() {
  const item = useSelector((state: RootState) => state.item.items);
  const dispatch = useDispatch();

  const handlePostItem = async ({
    item,
    closetId
  }:{ item: Item, closetId: string} ) => {
    const res = await postItem(item, closetId);
    if (res) {
      dispatch(addItem(res));
    }
  }

  const handleEditItem = async (id: string, item: Item) => {
    const res = await editItem(id, item);
    if (res) {
      dispatch(updateItem(res));
    }
  }

  const handleDeleteItem = async (id: string) => {
    const res = await deleteItem(id);
    if (res) {
      dispatch(removeItem(res));
    }
  }

  return { item, handlePostItem, handleEditItem, handleDeleteItem };
}

export default useItems

