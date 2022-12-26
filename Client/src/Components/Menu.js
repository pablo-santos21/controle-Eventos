import React from 'react';
import { TbLogout } from 'react-icons/tb';

import '../Styles/Menu.css';

const Menu = () => {
  const sair = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="py-3 mb-3 border-bottom">
        <div className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown"></div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="w-100 me-2 justify-content-end"
        >
          <div className="search">
            <button onClick={sair} className="exit">
              <TbLogout />
            </button>
          </div>
        </form>
      </header>
    </>
  );
};

export default Menu;
