import './App.css';
import React from "react"
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cardapio from './pages/cardapio';

import Admin from './pages/admin'
import CardapioAdm from './pages/admin/Cardapio';
import Estabelecimento from './pages/admin/estabelecimento';
import Divulgacao from './pages/admin/divulgacao';
import Perfil from './pages/admin/perfil';

import Cadastro from './components/homeComponents/Cadastro';
import Setup from './pages/setup';
import Planos from './pages/home/planos'
import { ProdutoDetalhe } from './pages/cardapio/produto/page';
import Login from './components/homeComponents/Login';
import { CarrinhoPage } from './pages/cardapio/carrinho/page';
import { Configuracao } from './pages/admin/configuracao/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" Component={Login} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/setup" element={<Setup />} />
        
        <Route path="/:estUrl" Component={Cardapio} />
        <Route path="/:estUrl/produto/:proId" Component={ProdutoDetalhe} /> 
        <Route path="/:estUrl/carrinho" Component={CarrinhoPage} /> 

        <Route path="/admin" Component={Admin} />
        <Route path="/admin/estabelecimento" Component={Estabelecimento} />
        <Route path="/admin/perfil" Component={Perfil} />
        <Route path="/admin/divulgacao" Component={Divulgacao} />
        <Route path="/admin/cardapio" Component={CardapioAdm} />
        <Route path="/admin/configuracao" Component={Configuracao} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;