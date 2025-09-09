import React from "react";
import "./StepIndicator.css";

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Informations générales" },
    { id: 2, label: "Contenu" },
    { id: 3, label: "Publication" },
  ];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={step.id} className="step-item">
          {/* Cercle de l’étape */}
          <div
            className={`step-circle ${
              currentStep === step.id
                ? "active"
                : currentStep > step.id
                ? "completed"
                : ""
            }`}
          >
            {currentStep > step.id ? "✔" : step.id}
          </div>

          {/* Label */}
          <span
            className={`step-label ${
              currentStep === step.id ? "active-label" : ""
            }`}
          >
            {step.label}
          </span>

          {/* Barre de progression entre les étapes */}
          {index < steps.length - 1 && (
            <div
              className={`step-line ${
                currentStep > step.id ? "line-filled" : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
