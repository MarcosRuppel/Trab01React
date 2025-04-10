import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/userSchema';
import { userService } from '../api/userService';

/**
 * Componente UserForm
 * 
 * Este componente implementa um formulário para criação e edição de usuários.
 * Utiliza React Hook Form para gerenciamento do formulário e Zod para validação.
 * 
 * @returns {JSX.Element} Componente de formulário de usuário
 */
const UserForm = () => {
  // Obtém o ID do usuário da URL, se existir (modo de edição)
  const { id } = useParams();
  // Hook para navegação programática
  const navigate = useNavigate();
  // Determina se estamos no modo de edição (quando há um ID)
  const isEditMode = !!id;
  // Estado para controlar o carregamento inicial dos dados
  const [loading, setLoading] = useState(isEditMode);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);
  // Estado para controlar o carregamento durante o envio do formulário
  const [submitLoading, setSubmitLoading] = useState(false);

  // Configuração do React Hook Form com validação Zod
  const {
    register,        // Função para registrar campos no formulário
    handleSubmit,    // Função para processar o envio do formulário
    formState: { errors }, // Estado dos erros de validação
    reset,           // Função para resetar o formulário
    setValue         // Função para definir valores dos campos programaticamente
  } = useForm({
    // Configuração do resolver Zod (validação parcial no modo de edição)
    resolver: zodResolver(isEditMode ? userSchema.partial() : userSchema),
    // Valores padrão para os campos
    defaultValues: {
      role: 'user',
      status: 'active'
    }
  });

  // Efeito para carregar dados do usuário no modo de edição
  useEffect(() => {
    if (isEditMode) {
      /**
       * Função assíncrona para buscar dados do usuário da API
       * e preencher o formulário com esses dados
       */
      const fetchUser = async () => {
        try {
          // Inicia o carregamento
          setLoading(true);
          // Busca os dados do usuário pelo ID
          const data = await userService.getUserById(id);
          
          // Preenche os campos do formulário com os dados obtidos
          Object.keys(data).forEach(key => {
            // Ignora campos que não devem ser editados
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              setValue(key, data[key]);
            }
          });
          
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
    }
  }, [id, isEditMode, setValue]); // Dependências do efeito

  /**
   * Função para processar o envio do formulário
   * 
   * @param {Object} data - Dados do formulário validados
   */
  const onSubmit = async (data) => {
    try {
      // Inicia o carregamento do envio
      setSubmitLoading(true);
      // Limpa qualquer erro anterior
      setError(null);

      // Se o campo avatar estiver vazio ou for apenas espaços, definir a URL padrão
      if (!data.avatar || data.avatar.trim() === '') {
      data.avatar = `https://ui-avatars.com/api/?name=${data.name.replace(" ",'+')}`;
      }
      
      // Lógica diferente para edição ou criação
      if (isEditMode) {
        // Atualiza o usuário existente
        await userService.updateUser(id, data);
        // Exibe mensagem de sucesso
        alert('Usuário atualizado com sucesso!');
      } else {
        // Cria um novo usuário
        await userService.createUser(data);
        // Exibe mensagem de sucesso
        alert('Usuário criado com sucesso!');
        // Limpa o formulário após criação bem-sucedida
        reset();
      }
      
      // Redireciona para a página inicial após sucesso
      navigate('/');
    } catch (err) {
      // Registra o erro no console para depuração
      console.error('Erro ao salvar usuário:', err);
      
      // Tratamento específico para erro de email duplicado
      if (err.response && err.response.status === 409) {
        setError('Este email já está em uso. Por favor, use outro email.');
      } else {
        // Mensagem genérica para outros erros
        setError('Erro ao salvar usuário. Por favor, tente novamente.');
      }
    } finally {
      // Finaliza o estado de carregamento do envio
      setSubmitLoading(false);
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

  // Renderização principal do formulário
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Título dinâmico baseado no modo (edição ou criação) */}
          <h1 className="text-2xl font-bold mb-6 text-indigo-800">
            {isEditMode ? 'Editar Usuário' : 'Novo Usuário'}
          </h1>
          
          {/* Exibe mensagem de erro se houver algum problema */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {/* Formulário de usuário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Digite o nome completo"
              />
              {/* Mensagem de erro de validação */}
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            {/* Campo de email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Digite o email"
              />
              {/* Mensagem de erro de validação */}
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            {/* Campo de URL do avatar */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                URL do Avatar
              </label>
              <input
                id="avatar"
                type="text"
                {...register('avatar')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.avatar ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="https://exemplo.com/avatar.jpg"
              />
              {/* Mensagem de erro de validação */}
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
              )}
            </div>
            
            {/* Campos de papel e status em layout de grade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo de seleção de papel */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Papel
                </label>
                <select
                  id="role"
                  {...register('role')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.role ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
                {/* Mensagem de erro de validação */}
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>
              
              {/* Campo de seleção de status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.status ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
                {/* Mensagem de erro de validação */}
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>
            </div>
            
            {/* Botões de ação do formulário */}
            <div className="flex justify-end space-x-3 pt-4">
              {/* Botão de cancelar */}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 bg-none py-2 border border-gray-300 rounded-md text-gray-700"
              >
                Cancelar
              </button>
              {/* Botão de enviar com indicador de carregamento */}
              <button
                type="submit"
                disabled={submitLoading}
                className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center ${
                  submitLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {/* Ícone de carregamento animado */}
                {submitLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isEditMode ? 'Atualizar' : 'Criar'} Usuário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
