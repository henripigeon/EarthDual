"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function RulesContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as "en" | "fr") || "en"; // Ensure TypeScript safety

  const rules: Record<"en" | "fr", { title: string; objective: string; defenders: string; destroyers: string; setup: string; winning: string; win_defenders: string; win_destroyers: string }> = {
    en: {
      title: "Game Rules: Earth’s Fate",
      objective: "Objective",
      defenders: "Team Earth Defenders: Save the Earth and extend its lifespan to at least the year 3000.",
      destroyers: "Team Earth Destroyers: Deplete Earth’s lifespan as fast as possible.",
      setup: "The game starts in 2025 with Earth's lifespan set at 200 years...",
      winning: "Winning Conditions",
      win_defenders: "If Earth reaches 3000: Earth Defenders win.",
      win_destroyers: "If Earth’s lifespan hits 0: Earth Destroyers win.",
    },
    fr: {
      title: "Règles du jeu : Le Destin de la Terre",
      objective: "Objectif",
      defenders: "Équipe des Sauveurs de la Terre : Sauver la Terre et prolonger sa durée de vie jusqu'à l'an 3000.",
      destroyers: "Équipe des Destructeurs de la Terre : Détruire la Terre et réduire sa durée de vie aussi rapidement que possible.",
      setup: "Le jeu commence en 2025 avec une espérance de vie de la Terre de 200 ans...",
      winning: "Conditions de victoire",
      win_defenders: "Si la Terre atteint l’an 3000 : Victoire des Sauveurs.",
      win_destroyers: "Si l’espérance de vie de la Terre tombe à 0 : Victoire des Destructeurs.",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/earth-split-bg2.jpg')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="z-10 bg-black bg-opacity-60 p-10 rounded-lg text-center shadow-xl max-w-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">{rules[lang]?.title}</h1>
        <h2 className="text-2xl font-bold mt-4">{rules[lang]?.objective}</h2>
        <p className="mt-2">{rules[lang]?.defenders}</p>
        <p className="mt-2">{rules[lang]?.destroyers}</p>
        <p className="mt-2">{rules[lang]?.setup}</p>
        <h2 className="text-2xl font-bold mt-4">{rules[lang]?.winning}</h2>
        <p className="mt-2">{rules[lang]?.win_defenders}</p>
        <p className="mt-2">{rules[lang]?.win_destroyers}</p>
      </motion.div>
    </div>
  );
}
