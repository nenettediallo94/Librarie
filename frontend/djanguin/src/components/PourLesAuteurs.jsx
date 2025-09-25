import { useState } from 'react';
import { FaGlobeAfrica, FaMoneyBillWave, FaRocket, FaUserPlus, FaPaperPlane, FaBookOpen } from 'react-icons/fa';

const auteurFaqData = [
  { question: "Quels sont les critères de sélection ?", answer: "Nous recherchons des œuvres originales qui célèbrent la culture guinéenne et africaine, avec une attention particulière à la qualité de l'écriture et à la pertinence du sujet." },
  { question: "Comment fonctionne la rémunération ?", answer: "Nous proposons un modèle de partage des revenus transparent et compétitif. Les détails précis sont communiqués lors de la signature du contrat de publication." },
  { question: "Quels formats de fichiers acceptez-vous ?", answer: "Nous acceptons les manuscrits aux formats .docx (Microsoft Word) et .pdf. Assurez-vous que le fichier est bien lisible." },
  { question: "Puis-je publier un livre déjà édité ailleurs ?", answer: "Cela dépend des droits que vous avez cédés à votre précédent éditeur. Vous devez vous assurer de détenir les droits de publication numérique pour votre œuvre." },
  { question: "Comment puis-je suivre mes ventes ?", answer: "Une fois votre livre publié, vous aurez accès à un tableau de bord auteur où vous pourrez suivre vos ventes et vos revenus en temps réel." },
];

export default function PourLesAuteurs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    nomAuteur: '',
    email: '',
    categorie: '',
    resume: '',
    biographie: '',
    manuscrit: null,
  });
  const [formStatus, setFormStatus] = useState({ message: '', error: false, loading: false });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, manuscrit: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ message: 'Envoi en cours...', error: false, loading: true });
    // Ici, vous implémenteriez la logique d'envoi du formulaire
    // (par exemple, avec FormData pour envoyer le fichier au backend)
    console.log(formData);
    // Simuler un appel API
    setTimeout(() => {
      setFormStatus({ message: 'Votre manuscrit a bien été soumis ! Notre comité de lecture vous contactera bientôt.', error: false, loading: false });
      setFormData({ titre: '', nomAuteur: '', email: '', categorie: '', resume: '', biographie: '', manuscrit: null });
      e.target.reset(); // Vider le champ de fichier
    }, 2000);
  };

  return (
    <div className="bg-[#f9f9ff]">
      {/* 1. Bannière d'Accueil */}
      <section className="bg-[#696869] text-black text-center py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Publiez votre œuvre sur Djanguin</h1>
          <p className="text-lg mb-8">
            Donnez une voix à vos écrits et touchez des milliers de lecteurs passionnés par la culture guinéenne et africaine.
          </p>
          <a href="#formulaire-soumission" className="bg-white text-[#160216] font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition">
            Soumettre mon manuscrit
          </a>
        </div>
      </section>

      {/* 2. Pourquoi Publier sur Djanguin ? */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Pourquoi nous rejoindre ?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <FaGlobeAfrica className="text-4xl text-purple-700 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Audience Ciblée</h3>
              <p className="text-gray-600">Accédez à un public passionné par la littérature africaine, en Guinée et dans le monde.</p>
            </div>
            <div className="p-6">
              <FaMoneyBillWave className="text-4xl text-purple-700 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Rémunération Juste</h3>
              <p className="text-gray-600">Profitez d'un modèle de revenus transparent et équitable pour récompenser votre talent.</p>
            </div>
            <div className="p-6">
              <FaRocket className="text-4xl text-purple-700 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Visibilité Accrue</h3>
              <p className="text-gray-600">Bénéficiez de nos actions de promotion pour faire connaître votre travail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comment ça Marche ? */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Le Processus de Publication</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center">
              <FaUserPlus className="text-5xl text-purple-700 mx-auto mb-3" />
              <h4 className="font-bold">1. Soumettez</h4>
              <p className="text-sm text-gray-600">Remplissez le formulaire et envoyez-nous votre manuscrit.</p>
            </div>
            <div className="text-gray-300 text-2xl hidden md:block">→</div>
            <div className="text-center">
              <FaBookOpen className="text-5xl text-purple-700 mx-auto mb-3" />
              <h4 className="font-bold">2. Évaluation</h4>
              <p className="text-sm text-gray-600">Notre comité de lecture étudie votre œuvre avec attention.</p>
            </div>
            <div className="text-gray-300 text-2xl hidden md:block">→</div>
            <div className="text-center">
              <FaPaperPlane className="text-5xl text-purple-700 mx-auto mb-3" />
              <h4 className="font-bold">3. Publication</h4>
              <p className="text-sm text-gray-600">Si acceptée, nous signons un contrat et publions votre livre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Formulaire de Soumission */}
      <section id="formulaire-soumission" className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Soumettez votre Manuscrit</h2>
          <p className="text-center text-gray-600 mb-8">Nous sommes impatients de vous lire !</p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <input type="text" name="titre" value={formData.titre} onChange={handleInputChange} placeholder="Titre de l'œuvre" required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="flex flex-col sm:flex-row gap-6">
              <input type="text" name="nomAuteur" value={formData.nomAuteur} onChange={handleInputChange} placeholder="Votre nom d'auteur" required className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Votre e-mail de contact" required className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <select name="categorie" value={formData.categorie} onChange={handleInputChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Sélectionnez un genre...</option>
              <option value="Roman">Roman</option>
              <option value="Poésie">Poésie</option>
              <option value="Essai">Essai</option>
              <option value="Conte">Conte</option>
              <option value="Théâtre">Théâtre</option>
              <option value="Nouvelle">Nouvelle</option>
              <option value="Autre">Autre</option>
            </select>
            <textarea name="resume" value={formData.resume} onChange={handleInputChange} placeholder="Résumé de l'œuvre (synopsis)" rows="4" required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            <textarea name="biographie" value={formData.biographie} onChange={handleInputChange} placeholder="Votre biographie (quelques lignes)" rows="3" required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            <div>
              <label htmlFor="manuscrit" className="block text-sm font-medium text-gray-700 mb-2">Votre manuscrit (.pdf, .docx)</label>
              <input type="file" name="manuscrit" id="manuscrit" onChange={handleFileChange} required accept=".pdf,.doc,.docx" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"/>
            </div>
            <div className="flex items-start">
                <input id="droits" name="droits" type="checkbox" required className="h-4 w-4 text-purple-700 border-gray-300 rounded focus:ring-purple-500 mt-1" />
                <div className="ml-3 text-sm">
                    <label htmlFor="droits" className="text-gray-600">Je certifie être le détenteur des droits d'auteur de cette œuvre.</label>
                </div>
            </div>
            <button type="submit" disabled={formStatus.loading} className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition disabled:bg-gray-400 font-bold">
              {formStatus.loading ? 'Envoi...' : 'Envoyer mon manuscrit'}
            </button>
            {formStatus.message && <p className={`mt-4 text-sm ${formStatus.error ? 'text-red-600' : 'text-green-600'}`}>{formStatus.message}</p>}
          </form>
        </div>
      </section>

      {/* 5. FAQ des Auteurs */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Questions des Auteurs</h2>
          <div className="space-y-4">
            {auteurFaqData.map((faq, index) => (
              <div key={index} className="bg-white shadow-md rounded-xl border border-gray-200">
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 font-medium"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex-1">{faq.question}</span>
                  <span className="ml-2 text-gray-500 text-xl">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}