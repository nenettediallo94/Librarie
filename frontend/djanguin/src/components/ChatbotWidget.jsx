import { useState } from 'react';
import { MdChat, MdClose, MdHelpOutline, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Si le chat est fermé, on affiche juste le bouton
  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 z-50 bg-[#160216] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-800 transition-transform transform hover:scale-110"
        aria-label="Ouvrir le chat d'aide"
      >
        <MdChat size={28} />
      </button>
    );
  }

  // Si le chat est ouvert, on affiche la fenêtre complète
  return (
    <div className="fixed bottom-5 right-5 z-50 w-80 bg-white rounded-xl shadow-2xl transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="bg-[#160216] text-white p-4 rounded-t-xl flex justify-between items-center">
        <h3 className="font-bold">Besoin d'aide ?</h3>
        <button onClick={toggleChat} className="text-white hover:text-gray-300" aria-label="Fermer le chat d'aide">
          <MdClose size={24} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-gray-700 mb-4 text-sm text-center">Consultez nos ressources ou contactez-nous directement.</p>
        <div className="space-y-3">
          <Link to="/FAQ" onClick={toggleChat} className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg w-full text-left text-sm font-medium text-gray-800">
            <MdHelpOutline className="text-purple-700" size={20} />
            <span>Consulter la FAQ</span>
          </Link>
          <Link to="/FAQ#formulaire-contact" onClick={toggleChat} className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg w-full text-left text-sm font-medium text-gray-800">
            <MdEmail className="text-purple-700" size={20} />
            <span>Nous envoyer un e-mail</span>
          </Link>
          <a
            href="https://wa.me/224622561090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg w-full text-left text-sm font-medium text-gray-800"
          >
            <FaWhatsapp className="text-green-500" size={20} />
            <span>Discuter sur WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}