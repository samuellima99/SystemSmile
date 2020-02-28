import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//import image
import Person from '../../../assets/dashboard/person.jpg';

//import auth
import { logout } from '../../../services/auth';

//import styles 
import './styless.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      showOptionsUser: false
    };

    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  };

  showOptions(event) {
    event.preventDefault();
    this.setState({ showOptionsUser: true }, () => {
      document.addEventListener('click', this.hideOptions);
    });
  }

  hideOptions() {
    this.setState({ showOptionsUser: false }, () => {
      document.removeEventListener('click', this.hideOptions);
    });
  }

  handleLogout = () => {
    logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <header>
        <div className="person">
          <img src={Person} alt="Pessoa" />
          <Link className="link" to="" onClick={this.showOptions}>Felipe</Link>
          {this.state.showOptionsUser ? (
            <ul className="subMenu">
              <li className="subMenuItem"><Link onClick={this.handleLogout}>Sair</Link></li>
            </ul>
          ) :
            (
              null
            )
          }
        </div>
      </header>
    );
  }
}

export default withRouter(Header);