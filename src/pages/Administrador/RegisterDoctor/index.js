import React, { Component } from 'react';

import './styles.css';

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';

//import api 
import api from '../../../services/api';

export default class RegisterClerk extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date_birth: '',
      sexo: '',
      cpf: '',
      telephone: '',
      cro: '',
      specialty: '',
      email: '',
      password: '',
      typeUser: '',
    }
  }


  handleSelectSexo = (e) => {
    this.setState({ sexo: e.target.value })
  }

  handleSelectTypeUser = (e) => {
    this.setState({ typeUser: e.target.value })
  }

  handleRegisterDoctor = async (e) => {
    e.preventDefault();

    const { name, date_birth, cpf, telephone, cro, specialty, email, password, typeUser } = this.state;

    await api.post('api/register', {
      name,
      date_birth,
      cpf,
      telephone,
      cro,
      specialty,
      email,
      password,
      fk_type_user_id: typeUser,
    })

    this.props.history.push("/admin/listDoctors");
  }

  render() {
    return (
      <>
        <Sidebar />
        <Main>
          <h3>Administrador - Cadastro de médicos</h3>
          <div className="wrapper-register">
            <div className="box-form">
              <div className="header-form">
                <h5 className="description-page">Cadastro de médicos</h5>
              </div>
              <div className="form-clerk">
                <form onSubmit={this.handleRegisterDoctor}>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={this.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Nascimento"
                      name="birth"
                      value={this.date_birth}
                      onChange={e => this.setState({ date_birth: e.target.value })}
                    />
                  </div>
                  <div className="selectGroup">
                    <select onChange={this.handleSelectSexo} name="sexo">
                      <option>Sexo</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="CPF"
                      value={this.cpf}
                      onChange={e => this.setState({ cpf: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Telefone"
                      value={this.telephone}
                      onChange={e => this.setState({ telephone: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="CRO"
                      value={this.cro}
                      onChange={e => this.setState({ cro: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Especialidade"
                      value={this.specialty}
                      onChange={e => this.setState({ specialty: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={this.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="password"
                      placeholder="Senha"
                      value={this.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </div>
                  <div className="selectGroup">
                    <select onChange={this.handleSelectTypeUser} name="typeUser">
                      <option>Tipo de Usuário</option>
                      <option value="1">Administrador</option>
                      <option value="2">Secretário(a)</option>
                      <option value="3">Médico</option>
                    </select>
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
