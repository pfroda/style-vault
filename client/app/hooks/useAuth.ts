import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { LoginUser, RegisterUser } from '@/app/Interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { registerUser, loginUser } from '../services/apiUser';
import {
  //setLoading, 
  //setError, 
  setUser 
} from '@/app/GlobalRedux/Features/user/authSlice';

function useAuth() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleRegister = async (user: RegisterUser) => {
    //dispatch(setLoading(true));

    const res = await registerUser(user);
    if (res) {
      dispatch(setUser(res));
      setCookie('token', res.accessToken);
    }
    //else dispatch(setError('Error registering!'));

    // dispatch(setLoading(false));
  }

  const handleLogin = async (user: LoginUser) => {
    const res = await loginUser(user);
    if (res) {
      dispatch(setUser(res));
      setCookie('token', res.accessToken);
    }
  }

  return { user, handleRegister, handleLogin };
}

export default useAuth

