"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";

const aboutContent = {
  en: {
    title: "About the Game: Save the Earth",
    description: `Save the Earth is a fun and educational game where two teams work together to help the planet! Each team will make decisions on how to protect the Earth from pollution, save animals, and use clean energy.

How to Play
Two Teams: Both teams are trying to help the Earth. The team that makes the best decisions each round wins that round!
Make Choices: Each round, you’ll pick a card with an action like planting trees, recycling, or using clean energy. The team with the best action for the planet wins the round.
Win the Game: After several rounds, the team with the most wins is the overall winner of the game!
Learn & Play: Have fun while learning how we can protect our world!`
  },
  fr: {
    title: "À propos du jeu : Sauver la Terre",
    description: `Sauver la Terre est un jeu amusant et éducatif où deux équipes travaillent ensemble pour aider la planète! Chaque équipe prendra des décisions pour protéger la Terre de la pollution, sauver les animaux et utiliser de l'énergie propre.

Comment Jouer
Deux équipes : Les deux équipes essaient d'aider la Terre. L'équipe qui prend la meilleure décision chaque tour gagne ce tour!
Faites des choix : À chaque tour, vous choisirez une carte avec une action comme planter des arbres, recycler ou utiliser de l'énergie propre. L'équipe ayant la meilleure action pour la planète gagne le tour.
Gagner le jeu : Après plusieurs tours, l'équipe qui a gagné le plus de tours est la gagnante du jeu!
Apprendre et jouer : Amusez-vous tout en apprenant comment protéger notre monde!`
  }
};

function AboutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as "en" | "fr") || "en";
  const content = aboutContent[lang];

  const backButtonText = lang === "fr" ? "Retour à l'accueil" : "Back to Home";
  const toggleButtonText = lang === "fr" ? "Passer en anglais" : "Switch to French";

  // Split the description text into paragraphs using a double line break
  const paragraphs = content.description.split("\n\n");

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "fr" : "en";
    router.push(`/about?lang=${newLang}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white font-sans">
      {/* Optional subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative z-10 p-8 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-white text-blue-700 font-bold rounded-full shadow-md hover:shadow-xl transition"
          >
            {backButtonText}
          </button>
          <button
            onClick={toggleLanguage}
            className="px-6 py-3 bg-white text-blue-700 font-bold rounded-full shadow-md hover:shadow-xl transition"
          >
            {toggleButtonText}
          </button>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center mb-10"
        >
          {content.title}
        </motion.h1>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl bg-white bg-opacity-20 p-8 rounded-xl shadow-lg"
        >
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-xl leading-relaxed mb-6">
              {para}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}
