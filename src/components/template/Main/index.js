import React, { Component } from 'react';

import { logout } from '../../../services/auth';
import { withRouter } from 'react-router-dom';

import Header from '../Header'

import './styles.css';

class Main extends Component {
  
  handleLogout = () => {
    logout();
    this.props.history.push("/");
  }
  render() {
    return (
      <>
        <div className="content-box">
          <Header />
          <main className="content">
            <div className="childrens">
              {this.props.children}
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default withRouter(Main);