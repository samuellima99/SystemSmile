import React, { Component } from 'react';

//import images
import Logo from '../../assets/login/logo.png';
import LogoMediumSmall from '../../assets/login/logo-devices-medium-smalls.png';

//import styles
import './styles.css';

//import api
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date_birth: '',
      cpf: '',
      telephone: '',
      email: '',
      password: '',
      typeUser: '',
      error: ''
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (e) => {
    this.setState({ typeUser: e.target.value });
  }

  handleSignUp = async e => {
    e.preventDefault();

    const { name, date_birth, cpf, telephone, email, password, typeUser } = this.state;

    await api.post('api/register', {
      name,
      date_birth,
      cpf,
      telephone,
      email,
      password,
      fk_type_user_id: typeUser,
    });

    this.props.history.push("/");
  }


  render() {
    return (
      <>
        <div className="container">
          <div className="form">
            <div className="formLeft">
              <img src={Logo} alt="SystemSmile" width="150px" height="180px" className="large-devices" />
              <img src={LogoMediumSmall} alt="SystemSmile" width="120px" height="150px" className="medium-devices" />
            </div>
            <div className="formRight">
              <form>
                <h3>Registrar-se</h3>
                <div className="inputGroup">
                  <input type="text" placeholder="Nome" onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <div className="inputGroup">
                  <input type="text" placeholder="Nascimento" onChange={e => this.setState({ date_birth: e.target.value })} />
                </div>
                <div className="inputGroup">
                  <input type="text" placeholder="CPF" onChange={e => this.setState({ cpf: e.target.value })} />
                </div>
                <div className="inputGroup">
                  <input type="text" placeholder="Telefone" onChange={e => this.setState({ telephone: e.target.value })} />
                </div>
                <div className="inputGroup">
                  <input type="email" placeholder="E-mail" onChange={e => this.setState({ email: e.target.value })} />
                </div>
                <div className="inputGroup">
                  <input type="password" placeholder="Senha" onChange={e => this.setState({ password: e.target.value })} />
                </div>
                <div className="selectGroup">
                  <select onChange={this.handleSelect}>
                    <option>Tipo de Usuário</option>
                    <option value="1">Administrador</option>
                    <option value="2">Secretário(a)</option>
                    <option value="3">Médico</option>
                  </select>
                </div>
                <div className="btnGroup">
                  <button className="btnLogin" onClick={this.handleSignUp}>Registrar-se</button>
                </div>
                <div className="btnGroup">
                  <Link to="/" className="btnLoginBack">Retornar ao login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
