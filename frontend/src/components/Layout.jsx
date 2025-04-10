import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Componente Layout
 * 
 * Este componente define a estrutura básica do layout da aplicação.
 * Inclui a barra de navegação (Navbar) e um contêiner principal para o conteúdo.
 * Utiliza o componente Outlet do React Router para renderizar as rotas aninhadas.
 * 
 * @returns {JSX.Element} Componente de layout da aplicação
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Barra de navegação superior */}
      <Navbar />
      {/* Conteúdo principal - renderiza os componentes de rota aninhados */}
      <main>
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-4">
        Desenvolvido por Marcos Paulo Ruppel
      </footer>

    </div>
  );
};

export default Layout;
