import React from 'react'
import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import { ButtonAjuda } from '../../basicosComponents/Buttons'

const Header = () => {
  const location = useLocation();

  return (
    <section className='header'>
      <div className="content">
        <div className="logo">
          <Link to="/setup/" className='logo'>
            CARDAPIO ONLINE
          </Link>
        </div>
        <p>Você está a poucos passos de ter o seu cardápio online</p>
      </div>

        <ButtonAjuda/>

    </section>
  )
}

export default Header