import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelection() {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'admin') {
            navigate('/AdminLogin');
        } else {
            // Pour 'auteur' et 'abonné', on redirige vers la page de connexion générale
            navigate('/connexion');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Vous êtes ?</h2>
                <div className="space-y-4">
                    <button
                        onClick={() => handleRoleSelection('auteur')}
                        className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
                    >
                        Auteur ou Abonné
                    </button>
                    <button
                        onClick={() => handleRoleSelection('admin')}
                        className="w-full bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
                    >
                        Administrateur
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoleSelection;
