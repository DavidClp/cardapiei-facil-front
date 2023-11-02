import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import { ButtonVerCardapio } from '../../basicosComponents/Buttons/'
import { BsFillPersonFill } from "react-icons/bs";
import './header.scss';

import axios from "axios"
import { useQuery} from "react-query";
import { urlApi } from '../../../constants/urlApi';
const est_id = localStorage.getItem('est_id');
const url = urlApi
const urlBasica = "http://localhost:3000/";

const Header = () => {
  const location = useLocation();
    //url
    const { data} = useQuery(["url", est_id], () => {
      return axios.get(`${url}api/estabelecimentos/get_url/${est_id}`, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      })
        .then((response) => response.data);
    })

  return (
    <section className='header23 hidden lg:hidden'>
      <div className="content">
        <div className="logo">
          <Link to="/admin/" className='link'>
            <img src={logo} alt="Cardapiei Facil"/>
          </Link>

        </div>
        <ButtonVerCardapio url={urlBasica+data}/>

        <nav>
          <ul>
            <li>
              <Link to="/admin/estabelecimento" className={`link ${location.pathname === '/admin/estabelecimento' ? 'select' : ''}`}>
                Estabelecimento
              </Link>
            </li>
            <li>
              <Link to="/admin/cardapio" className={`link ${location.pathname === '/admin/cardapio' ? 'select' : ''}`}>
                Cardapio
                </Link>
            </li>
            <li>
              <Link to="/admin/divulgacao" className={`link ${location.pathname === '/admin/divulgacao' ? 'select' : ''}`}>
                Divulgação
                </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="perfil">
        <BsFillPersonFill className='icon' />
        David
      </div>


    </section>
  )
}

export default Header