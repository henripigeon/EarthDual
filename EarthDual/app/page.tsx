"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // <-- Import Link for the header
import { motion, AnimatePresence } from "framer-motion";

// Basic translations for the landing page & confirm modal
const landingTranslations = {
  en: {
    welcome: "Welcome to Earth's Fate",
    chooseLang: "Choose your preferred language to begin.",
    english: "English",
    french: "Français",
    confirmTitle: "Confirm Language",
    confirmMessage: "Are you sure you want to use English?",
    confirmButton: "Confirm",
    cancelButton: "Cancel",
  },
  fr: {
    welcome: "Bienvenue dans Le Destin de la Terre",
    chooseLang: "Choisissez votre langue préférée pour commencer.",
    english: "Anglais",
    french: "Français",
    confirmTitle: "Confirmer la langue",
    confirmMessage: "Voulez-vous vraiment utiliser le Français ?",
    confirmButton: "Confirmer",
    cancelButton: "Annuler",
  },
};

export default function HomePage() {
  const router = useRouter();

  // Default UI text to English. If user picks French, we flip the text in the modal.
  const [pendingLang, setPendingLang] = useState<"en" | "fr" | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // Decide which translations to show in the confirm popup
  const t = pendingLang === "fr" ? landingTranslations.fr : landingTranslations.en;

  function handleChooseLang(lang: "en" | "fr") {
    setPendingLang(lang);
    setShowConfirm(true);
  }

  function confirmLanguage() {
    if (!pendingLang) return;
    // Push to the game-setup page with the chosen lang
    router.push(`/game-setup?lang=${pendingLang}`);
  }

  function cancelLanguage() {
    // Close the modal
    setShowConfirm(false);
    setPendingLang(null);
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* ────────────── HEADER with Cards, Leaderboard, About ────────────── */}
      <header className="relative z-20 bg-gray-800 bg-opacity-90 w-full p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Earth's Fate</h1>
        <nav className="space-x-6">
          <Link href="/cards" className="hover:underline">
            Cards
          </Link>
          <Link href="/leaderboard" className="hover:underline">
            Leaderboard
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </header>
      {/* ──────────────────────────────────────────────────────────────────── */}

      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/earth-split-bg2.jpg')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 bg-black bg-opacity-0">
        <div className="text-center max-w-md w-full shadow-2xl p-6 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">
            {landingTranslations.en.welcome} / {landingTranslations.fr.welcome}
          </h2>
          <p className="text-lg mb-6">
            {landingTranslations.en.chooseLang}
            <br />
            {landingTranslations.fr.chooseLang}
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleChooseLang("en")}
              className="px-6 py-3 bg-green-600 rounded-lg text-white text-lg hover:bg-green-700 transition"
            >
              {landingTranslations.en.english}
            </button>
            <button
              onClick={() => handleChooseLang("fr")}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white text-lg hover:bg-blue-700 transition"
            >
              {landingTranslations.fr.french}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            key="confirmModal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black rounded-lg shadow-lg p-6 max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">{t.confirmTitle}</h2>
              <p className="mb-6">{t.confirmMessage}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelLanguage}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  {t.cancelButton}
                </button>
                <button
                  onClick={confirmLanguage}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {t.confirmButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
