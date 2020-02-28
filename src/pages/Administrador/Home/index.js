import React from 'react';

import './styles.css';

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';

const Home = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h3 className="page-path">Administrador - Home</h3>
        <div className="wrapper-home">
          <div className="home-boxs">
            <div className="box">
              <h2>Total de consultas</h2>
              <p>10</p>
            </div>
            <div className="box">
              <h2>Total de atendentes</h2>
              <p>5</p>
            </div>
            <div className="box">
              <h2>Total de médicos</h2>
              <p>15</p>
            </div>
            <div className="box">
              <h2>Total em caixa</h2>
              <p>20.000</p>
            </div>
            <div className="box">
              <h2>Contas à pagar</h2>
              <p>8</p>
            </div>
            <div className="box">
              <h2>Contas a receber</h2>
              <p>4</p>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Home;
