import { useEffect } from 'react';
import { Item } from '@/app/Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { addItem } from '../services/apiItem';
import useAuth from '@/app/hooks/useAuth';
import {  setItem } from '@/app/GlobalRedux/Features/item/itemSlice';

function ItemAuth() {
  const item = useSelector((state: RootState) => state.item.item);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleItem = async (item: Item) => {
    // item.userId = user;
    const res = await addItem(item);
    if (res) {
      dispatch(setItem(res));

    }
  }

  return { item, handleItem };
}

export default ItemAuth

