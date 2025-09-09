// import './App.css';
// import Header from './components/Header';

// import Main from './components/main';


// function App() {
//   return (
//     <div className="flex flex-col min-h-screen mt-20">
//       <Header />
//       <main className="flex-grow">
//         <Main />
//       </main>
//     </div>
//   );
// }


// export default App;


// App.js
import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/main';


function App() {
  const location = useLocation();

  // On vérifie si le chemin actuel est celui du formulaire.
  // Assurez-vous que le chemin est bien "/AjouterLivre" comme dans votre main.js
  const isFormPage = location.pathname === '/AjouterLivre';

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Rendu conditionnel : on affiche le Header seulement si ce n'est PAS la page du formulaire */}
      {!isFormPage && <Header />}
      <main className="flex-grow">
        <Main />
      </main>
    </div>
  );
}


export default App; // On exporte simplement le composant App