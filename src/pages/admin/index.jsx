import React from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  return (
    <section>
        {<Navigate to="/admin/cardapio" />},
    </section>
  )
}

export default Admin