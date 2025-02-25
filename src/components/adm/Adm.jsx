import React from 'react'
import MainContentAdm from '../../adm/MainContentAdm';
import SidebarAdm from './SidebarAdm';
import { Outlet } from 'react-router-dom';

const Adm = () => {
return (
  <div className="flex h-screen bg-gray-100">
  
  <SidebarAdm/>
   <Outlet/>
  </div>
);
}

export default Adm