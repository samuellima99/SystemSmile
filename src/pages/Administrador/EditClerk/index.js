import React, { Component } from 'react';

import './styles.css';

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';

import swal from 'sweetalert';

//import api 
import api from '../../../services/api';

export default class EditClerk extends Component {

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
      typeUser: '',
    }
  }


  handleSelectSexo = (e) => {
    this.setState({ sexo: e.target.value })
  }

  handleSelectTypeUser = (e) => {
    this.setState({ typeUser: e.target.value })
  }

  async componentDidMount() {
    let user = this.props.match.params;

    const response = await api.get(`api/users/show/${user.id}`);

    this.setState({ name: response.data[0].person.name });
    this.setState({ date_birth: response.data[0].person.date_birth });
    this.setState({ cpf: response.data[0].person.cpf });
    this.setState({ telephone: response.data[0].person.telephone });
    this.setState({ email: response.data[0].email });
    this.setState({ typeUser: response.data[0].type_user.name });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleUpdateClerk = async (e) => {
    e.preventDefault();
    let user = this.props.match.params;

    const { name, date_birth, cpf, telephone, email, typeUser } = this.state;
    console.log(typeUser)

    const response = await api.put(`api/users/${user.id}`, {
      name,
      date_birth,
      cpf,
      telephone,
      email,
      typeUser
    });

    if (response.status === 200) {
      swal({
        title: "Atendente editado com sucesso!",
        icon: "success",
        button: "OK",
      });
      this.props.history.push("/admin/listClerks");
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
                <h5 className="description-page">Editar dados do atendente</h5>
              </div>
              <div className="form-clerk">
                <form onSubmit={this.handleUpdateClerk}>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Nascimento"
                      name="birth"
                      value={this.state.date_birth}
                      onChange={e => this.setState({ date_birth: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="CPF"
                      value={this.state.cpf}
                      onChange={e => this.setState({ cpf: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="text"
                      placeholder="Telefone"
                      value={this.state.telephone}
                      onChange={e => this.setState({ telephone: e.target.value })}
                    />
                  </div>
                  <div className="clerkInputGroup">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="selectGroup">
                    <select onChange={this.handleSelectTypeUser} name="typeUser">
                      <option>{this.state.typeUser}</option>
                      <option value="1">Administrador</option>
                      <option value="2">Secretário(a)</option>
                      <option value="3">Médico</option>
                    </select>
                  </div>
                  <div className="btnGroup">
                    <button className="btnRegister" type="submit">Editar</button>
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
