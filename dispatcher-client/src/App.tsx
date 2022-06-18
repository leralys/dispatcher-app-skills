import React, { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { getIPAddress } from './store/slices/locationSlice';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIPAddress());
  }, [dispatch]);
  return <Dashboard />;
};

export default App;
