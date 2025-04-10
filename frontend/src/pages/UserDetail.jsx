import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { userService } from '../api/userService';

/**
 * Componente UserDetail
 * 
 * Este componente exibe informações detalhadas de um usuário específico.
 * Permite visualizar todos os dados do usuário, além de oferecer opções para editar ou excluir.
 * 
 * @returns {JSX.Element} Componente de detalhes do usuário
 */
const UserDetail = () => {
  // Obtém o ID do usuário da URL
  const { id } = useParams();
  // Hook para navegação programática
  const navigate = useNavigate();
  // Estado para armazenar os dados do usuário
  const [user, setUser] = useState(null);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);

  // Efeito para carregar os dados do usuário quando o componente é montado
  useEffect(() => {
    /**
     * Função assíncrona para buscar dados do usuário da API
     */
    const fetchUser = async () => {
      try {
        // Inicia o carregamento
        setLoading(true);
        // Busca os dados do usuário pelo ID
        const data = await userService.getUserById(id);
        // Atualiza o estado com os dados do usuário
        setUser(data);
        // Limpa qualquer erro anterior
        setError(null);
      } catch (err) {
        // Define mensagem de erro em português
        setError('Erro ao carregar dados do usuário. Por favor, tente novamente.');
        // Registra o erro no console para depuração
        console.error('Erro ao buscar usuário:', err);
      } finally {
        // Finaliza o estado de carregamento independente do resultado
        setLoading(false);
      }
    };

    // Executa a função de busca
    fetchUser();
  }, [id]); // Dependência do efeito - recarrega quando o ID muda

  /**
   * Função para confirmar e processar a exclusão de um usuário
   * Exibe uma caixa de diálogo de confirmação antes de excluir
   */
  const handleDelete = async () => {
    // Solicita confirmação do usuário antes de excluir
    if (window.confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      try {
        // Chama o serviço para excluir o usuário
        await userService.deleteUser(id);
        // Exibe mensagem de sucesso
        alert('Usuário excluído com sucesso!');
        // Redireciona para a página inicial após exclusão bem-sucedida
        navigate('/');
      } catch (err) {
        // Define mensagem de erro em português
        setError('Erro ao excluir usuário. Por favor, tente novamente.');
        // Registra o erro no console para depuração
        console.error('Erro ao excluir usuário:', err);
      }
    }
  };

  // Renderiza um indicador de carregamento enquanto busca dados do usuário
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Renderiza mensagem de erro se ocorrer algum problema
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link to="/" className="text-blue-500 hover:underline">
          Voltar para a lista de usuários
        </Link>
      </div>
    );
  }

  // Renderiza mensagem quando o usuário não é encontrado
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Usuário não encontrado.
        </div>
        <Link to="/" className="text-blue-500 hover:underline">
          Voltar para a lista de usuários
        </Link>
      </div>
    );
  }

  // Renderização principal dos detalhes do usuário
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Cabeçalho com título e botões de ação */}
          <div className="flex justify-between items-center mb-6 text-indigo-800">
            <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
            <div className="flex space-x-2">
              {/* Botão para editar usuário */}
              <Link
                to={`/users/edit/${user.id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center"
                title="Editar informações do usuário"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar
              </Link>
              {/* Botão para excluir usuário */}
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                title="Excluir usuário permanentemente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Excluir
              </button>
            </div>
          </div>

          {/* Layout flexível para avatar e informações do usuário */}
          <div className="flex flex-col md:flex-row">
            {/* Coluna do avatar */}
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              {/* Exibe avatar do usuário se disponível ou avatar padrão */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}                  
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-200">
                  <span className="text-gray-600 text-4xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Coluna das informações do usuário */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome do usuário */}
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Nome</h3>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                {/* Email do usuário */}
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Email</h3>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                {/* Papel do usuário */}
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Papel</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                  </span>
                </div>
                {/* Status do usuário */}
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Status</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                {/* Data de criação */}
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Criado em</h3>
                  <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                {/* Data de atualização */}
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Atualizado em</h3>
                  <p className="text-gray-900">{new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link para voltar à lista de usuários */}
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Voltar para a lista de usuários
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
