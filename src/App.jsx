import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cardapio from './pages/cardapio';

import Admin from './pages/admin'
import CardapioAdm from './pages/admin/Cardapio';
import Estabelecimento from './pages/admin/estabelecimento';
import Divulgacao from './pages/admin/divulgacao';
import Perfil from './pages/admin/perfil';

import Cadastro from './components/homeComponents/Cadastro';
import Login from './components/homeComponents/Login';

import Setup from './pages/setup';
import Planos from './pages/home/planos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/:estabelecimento" element={<Cardapio />} />
        <Route path="admin/estabelecimento" Component={Estabelecimento} />
        <Route path="admin/perfil" Component={Perfil} />
        <Route path="admin/divulgacao" Component={Divulgacao} />
        <Route path="admin/cardapio" Component={CardapioAdm} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;