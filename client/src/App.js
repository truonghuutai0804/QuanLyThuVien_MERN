
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './containers/layout/Main';
import Home from './containers/views/Main/Home';
import Login from './containers/views/Main/Login';
import Borrow from './containers/views/Admin/Borrow';
import Admin from './containers/layout/Admin';
import Book from './containers/views/Admin/Book';
import User from './containers/views/Admin/User';
import Staff from './containers/views/Admin/Staff';
import Author from './containers/views/Admin/Author';
import Category from './containers/views/Admin/Category';
import Publisher from './containers/views/Admin/Publisher';
import Account from './containers/views/Admin/Account';
import Violate from './containers/views/Admin/Violate';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />}>
          <Route index element={<Borrow />} />
          <Route path='books' element={<Book />} />
          <Route path='users' element={<User />} />
          <Route path='staffs' element={<Staff />} />
          <Route path='authors' element={<Author />} />
          <Route path='categories' element={<Category />} />
          <Route path='publishers' element={<Publisher />} />
          <Route path='accounts' element={<Account />} />
          <Route path='violates' element={<Violate />} />
        </Route>
        <Route path='/' element={<Main />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
