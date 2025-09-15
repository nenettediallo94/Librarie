import { useState } from "react";
import { MdEmail, MdPhone, MdChat } from "react-icons/md";

const faqData = [
  { category: "Utilisation", question: "Comment puis-je lire un livre sur Djanguin ?", answer: "Vous pouvez lire un livre en vous inscrivant, en parcourant le catalogue et en cliquant sur 'Lire'." },
  { category: "Tarification", question: "Djanguin est-il gratuit ?", answer: "L’accès de base est gratuit, mais certains contenus premium peuvent nécessiter un abonnement." },
  { category: "Technique", question: "Ai-je besoin d'une connexion internet ?", answer: "Oui, une connexion internet est nécessaire pour accéder à la bibliothèque." },
  { category: "Utilisation", question: "Comment ajouter un livre à mes favoris ?", answer: "Cliquez sur l’icône 'favori' dans la fiche du livre." },
  { category: "Auteurs", question: "Comment publier mon livre sur Djanguin ?", answer: "Soumettez votre manuscrit via la section 'Pour les Auteurs' après connexion." },
  { category: "Contenu", question: "Y-a-t-il des livres en langues locales ?", answer: "Oui, Djanguin propose aussi des œuvres en langues locales guinéennes et africaines." },
  { category: "Compte", question: "Comment fonctionne la gestion de mon compte ?", answer: "Vous pouvez modifier vos informations dans la section 'Mon Compte'." },
  { category: "Technique", question: "Djanguin fonctionne-t-il sur mobile ?", answer: "Oui, Djanguin est accessible sur smartphone, tablette et ordinateur." }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#f9f9ff]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Titre */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
          ❓ Questions Fréquentes
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Trouvez rapidement les réponses à vos questions sur Djanguin
        </p>

        {/* Accordéon FAQ */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl border border-gray-200"
            >
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-700 font-medium"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-purple-600 text-sm font-semibold mr-2">
                  {faq.category}
                </span>
                <span className="flex-1">{faq.question}</span>
                <span className="ml-2 text-gray-500">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bloc contact */}
        <div className="mt-10 bg-white border border-gray-200 shadow-md rounded-xl p-6 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe est là pour vous aider. N’hésitez pas à nous contacter :
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-gray-700">
            <p className="flex items-center gap-2"><MdChat /> Chat en direct</p>
            <p className="flex items-center gap-2"><MdEmail /> support@dianguin.gn</p>
            <p className="flex items-center gap-2"><MdPhone /> +224 XX XX XX XX</p>
          </div>
        </div>
      </div>
    </section>
  );
}
