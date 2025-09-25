// src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ 1. Importer le composant Link
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-white text-[#0d1117] py-10 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1 - Logo + Description + Réseaux sociaux */}
        <div>
          <h2 className="text-[#0d1117] text-lg font-bold mb-2">Dianguin</h2>
          <p className="text-sm leading-relaxed mb-4">
            La première bibliothèque numérique de Guinée, dédiée à la promotion et à la
            préservation du patrimoine littéraire guinéen et africain.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>

        {/* Section 2 - Liens rapides */}
        <div>

          <h3 className="text-black font-semibold mb-3">Liens Rapides</h3>
          <ul className="space-y-2">
            {/* ✅ 2. Remplacer <a> par <Link> et href par to */}
            <li><Link to="/CataloguePage" className="hover:text-blue-600">Catalogue</Link></li>
            <li><Link to="/AuteurPage" className="hover:text-blue-600">Auteurs Guinéens</Link></li>
            <li><Link to="/CataloguePage" className="hover:text-blue-600">Nouveautés</Link></li>
            <li><Link to="/ActualitesPage" className="hover:text-blue-600">Actualités</Link></li>
          </ul>
        </div>

        {/* Section 3 - Support */}
        <div>
          <h3 className="text-black font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/FAQ" className="hover:text-blue-600">FAQ</Link></li>
            <li><Link to="/GuideUtilisation" className="hover:text-blue-600">Guide d’utilisation</Link></li>
            <li><Link to="/PourLesAuteurs" className="hover:text-blue-600">Pour les Auteurs</Link></li>
            <li><Link to="/FAQ#formulaire-contact" className="hover:text-blue-600">Nous Contacter</Link></li>
          </ul>
        </div>
      </div>

      {/* Ligne contact + copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex flex-col md:flex-row md:space-x-6 mb-4 md:mb-0">
          <a href="mailto:nenettediallo94@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <MdEmail />nenettediallo94@gmail.com
          </a>
          <a href="https://wa.me/224622561090" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <MdPhone /> +224 622 56 10 90
          </a>
          <p className="flex items-center gap-2"><MdLocationOn /> Conakry, Guinée</p>
        </div>
        <p className="text-gray-400 text-center">
          © 2025 Dianguin. Tous droits réservés. Fait avec ❤️ pour la Guinée.
        </p>
      </div>
    </footer>
  );
}
