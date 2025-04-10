/**
 * Componente Pagination
 * 
 * Este componente implementa uma interface de paginação para navegação entre páginas de conteúdo.
 * Ele exibe botões para navegar entre páginas, com tratamento especial para muitas páginas,
 * mostrando elipses (...) quando necessário para melhorar a experiência do usuário.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {number} props.currentPage - Página atual selecionada
 * @param {number} props.totalPages - Número total de páginas disponíveis
 * @param {Function} props.onPageChange - Função chamada quando uma página é selecionada
 * @returns {JSX.Element} Componente de paginação
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Array para armazenar todos os números de página
  const pages = [];
  
  // Gera números de página de 1 até o total de páginas
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  // Array para armazenar as páginas que serão exibidas na interface
  let pagesToShow = [];
  
  // Limita as páginas exibidas para melhorar a experiência do usuário
  if (totalPages <= 5) {
    // Se houver 5 ou menos páginas, mostra todas
    pagesToShow = pages;
  } else {
    // Lógica para mostrar um subconjunto de páginas com elipses
    if (currentPage <= 3) {
      // Se estiver nas primeiras páginas, mostra as 5 primeiras, elipse e a última
      pagesToShow = [...pages.slice(0, 5), '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      // Se estiver nas últimas páginas, mostra a primeira, elipse e as 5 últimas
      pagesToShow = [1, '...', ...pages.slice(totalPages - 5)];
    } else {
      // Se estiver no meio, mostra a primeira, elipse, páginas ao redor da atual, elipse e a última
      pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }
  
  return (
    <div className="flex justify-center mt-6">
      <nav className="flex space-x-1">
        {/* Botão para navegar para a página anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1} // Desabilita o botão na primeira página
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Estilo quando desabilitado
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Estilo quando habilitado
          }`}
          title="Ir para a página anterior"
        >
          Anterior
        </button>
        
        {/* Mapeia e renderiza os botões de página ou elipses */}
        {pagesToShow.map((page, index) => (
          page === '...' ? (
            // Renderiza elipse para indicar páginas omitidas
            <span key={`elipse-${index}`} className="px-3 py-1">...</span>
          ) : (
            // Renderiza botão para cada número de página
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white' // Estilo para a página atual
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Estilo para outras páginas
              }`}
              title={`Ir para a página ${page}`}
            >
              {page}
            </button>
          )
        ))}
        
        {/* Botão para navegar para a próxima página */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // Desabilita o botão na última página
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Estilo quando desabilitado
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Estilo quando habilitado
          }`}
          title="Ir para a próxima página"
        >
          Próxima
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
