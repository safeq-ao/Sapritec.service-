import React from 'react'
import CorpoChat from '../chat/CorpoChat'
import MenuMensagem from '../chat/MenuMensagem'
import Detalhe from '../chat/Detalhe'


export const ChatUser = () => {
  return (
    <div className='flex'>
      <MenuMensagem />
      <CorpoChat />
      <Detalhe />
    </div>
  );
}
