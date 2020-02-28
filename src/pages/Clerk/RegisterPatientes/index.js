import React, { Component } from 'react';

import './styles.css';

import Sidebar from '../../../components/template/SideBarClerk';
import Main from '../../../components/template/Main';

//import api 
import api from '../../../services/api';

export default class RegisterPatiente extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date_birth: '',
      cpf: '',
      telephone: '',
    }
  }

  handleRegisterPatiente = async (e) => {
    e.preventDefault();

    const { name, date_birth, cpf, telephone } = this.state;
    console.log(name);

    await api.post('api/persons', {
      name,
      date_birth,
      cpf,
      telephone,
    });
    //this.props.history.push("/admin/listClerks");
  }

  render() {
    return (
      <>
        <Sidebar />
        <Main>
          <h3 className="page-path">Dashboard - Paciente</h3>
          <div className="wrapper-register">
            <div className="box-form">
              <div className="header-form">
                <h5 className="description-page">Cadastro de paciente</h5>
              </div>
              <div className="form-patientes">
                <form onSubmit={this.handleRegisterPatiente}>
                  <div className="patienteInputGroup">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={this.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="patienteInputGroup">
                    <input
                      type="text"
                      placeholder="Nascimento"
                      name="birth"
                      value={this.date_birth}
                      onChange={e => this.setState({ date_birth: e.target.value })}
                    />
                  </div>
                  <div className="patienteInputGroup">
                    <input
                      type="text"
                      placeholder="CPF"
                      value={this.cpf}
                      onChange={e => this.setState({ cpf: e.target.value })}
                    />
                  </div>
                  <div className="patienteInputGroup">
                    <input
                      type="text"
                      placeholder="Telefone"
                      value={this.telephone}
                      onChange={e => this.setState({ telephone: e.target.value })}
                    />
                  </div>
                  <div className="btnGroup">
                    <button className="btnRegister" type="submit">Cadastrar</button>
                  </div>
                  <div className="btnGroup">
                    <button className="btnCancel">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Main>
      </>
    );
  }
}
