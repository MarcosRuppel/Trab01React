// frontend/src/pages/About.jsx

import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 text-indigo-800">
          <h1 className="text-2xl font-bold mb-4">Sobre</h1>
          <p className="text-lg text-gray-800">
            Sistema desenvolvido por <strong>Marcos Paulo Ruppel</strong> para a disciplina de <italic>Experiência Criativa - Inovando Colaborativamente</italic>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
