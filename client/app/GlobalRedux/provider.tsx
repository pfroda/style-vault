'use client'

import { Provider } from 'react-redux';
// import { Store } from '@reduxjs/toolkit';
import { store } from './store';


function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Providers