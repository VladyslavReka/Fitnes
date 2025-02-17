import React from 'react'
import Navbar from './Common/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = ({ children }) => {
  return (
      <React.Fragment>
          <div className='container mx-auto'>
              <Navbar />
              <Outlet />
          </div>
      </React.Fragment>
  )
}