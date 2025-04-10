import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Sistema - Marcos</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-200 transition-colors duration-200">Usuários</Link>
          <Link to="/users/new" className="hover:text-indigo-200 transition-colors duration-200">Novo Usuário</Link>
          <Link to="/about" className="px-4 py-2">Sobre</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
