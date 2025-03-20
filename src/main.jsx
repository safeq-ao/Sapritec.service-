import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { register } from "swiper/element/bundle";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Pesquisar from "./components/pesquisar-servicos/PesquisarServices.jsx";
import Home from "./Home.jsx";
import { ChatUser } from "./components/tela-chat-usuario/ChatUser.jsx";
import Context from "./utils/context/autentication.jsx";
import ThemeProvider from "./utils/context/themeContext.jsx";
import Resumo from "./components/prestadora/resumo-pedidos/Resumo.jsx";
import Pedidos from "./components/prestadora/pedidos-recebidos/Pedidos.jsx";
import Pagamentos from "./components/prestadora/pagamentos-transacoes/Pagamentos.jsx";
import Historico from "./components/prestadora/historico-pedidos/Historico.jsx";
import Dashboard from "./components/prestadora/dashboard/Dashboard.jsx";
import Cadastrar from "./components/login/Cadastrar.jsx";
import Login from "./components/login/Login.jsx";
import ForgotPassword from "./components/login/ForgotPassword.jsx";
import VerifyEmail from "./components/login/VerifyEmail.jsx";
import RedifinePassword from "./components/login/RedifinePassword.jsx";
import PasswordChanged from "./components/login/PasswordChanged.jsx";
import SidebarAdm from "./components/adm/SidebarAdm.jsx";
import SizeContext from "./utils/context/sizes.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { EscolherUser } from "./components/login/EscolherUser.jsx";
import TelaPrincipal from "./components/tela-principal/TelaPrincipal.jsx";
import Mensagem from "./components/prestadora/mensagem-prestadora/Mensagem.jsx";
import HomePrestadora from "./components/prestadora/tela-principal-prestadora/HomePrestadora.jsx";
import Error404 from "./components/error/Error404.jsx";
import Favoritos from "./components/favoritos/Favoritos.jsx";
import AdicionarServico from "./components/prestadora/adicionar-servico/AdicionarServico.jsx";

// Get the client id from environment variables
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleWrapper = () => (
  <GoogleOAuthProvider clientId={googleClientId}>
    <Login />
  </GoogleOAuthProvider>
);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: "/",
        element: <EscolherUser />,
      },
      {
        path: "cadastrar",
        element: <Cadastrar />,
      },
      {
        path: "login",
        element: <GoogleWrapper />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify",
        element: <VerifyEmail />,
      },
      {
        path: "redifine",
        element: <RedifinePassword />,
      },
      {
        path: "password-checked",
        element: <PasswordChanged />,
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "",
            element: <TelaPrincipal />,
          },
          {
            path: "pesquisar",
            element: <Pesquisar />,
          },
          {
            path: "chat",
            element: <ChatUser />,
          },
          {
            path: "favoritos",
            element: <Favoritos />,
          },
        ],
      },
      {
        path: "prestadora",
        element: <HomePrestadora />,
        children: [
          {
            path: "historico",
            element: <Historico />,
          },
          {
            path: "resumo",
            element: <Resumo />,
          },
          {
            path: "recebidos",
            element: <Pedidos />,
          },
          {
            path: "pagamentos",
            element: <Pagamentos />,
          },
          {
            path: "mensagem",
            element: <Mensagem />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "adicionar-servico",
            element: <AdicionarServico />,
          },
        ],
      },
      {
        path: "adm",
        element: <SidebarAdm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <Context>
          <RouterProvider router={router} />
        </Context>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
