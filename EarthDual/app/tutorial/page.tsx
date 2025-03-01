"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TutorialScenario() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/tutbg-02.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="z-10 bg-black bg-opacity-50 p-10 rounded-lg shadow-xl text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">Game Tutorial</h1>
        <p className="text-lg mb-4">
          In each round, you will see a scenario appear here. Your team must
          choose a card to play that will influence Earth’s future.
        </p>
        <p className="text-lg mb-4">
          The left side of the screen represents the negative impact, while the
          right side represents the positive impact of your choices.
        </p>
        <p className="text-lg mb-4">
          Pay attention to hints, as they may help you make better decisions!
        </p>
        <button
          onClick={() => router.push("/game-setup")}
          className="mt-6 px-6 py-3 bg-green-600 rounded-lg text-white text-lg hover:bg-green-700 transition"
        >
          I Understand
        </button>
      </motion.div>
    </div>
  );
}
