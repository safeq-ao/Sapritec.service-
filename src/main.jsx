import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { register } from "swiper/element/bundle";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Pesquisar from './components/pesquisar-servicos/PesquisarServices.jsx'
import Home from './Home.jsx'

const router=createBrowserRouter([
  {
    element:<App/>,
    children:[
        { 
    path:'/',
    element:<Home/>
      },
       {
    path:'/pesquisar',
    element:<Pesquisar/>
      },
    ]
  } 
 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
