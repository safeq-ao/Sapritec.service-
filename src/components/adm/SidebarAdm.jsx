import React from 'react'

const SidebarAdm = () => {
  return (
    <aside className="w-64 bg-white border-r shadow">
      <div className="p-4">
        <h1 className="text-xl font-bold text-blue-600">Sapritec.service</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded"
            >
              Gestão de Prestadores
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded"
            >
              Pedidos e Serviços
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded"
            >
              Relatórios e Análises
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded"
            >
              Suporte e Reclamações
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded"
            >
              Pagamentos e Transações
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded"
            >
              Configuração da Plataforma
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">
            A
          </div>
          <div>
            <p className="text-gray-700 font-medium">Administrador</p>
            <p className="text-sm text-gray-500">administrador@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidebarAdm