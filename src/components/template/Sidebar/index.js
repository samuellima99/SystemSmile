import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//import images
import Logo from '../../../assets/dashboard/Logo.png';
import Home from '../../../assets/dashboard/Home-Icon.png';
import Clerk from '../../../assets/dashboard/Clerk-Icon.png';
import Doctor from '../../../assets/dashboard/Doctor-Icon.png';
import Report from '../../../assets/dashboard/Report-Icon.png';
import Financial from '../../../assets/dashboard/Finance-Icon.png';

//import styles
import './styles.css';

export default class DashboardAdmin extends Component {
  constructor() {
    super();

    this.state = {
      displayMenuClerk: false,
      displayMenuDoctor: false,
      displayMenuFinancial: false,

      showOptionsUser: false
    };

    this.showDropdownClerk = this.showDropdownClerk.bind(this);
    this.hideDropdownClerk = this.hideDropdownClerk.bind(this);
    this.showDropdownDoctor = this.showDropdownDoctor.bind(this);
    this.hideDropdownDoctor = this.hideDropdownDoctor.bind(this);
    this.showDropdownFinancial = this.showDropdownFinancial.bind(this);
    this.hideDropdownFinancial = this.hideDropdownFinancial.bind(this);
  };

  showDropdownClerk(event) {
    event.preventDefault();
    this.setState({ displayMenuClerk: true }, () => {
      document.addEventListener('click', this.hideDropdownClerk);
    });
  }

  hideDropdownClerk() {
    this.setState({ displayMenuClerk: false }, () => {
      document.removeEventListener('click', this.hideDropdownClerk);
    });
  }

  showDropdownDoctor(event) {
    event.preventDefault();
    this.setState({ displayMenuDoctor: true }, () => {
      document.addEventListener('click', this.hideDropdownDoctor);
    });
  }

  hideDropdownDoctor() {
    this.setState({ displayMenuDoctor: false }, () => {
      document.removeEventListener('click', this.hideDropdownDoctor);
    });
  }
  showDropdownFinancial(event) {
    event.preventDefault();
    this.setState({ displayMenuFinancial: true }, () => {
      document.addEventListener('click', this.hideDropdownFinancial);
    });
  }

  hideDropdownFinancial() {
    this.setState({ displayMenuFinancial: false }, () => {
      document.removeEventListener('click', this.hideDropdownFinancial);
    });
  }
  
  render() {
    return (
      <div className="wrapper">
        <nav>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <ul>
            <li>
              <img src={Home} alt="Home" />
              <Link to="/admin/home" className="link">Home</Link>
            </li>
            <li>
              <img src={Clerk} alt="Atendentes" />
              <Link className="link" to="" onClick={this.showDropdownClerk}>Atendentes</Link>
              {this.state.displayMenuClerk ? (
                <ul className="subMenu">
                  <li className="subMenuItem"><Link to="/admin/register">Cadastrar</Link></li>
                  <li className="subMenuItem"><Link to="/admin/listClerks">Listar</Link></li>
                </ul>
              ) :
                (
                  null
                )
              }
            </li>
            <li>
              <img src={Doctor} alt="Médicos" />
              <Link className="link" to="" onClick={this.showDropdownDoctor}>Médicos</Link>
              {this.state.displayMenuDoctor ? (
                <ul className="subMenu">
                  <li className="subMenuItem"><Link to="/admin/registerDoctor">Cadastrar</Link></li>
                  <li className="subMenuItem"><Link to="/admin/listDoctors">Listar</Link></li>
                </ul>
              ) :
                (
                  null
                )
              }
            </li>
            <li>
              <img src={Report} alt="Relatórios" />
              <Link to="#" className="link">Relatórios</Link>
            </li>
            <li>
              <img src={Financial} alt="Financeiro" />
              <Link to="#" className="link">Financeiro</Link>
              {this.state.displayMenuFinancial ? (
                <ul className="subMenu">
                  <li className="subMenuItem"><Link to>Contas Link Pagar</Link></li>
                  <li className="subMenuItem"><Link to>Contas Link Receber</Link></li>
                </ul>
              ) :
                (
                  null
                )
              }
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}