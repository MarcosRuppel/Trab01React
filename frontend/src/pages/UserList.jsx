import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../api/userService';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';

/**
 * Componente UserList
 * 
 * Este componente é responsável por exibir a lista de usuários com paginação.
 * Ele permite visualizar, editar e excluir usuários, além de navegar para a criação de novos usuários.
 * 
 * @returns {JSX.Element} Componente de listagem de usuários
 */
const UserList = () => {
  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState([]);
  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);
  
  // Estados para controle de paginação
  const [currentPage, setCurrentPage] = useState(1);
  // Número de usuários exibidos por página
  const [usersPerPage] = useState(5);
  
  // Efeito para carregar os usuários quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []);
  
  /**
   * Função assíncrona para buscar usuários da API
   * Atualiza os estados de usuários, carregamento e erro
   */
  const fetchUsers = async () => {
    try {
      // Inicia o carregamento
      setLoading(true);
      // Busca os dados da API
      const data = await userService.getAllUsers();
      // Atualiza o estado com os usuários obtidos
      setUsers(data);
      // Limpa qualquer erro anterior
      setError(null);
    } catch (err) {
      // Define a mensagem de erro em português
      setError('Erro ao carregar usuários. Por favor, tente novamente.');
      // Registra o erro no console para depuração
      console.error('Erro ao buscar usuários:', err);
    } finally {
      // Finaliza o estado de carregamento independente do resultado
      setLoading(false);
    }
  };
  
  /**
   * Função para lidar com a exclusão de um usuário
   * 
   * @param {string|number} userId - ID do usuário a ser excluído
   */
  const handleDeleteUser = async (userId) => {
    try {
      // Chama o serviço para excluir o usuário
      await userService.deleteUser(userId);
      // Atualiza a lista de usuários removendo o usuário excluído
      setUsers(users.filter(user => user.id !== userId));
      // Exibe mensagem de sucesso
      alert('Usuário excluído com sucesso!');
    } catch (err) {
      // Define mensagem de erro em português
      setError('Erro ao excluir usuário. Por favor, tente novamente.');
      // Registra o erro no console para depuração
      console.error('Erro ao excluir usuário:', err);
    }
  };
  
  // Cálculos para a paginação
  // Índice do último usuário na página atual
  const indexOfLastUser = currentPage * usersPerPage;
  // Índice do primeiro usuário na página atual
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Lista de usuários da página atual
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // Cálculo do número total de páginas
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  /**
   * Função para alterar a página atual
   * 
   * @param {number} pageNumber - Número da página para navegar
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Renderiza o indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <div className="w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-indigo-800">Usuários</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  // Renderização principal do componente
  return (
    <div className="w-full px-4 py-8">
      {/* Cabeçalho com título e botão para adicionar novo usuário */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-800">Usuários</h1>
        <Link 
          to="/users/new" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center shadow-sm transition-colors duration-200"
          title="Adicionar novo usuário"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Usuário
        </Link>
      </div>
      
      {/* Exibe mensagem de erro se houver algum problema */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Exibe mensagem quando não há usuários ou a lista de usuários */}
      {users.length === 0 ? (
        <div className="bg-gray-100 p-8 text-center rounded-md">
          <p className="text-gray-600">Nenhum usuário encontrado.</p>
          <Link 
            to="/users/new" 
            className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
          >
            Adicionar Usuário
          </Link>
        </div>
      ) : (
        <>
          {/* Lista de usuários da página atual */}
          <div className="space-y-4">
            {currentUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                onDelete={handleDeleteUser} 
              />
            ))}
          </div>
          
          {/* Componente de paginação, exibido apenas se houver mais páginas */}
          {users.length > usersPerPage && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
