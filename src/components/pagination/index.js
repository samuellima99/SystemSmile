import React from 'react';
import './styles.css';

const Pagination = ({ clerkPerPage, totalclerks, paginate }) => {

  const numberPage = [];

  for (let i = 1; i <= Math.ceil(totalclerks / clerkPerPage); i++) {
    numberPage.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {numberPage.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
