import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar-admin/Sidebar'

import MenuMensagem from '../../chat/MenuMensagem'
import Detalhe from '../../chat/Detalhe'
import CorpoChat from '../../chat/CorpoChat'


const HomeAdmin = () => {
  return (
    <div className="flex w-[76%]">
      <MenuMensagem />
      <CorpoChat />
      <Detalhe />
    </div>
  );
}

export default HomeAdmin