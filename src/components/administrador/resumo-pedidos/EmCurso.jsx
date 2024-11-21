import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import "./table.css";

const EmCurso = () => {
  return (
    <section className=" bg-white p-5">
      <div className="flex flex-col">
        <span className="flex items-center justify-between">
          <h1
            className='text-[#EFB034]'
          >
            EM CURSO
          </h1>
          <IoIosArrowDown />
        </span>

        <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Localização</th>
                  <th>Data Inicial</th>
                  <th>Status</th>
                  <th>Barra de Progresso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Manutenção Preventiva de Equipamentos</td>
                  <td>Luanda, Bita</td>
                  <td>Nov 25, 2023</td>
                  <td>Progresso</td>
                  <td>
                    <div class="progress-bar"></div>
                  </td>
                </tr>
                <tr>
                  <td>Avaliação e Reforma Estrutural</td>
                  <td>Luanda, Bita</td>
                  <td>Nov 25, 2023</td>
                  <td>Progresso</td>
                  <td>
                    <div class="progress-bar"></div>
                  </td>
                </tr>
                <tr>
                  <td>Avaliação e Reforma Estrutural</td>
                  <td>Luanda, Bita</td>
                  <td>Nov 25, 2023</td>
                  <td>Progresso</td>
                  <td>
                    <div class="progress-bar"></div>
                  </td>
                </tr>
                <tr>
                  <td>Avaliação e Reforma Estrutural</td>
                  <td>Luanda, Bita</td>
                  <td>Nov 25, 2023</td>
                  <td>Progresso</td>
                  <td>
                    <div class="progress-bar"></div>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>

      </div>
    </section>
  );
}

export default EmCurso