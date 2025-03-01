"use client";

/* eslint-disable react-hooks/exhaustive-deps */ // if needed

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Example translations
const translations = {
  en: {
    title: "Team Setup",
    sectionLabel: "Section",
    team1Name: "Team 1 Name",
    team2Name: "Team 2 Name",
    team1Count: "Number of Members (Team 1)",
    team2Count: "Number of Members (Team 2)",
    teamMember: "Member Name",
    startGame: "Start Game",
    confirmLang: "Confirm language selection?",
  },
  fr: {
    title: "Configuration des Équipes",
    sectionLabel: "Classe",
    team1Name: "Nom de l'Équipe 1",
    team2Name: "Nom de l'Équipe 2",
    team1Count: "Nombre de membres (Équipe 1)",
    team2Count: "Nombre de membres (Équipe 2)",
    teamMember: "Nom du membre",
    startGame: "Commencer le Jeu",
    confirmLang: "Confirmer la sélection de la langue ?",
  },
};

function GameSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as "en" | "fr") || "en";
  const t = translations[lang];

  const [section, setSection] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [team1Count, setTeam1Count] = useState<number>(0);
  const [team2Count, setTeam2Count] = useState<number>(0);
  const [team1Members, setTeam1Members] = useState<string[]>([]);
  const [team2Members, setTeam2Members] = useState<string[]>([]);

  // Update arrays if the count changes
  useEffect(() => {
    setTeam1Members(Array(team1Count).fill(""));
  }, [team1Count]);

  useEffect(() => {
    setTeam2Members(Array(team2Count).fill(""));
  }, [team2Count]);

  const updateTeam1Member = (index: number, value: string) => {
    setTeam1Members((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const updateTeam2Member = (index: number, value: string) => {
    setTeam2Members((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleStartGame = () => {
    // Simple validation
    if (!section || !team1Name || !team2Name) {
      alert("Please fill out Section and both team names!");
      return;
    }
    // Could also check if we want at least 1 member, etc.
    router.push(
      `/game?lang=${lang}&section=${encodeURIComponent(
        section
      )}&team1=${encodeURIComponent(team1Name)}&team2=${encodeURIComponent(
        team2Name
      )}&members1=${encodeURIComponent(team1Members.join(","))}&members2=${encodeURIComponent(
        team2Members.join(",")
      )}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative bg-gray-900 bg-cover bg-center"
         style={{ backgroundImage: "url('/earth-split-bg2.jpg')" }}
    >
      <motion.div
        className="z-10 bg-black bg-opacity-60 p-10 rounded-lg shadow-2xl text-center max-w-4xl w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-8">{t.title}</h1>

        {/* Section */}
        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">
            {t.sectionLabel}
          </label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder={t.sectionLabel}
            className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team 1 */}
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-semibold mb-2">
                {t.team1Name}
              </label>
              <input
                type="text"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                placeholder={t.team1Name}
                className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2">
                {t.team1Count}
              </label>
              <input
                type="number"
                min={0}
                value={team1Count}
                onChange={(e) => setTeam1Count(Number(e.target.value))}
                placeholder="0"
                className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {team1Members.map((member, idx) => (
              <div key={idx}>
                <label className="block text-xl font-semibold mb-2">
                  {t.teamMember} {idx + 1}
                </label>
                <input
                  type="text"
                  value={member}
                  onChange={(e) => updateTeam1Member(idx, e.target.value)}
                  placeholder={`${t.teamMember} ${idx + 1}`}
                  className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Team 2 */}
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-semibold mb-2">
                {t.team2Name}
              </label>
              <input
                type="text"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                placeholder={t.team2Name}
                className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2">
                {t.team2Count}
              </label>
              <input
                type="number"
                min={0}
                value={team2Count}
                onChange={(e) => setTeam2Count(Number(e.target.value))}
                placeholder="0"
                className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {team2Members.map((member, idx) => (
              <div key={idx}>
                <label className="block text-xl font-semibold mb-2">
                  {t.teamMember} {idx + 1}
                </label>
                <input
                  type="text"
                  value={member}
                  onChange={(e) => updateTeam2Member(idx, e.target.value)}
                  placeholder={`${t.teamMember} ${idx + 1}`}
                  className="w-full p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartGame}
          className="w-full mt-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-100 transition"
        >
          {t.startGame}
        </button>
      </motion.div>
    </div>
  );
}

export default function GameSetupPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <GameSetupContent />
    </Suspense>
  );
}
