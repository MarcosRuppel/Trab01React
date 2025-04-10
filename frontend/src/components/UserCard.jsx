import { Link } from 'react-router-dom';

/**
 * Componente UserCard
 * 
 * Este componente exibe as informações de um usuário em formato de cartão,
 * incluindo avatar, nome, email, função, status e botões de ação.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.user - Dados do usuário a ser exibido
 * @param {Function} props.onDelete - Função para lidar com a exclusão do usuário
 * @returns {JSX.Element} Componente de cartão de usuário
 */
const UserCard = ({ user, onDelete }) => {
  /**
   * Função para confirmar e processar a exclusão de um usuário
   * Exibe uma caixa de diálogo de confirmação antes de chamar a função onDelete
   */
  const handleDelete = () => {
    // Solicita confirmação do usuário antes de excluir
    if (window.confirm(`Tem certeza que deseja excluir o usuário ${user.name}?`)) {
      // Chama a função de exclusão passada como prop
      onDelete(user.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-4">
        {/* Exibe avatar do usuário se disponível */}
        {user.avatar && (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        {/* Exibe avatar padrão com inicial do nome se não houver avatar */}
        {!user.avatar && (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* Informações do usuário */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-indigo-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          {/* Badges para função e status do usuário */}
          <div className="flex space-x-2 mt-1">
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role === 'admin' ? 'Administrador' : 'Usuário'}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {user.status === 'active' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
        {/* Botões de ação: visualizar, editar e excluir */}
        <div className="flex space-x-2">
          {/* Botão para visualizar detalhes do usuário */}
          <Link 
            to={`/users/${user.id}`} 
            className="p-1.5 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors duration-200"
            title="Visualizar detalhes do usuário"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </Link>
          {/* Botão para editar usuário */}
          <Link 
            to={`/users/edit/${user.id}`} 
            className="p-1.5 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-200"
            title="Editar informações do usuário"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </Link>
          {/* Botão para excluir usuário */}
          <button 
            onClick={handleDelete} 
            className="p-1.5 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors duration-200"
            title="Excluir usuário"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
