import React from 'react'

const MainContentAdm = () => {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Prestadores</h2>

      {/* Informações Gerais */}
      <section className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-4">Informações gerais</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome da empresa
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value="LogTrans Soluções"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value="Out 13, 2022"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Localização
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value="Kilamba"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              readOnly
            >
              A Innovatech está em busca de uma empresa para desenvolver um
              aplicativo móvel personalizado para gestão de projetos internos.
            </textarea>
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <section className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Pagamento</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de pagamento
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" className="form-radio" />
                <span>Transferência bancária</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" className="form-radio" />
                <span>Dinheiro em espécie</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Banco
              </label>
              <select className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Banco de Poupança e Crédito</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de conta
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value="123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Moeda
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value="ADA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Código de transferência
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value="123/1000/521"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainContentAdm