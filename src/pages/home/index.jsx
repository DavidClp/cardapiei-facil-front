import React from 'react'
import Cadastro from '../../components/homeComponents/Cadastro'
import Login from '../../components/homeComponents/Login'


const Home = () => {
  return (
    <div>
         <h1>Página Inicial</h1>
        <Cadastro/>
        <Login/>
    </div>
  )
}

export default Home