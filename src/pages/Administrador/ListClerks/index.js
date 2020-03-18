import React, { Component } from 'react'

import './styles.css'

import Sidebar from '../../../components/template/Sidebar';
import Main from '../../../components/template/Main';


import DeleteIcon from '../../../assets/dashboard/trash.png';
import EditIcon from '../../../assets/dashboard/edit.png';

import api from '../../../services/api'
import { Link } from 'react-router-dom';

import Pagination from "../../../components/pagination";


export default class ListClerks extends Component {

  constructor() {
    super()
    this.state = {
      clerks: [],
      search: '',
      currentPage: 1,
      clerksPerPage: 3,
    }
    this.loadClerks = this.loadClerks.bind(this);
  }

  loadClerks = async () => {
    const response = await api.get('api/users/searchSecretary');

    this.setState({ clerks: response.data.data });
  }

  componentDidMount() {
    this.loadClerks();
  }

  deleteClerk = async (id) => {
    try {
      await api.delete(`api/users/${id}`);
      this.loadClerks();
    } catch (err) {
      alert("erro ao exluír atendente!");
    }
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) });
  }


  render() {

    const indexOfLastPost = this.state.currentPage * this.state.clerksPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.clerksPerPage;
    const currentClerks = this.state.clerks.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });

    let filter = currentClerks.filter(clerk => {
      return clerk.person.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    })

    return (
      <>
        <Sidebar />
        <Main>
          <h3 className="clerk-page-path">Administrador - Lista de atendentes</h3>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar atendente..."
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />

            {<p className="page-active">Página - {this.state.currentPage}</p>}
          </div>
          <div className="wrapper-list">
            <div className="clerk-box-form">
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
                    {filter.map(clerk => (
                      <tr key={clerk.id}>
                        <>
                          <td>{clerk.id}</td>
                          <td>{clerk.person.name}</td>
                          <td>{clerk.person.cpf}</td>
                          <td>{clerk.person.telephone}</td>
                          <td><Link to={`/admin/editClerks/${clerk.id}`}><img src={EditIcon} alt="Editar" width="20px" height="20px" /></Link></td>
                          <td><button onClick={() => this.deleteClerk(clerk.id)}><img src={DeleteIcon} alt="Delete" width="20px" height="20px" /></button></td>
                        </>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="paginate">
              <Pagination
                clerkPerPage={this.state.clerksPerPage}
                totalclerks={this.state.clerks.length}
                paginate={paginate}
              />
            </div>
          </div>
        </Main>
      </>
    );
  }
}