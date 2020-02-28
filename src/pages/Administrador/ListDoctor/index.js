import React, { Component } from 'react'

import './styles.css'

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';


import DeleteIcon from '../../../assets/dashboard/trash.png';
import EditIcon from '../../../assets/dashboard/edit.png';

import api from '../../../services/api'
import { Link } from 'react-router-dom';

const token = localStorage.getItem('@systemSmile-Token');
var config = {
  headers: { 'Authorization': "bearer " + token }
};

export default class ListDoctors extends Component {

  constructor() {
    super();
    this.state = {
      doctors: []
    }
  }

  loadDoctors = async () => {
    const response = await api.get('api/users/searchProfessional', config);

    this.setState({ doctors: response.data });
  }

  componentDidMount() {
    this.loadDoctors();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteDoctor = async (id) => {
    try {
      await api.delete(`api/users/${id}`);
      this.loadDoctors();
    } catch (err) {
      alert("erro ao exluír atendente!");
    }
  }

  render() {
    return (
      <>
        <Sidebar />
        <Main>
          <h3>Administrador - Médicos</h3>
          <div className="wrapper-list">
            <div className="box-form">
              <div className="header-form">
                <h5 className="description-page">Lista de médicos</h5>
              </div>
              <div className="list-doctor">
                <table cellSpacing="0" cellPadding="0">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Telefone</th>
                      <th>CRO</th>
                      <th>Especialidade</th>
                      <th>Editar</th>
                      <th>Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.doctors.map(doctor => (
                      <tr key={doctor.id}>
                        <>
                          <td>{doctor.person.name}</td>
                          <td>{doctor.person.telephone}</td>
                          <td>{doctor.professional.cro}</td>
                          <td>{doctor.professional.specialty}</td>
                          <td>
                            <Link to={`/admin/editDoctor/${doctor.id}`}>
                              <img src={EditIcon} alt="Editar" width="20px" height="20px"/>
                            </Link>
                          </td>
                          <td>
                            <button onClick={() => this.deleteDoctor(doctor.id)}>
                              <img src={DeleteIcon} alt="Delete" width="20px" height="20px" />
                            </button>
                          </td>
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