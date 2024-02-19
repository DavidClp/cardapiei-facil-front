import React from 'react';
import { Navigate } from 'react-router-dom';


const Admin = () => {
  return (
    <section>
        {sessionStorage.getItem('token') ?
        <Navigate to="/admin/cardapio" />
        :
        <Navigate to="/" />
      }
    </section>
  )
}

export default Admin