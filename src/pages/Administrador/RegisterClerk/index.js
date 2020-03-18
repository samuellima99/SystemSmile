import React, { Component } from 'react';

import './styles.css';

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';

//import api 
import api from '../../../services/api';


import swal from 'sweetalert';

export default class RegisterClerk extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date_birth: '',
      sexo: '',
      cpf: '',
      telephone: '',
      email: '',
      password: '',
      fk_type_user_id: '',
      errors: []
    }
  }


  handleSelectSexo = (e) => {
    this.setState({ sexo: e.target.value })
  }

  handleSelectTypeUser = (e) => {
    this.setState({ fk_type_user_id: e.target.value })
  }

  handleRegisterClerk = async (e) => {
    e.preventDefault();

    const { name, date_birth, cpf, telephone, email, password, fk_type_user_id } = this.state;

    try {
      const response = await api.post('api/register', {
        name,
        date_birth,
        cpf,
        telephone,
        email,
        password,
        fk_type_user_id,
      });

      if (!name || !date_birth || !cpf || !telephone || !email || !password || !fk_type_user_id) {
        this.setState({ errors: response.data.errors })
      } else {
        swal({
          title: "Atendente cadastrado com sucesso!",
          icon: "success",
          button: "OK",
        });
        this.props.history.push("/admin/listClerks");
      }

    } catch (err) {
      console.log(this.state.errors);
    }

  }


  render() {
    return (
      <>
        <Sidebar />
        <Main>
          <h3 className="page-path">Dashboard - Atendente</h3>
          <div className="wrapper-register">
            <div className="box-form">
              <div className="header-form">
                <h5 className="description-page">Cadastro de atendentes</h5>
              </div>
              <div className="form-clerk">
                <form onSubmit={this.handleRegisterClerk}>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={this.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                    {this.state.errors.map(error => (
                      <p className="error">{error.name}</p>
                    ))}
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Nascimento"
                      name="birth"
                      value={this.date_birth}
                      onChange={e => this.setState({ date_birth: e.target.value })}
                    />
                    {this.state.errors.map(error => (
                      <p className="error">{error.date_birth}</p>
                    ))}
                  </div>
                  <div className="selectGroup">
                    <select onChange={this.handleSelectSexo} name="sexo">
                      <option>Sexo</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                    {this.state.errors.map(error => (
                      <p className="error">{error.sexo}</p>
                    ))}
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="CPF"
                      value={this.cpf}
                      onChange={e => this.setState({ cpf: e.target.value })}
                    />
                    {this.state.errors.map(error => (
                      <p className="error">{error.cpf}</p>
                    ))}
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Telefone"
                      value={this.telephone}
                      onChange={e => this.setState({ telephone: e.target.value })}
                    />
                    {this.state.errors.map(error => (
                      <p className="error">{error.telephone}</p>
                    ))}
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={this.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    {this.state.errors.map(error => (
                      <p className="error">{error.email}</p>
                    ))}
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="password"
                      placeholder="Senha"
                      value={this.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                    {this.state.errors.map(error => (
                      <p className="error">{error.password}</p>
                    ))}
                  </div>
                  <div className="selectGroup">
                    <select onChange={this.handleSelectTypeUser} name="typeUser">
                      <option>Tipo de Usuário</option>
                      <option value="1">Administrador</option>
                      <option value="2">Secretário(a)</option>
                      <option value="3">Médico</option>
                    </select>
                    {this.state.errors.map(error => (
                      <p className="error">{error.fk_type_user_id}</p>
                    ))}
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
