import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Balances from './pages/balances/Balances';
import Categories from './pages/categories/Categories';
import NavigationDrawer from './components/NavigationDrawer';
import Incomes from './pages/incomes/Incomes';
import Withdrawals from './pages/withdrawals/Withdrawals';
import Sandbox from './Sandbox';
import { Toaster } from 'react-hot-toast';
import BottomNav from './components/BottomNav';
import Signin from './pages/login/Signin';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase/firebase';
import PageLoading from './components/PageLoading';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

function App() {

  const [, loading] = useAuthState(auth);

  return (
    <div className="App">
      {
        loading ?
          <div className='full-height'>
            <PageLoading />
          </div>
          :
          <Router>
            <Routes>
              <Route path='/signin' element={<UnprotectedRoute><Signin /></UnprotectedRoute>} />
              <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
              <Route path='/incomes' element={<ProtectedRoute><Incomes /></ProtectedRoute>} />
              <Route path='/withdrawals' element={<ProtectedRoute><Withdrawals /></ProtectedRoute>} />
              <Route path='/balances' element={<ProtectedRoute><Balances /></ProtectedRoute>} />
              {/* <Route path='/sandbox' element={<Sandbox />} /> */}
            </Routes>
            <Toaster />
            <NavigationDrawer />
            <BottomNav />
          </Router>
      }
    </div>
  );
}

export default App;
