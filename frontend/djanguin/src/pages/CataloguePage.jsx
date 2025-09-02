
import React from 'react';
import { Link } from 'react-router-dom'; 

function CataloguePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Catalogue des Livres</h1>
        
        {/* Le bouton "Ajouter un nouveau livre" */}
        <Link 
          to="/AddBookForm" // Assurez-vous que cette route correspond à celle de votre formulaire
          className="btn-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          Ajouter un nouveau livre
        </Link>
      </div>
      
      {/* Ajoutez ici le contenu de votre page de catalogue (liste de livres, filtres, etc.) */}
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-500">
          Votre catalogue est en cours de construction. <br />
          Ajoutez votre premier livre en cliquant sur le bouton ci-dessus.
        </p>
      </div>
      
    </div>
  );
}

export default CataloguePage;