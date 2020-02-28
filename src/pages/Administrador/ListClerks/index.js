import React, { Component } from 'react'

import './styles.css'

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';


import DeleteIcon from '../../../assets/dashboard/trash.png';
import EditIcon from '../../../assets/dashboard/edit.png';

import api from '../../../services/api'
import { Link } from 'react-router-dom';


export default class ListClerks extends Component {

  constructor() {
    super()
    this.state = {
      clerks: []
    }
  }


  loadClerks = async () => {
    const response = await api.get('api/users/searchSecretary');

    this.setState({ clerks: response.data });
  }
  
  componentDidMount() {
    this.loadClerks();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteClerk = async (id) => {
    try {
      await api.delete(`api/users/${id}`);
      this.loadClerks();
    } catch (err) {
      alert("erro ao exluír atendente!");
    }
  }


  render() {
    return (
      <>
        <Sidebar />
        <Main>
          <h3 className="page-path">Administrador - Lista de atendentes</h3>
          <div className="wrapper-list">
            <div className="box-form">
              <div className="header-form">
                <h5 className="description-page">Lista de atendentes</h5>
              </div>
              <div className="list-clerk">
                <table cellspacing="0" cellpadding="0">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Telefone</th>
                      <th>Editar</th>
                      <th>Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clerks.map(clerk => (
                      <tr key={clerk.id}>
                        <>
                          <td>{clerk.id}</td>
                          <td>{clerk.person.name}</td>
                          <td>{clerk.person.cpf}</td>
                          <td>{clerk.person.telephone}</td>
                          <td><Link to={`/admin/editClerks/${clerk.id}`}><img src={EditIcon} alt="Editar" width="20px" height="20px"/></Link></td>
                          <td><button onClick={() => this.deleteClerk(clerk.id)}><img src={DeleteIcon} alt="Delete" width="20px" height="20px" /></button></td>
                        </>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Main>
      </>
    );
  }
}