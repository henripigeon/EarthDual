"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function ClassSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Detect language (default to English if none)
  const lang = (searchParams.get("lang") as "en" | "fr") || "en";

  // State for the class/section input
  const [sectionInput, setSectionInput] = useState("");

  // Simple translations
  const translations = {
    en: {
      title: "Class Setup",
      placeholder: "Enter your class/section name",
      nextButton: "Next",
    },
    fr: {
      title: "Configuration de la Classe",
      placeholder: "Entrez le nom de votre classe/section",
      nextButton: "Suivant",
    },
  };

  const handleNext = () => {
    // Require the user to input a section before proceeding
    if (!sectionInput) return;

    // Pass the language and section to the next page (Game Setup)
    router.push(`/game-setup?lang=${lang}&section=${sectionInput}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/earth-split-bg2.jpg')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Main Container */}
      <motion.div
        className="z-10 bg-black bg-opacity-50 p-10 rounded-lg shadow-xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">{translations[lang].title}</h1>

        {/* Class/Section Input */}
        <input
          type="text"
          placeholder={translations[lang].placeholder}
          value={sectionInput}
          onChange={(e) => setSectionInput(e.target.value)}
          className="mt-4 px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-white text-lg hover:bg-blue-700 transition"
        >
          {translations[lang].nextButton}
        </button>
      </motion.div>
    </div>
  );
}

export default function ClassSetupPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ClassSetupContent />
    </Suspense>
  );
}
