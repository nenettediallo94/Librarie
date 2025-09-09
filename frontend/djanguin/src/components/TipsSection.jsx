import React from "react";

export default function TipsSection() {
  const tips = [
    "Choisissez un titre accrocheur et mémorable",
    "Rédigez une description captivante de 200-300 mots",
    "Utilisez une couverture de haute qualité",
    "Ajoutez des mots-clés pertinents pour la recherche",
  ];

  return (
    <div className="tips-section" style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
      <h3>💡 Conseils pour votre livre</h3>
      <ul>
        {tips.map((tip, i) => (
          <li key={i} style={{ marginBottom: "8px" }}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
