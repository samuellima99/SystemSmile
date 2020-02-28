import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//import images
import Logo from '../../../assets/dashboard/Logo-Clerk.png';
import Home from '../../../assets/dashboard/Home-Icon.png';
import Clerk from '../../../assets/dashboard/Clerk-Icon.png';
import Doctor from '../../../assets/dashboard/Doctor-Icon.png';
import Report from '../../../assets/dashboard/Report-Icon.png';
import Financial from '../../../assets/dashboard/Finance-Icon.png';

//import styles
import './styles.css';

export default class SideBarClerk extends Component {
  constructor() {
    super();

    this.state = {
      displayMenuPatients: false,
      displayMenuDoctor: false,
      displayMenuFinancial: false,

      showOptionsUser: false
    };

    this.showDropdownPatients = this.showDropdownPatients.bind(this);
    this.hideDropdownPatients = this.hideDropdownPatients.bind(this);
    this.showDropdownDoctor = this.showDropdownDoctor.bind(this);
    this.hideDropdownDoctor = this.hideDropdownDoctor.bind(this);
    this.showDropdownFinancial = this.showDropdownFinancial.bind(this);
    this.hideDropdownFinancial = this.hideDropdownFinancial.bind(this);
  };

  showDropdownPatients(event) {
    event.preventDefault();
    this.setState({ displayMenuPatients: true }, () => {
      document.addEventListener('click', this.hideDropdownPatients);
    });
  }

  hideDropdownPatients() {
    this.setState({ displayMenuPatients: false }, () => {
      document.removeEventListener('click', this.hideDropdownPatients);
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
      <div className="wrapper-clerk">
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
              <Link className="link" to="" onClick={this.showDropdownPatients}>Pacientes</Link>
              {this.state.displayMenuPatients ? (
                <ul className="subMenu">
                  <li className="subMenuItem"><Link to="/clerk/registerPatientes">Novo Paciente</Link></li>
                  <li className="subMenuItem"><Link to="/admin/listClerks">Listar Pacientes</Link></li>
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
                  <li className="subMenuItem"><Link to="#">Novo Paciente</Link></li>
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