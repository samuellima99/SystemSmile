import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


//import images
import Logo from '../../assets/login/Logo-Clerk.png';
import LogoMediumSmall from '../../assets/login/logo-devices-medium-smalls.png';

//import styles
import './styles.css';

//import Api and Auth
import api from '../../services/api';
import { login } from '../../services/auth';

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post('api/login', {
          email,
          password
        });

        console.log(response)
      
        login(response.data.access_token);
        localStorage.setItem('@systemSmile-User', JSON.stringify(response.data))

        this.props.history.push("/clerk/registerPatientes");
      } catch (error) {
        this.setState({
          error: "Houve um problema com o login, verifique suas credenciais."
        });
      }
    }
  }


  render() {

    return (
      <>
        <div className="container">
          <div className="form">
            <div className="loginClerkFormLeft">
              <img src={Logo} alt="SystemSmile" width="150px" height="180px" className="large-devices" />
              <img src={LogoMediumSmall} alt="SystemSmile" width="120px" height="150px" className="medium-devices" />
            </div>
            <div className="loginClerkFormRight">
              <form onSubmit={this.handleSignIn}>
                <h3>Login</h3>
                {this.state.error && <p>{this.state.error}</p>}
                <div className="loginInputGroup">
                  <input
                    type="text"
                    placeholder="E-mail"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="loginInputGroup">
                  <input
                    type="password"
                    placeholder="Senha"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
                <div className="btnGroup">
                  <button className="btnLogin">Entrar</button>
                </div>
                <div className="btnGroup">
                  <button className="btnCancel">Cancelar</button>
                </div>
                <div className="btnGroup">
                  <button className="btnSignUp" ><Link to="/signup" className="link">Registrar-se</Link></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SignIn);