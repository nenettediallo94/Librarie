import './App.css';
import Header from './components/Header';

import Main from './components/main';


function App() {
  return (
    <div className="flex flex-col min-h-screen mt-20">
      <Header />
      <main className="flex-grow">
        <Main />
      </main>
    </div>
  );
}

//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow">
          
//             {/* Ajoutez les autres routes ici */}
        
//         </main>
//       </div>
   
//   );
// }

export default App;