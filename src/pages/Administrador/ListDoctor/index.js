import React, { Component } from 'react'

import './styles.css'

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';


import DeleteIcon from '../../../assets/dashboard/trash.png';
import EditIcon from '../../../assets/dashboard/edit.png';

import api from '../../../services/api'
import { Link } from 'react-router-dom';


import Pagination from "../../../components/pagination";


export default class ListDoctors extends Component {

  constructor() {
    super();
    this.state = {
      doctors: [],
      search: '',
      currentPage: 1,
      doctorsPerPage: 3,
    }
    this.loadDoctors = this.loadDoctors.bind(this);
  }

  loadDoctors = async () => {
    const response = await api.get('api/users/searchProfessional');

    this.setState({ doctors: response.data.data });
  }

  componentDidMount() {
    this.loadDoctors();
  }

  deleteDoctor = async (id) => {
    try {
      await api.delete(`api/users/${id}`);
      this.loadDoctors();
    } catch (err) {
      alert("erro ao exluír atendente!");
    }
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) });
  }

  render() {

    const indexOfLastPost = this.state.currentPage * this.state.doctorsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.doctorsPerPage;
    const currentDoctors = this.state.doctors.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });

    let filter = currentDoctors.filter(doctor => {
      return doctor.person.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    })

    return (
      <>
        <Sidebar />
        <Main>
          <h3 className="path-page">Administrador - Lista de médicos</h3>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar médico..."
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
            {<p className="page-active">Página - {this.state.currentPage}</p>}
          </div>
          <div className="wrapper-doctor">
            <div className="box-form">
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
                    {filter.map(doctor => (
                      <tr key={doctor.id}>
                        <>
                          <td>{doctor.person.name}</td>
                          <td>{doctor.person.telephone}</td>
                          <td>{doctor.professional.cro}</td>
                          <td>{doctor.professional.specialty}</td>
                          <td>
                            <Link to={`/admin/editDoctor/${doctor.id}`}>
                              <img src={EditIcon} alt="Editar" width="20px" height="20px" />
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
            <div className="paginate">
              <Pagination
                clerkPerPage={this.state.doctorsPerPage}
                totalclerks={this.state.doctors.length}
                paginate={paginate}
              />
            </div>
          </div>
        </Main>
      </>
    );
  }
}