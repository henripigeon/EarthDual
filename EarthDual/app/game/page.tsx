"use client";

/* eslint-disable @next/next/no-img-element */ // Disable Next.js warning for <img>

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const topBarTranslations = {
  en: {
    teamXCards: "CARDS",
  },
  fr: {
    teamXCards: "CARTES",
  },
};

// --- NEW RANKING DATA ---
// For each scenario ID, only the cards listed here are valid.
// Ranking order: lower index means higher ranking.
const newScenarioRankings: { [id: number]: string[] } = {
  1: [
    "V78", "A12", "J90", "L45", "U56", "O23", "N90", "K34", "L56", "Z67",
    "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67", "Y45",
    "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  2: [
    "V78", "U56", "A12", "L45", "J90", "O23", "K34", "L56", "N90", "Z67",
    "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67", "Y45",
    "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  3: [
    "V78", "L45", "U56", "A12", "J90", "O23", "K34", "L56", "N90", "Z67",
    "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67", "Y45",
    "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  4: [
    "A12", "W90", "X23", "U56", "J90", "Q67", "P45", "O23", "V78", "T34",
    "S12", "R89", "Y45", "N90", "K34", "L56", "Z67", "E23", "G67", "F45",
    "H89", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89", "B34",
    "C56", "D78", "H56", "J12", "K23", "M78", "L45"
  ],
  5: [
    "V78", "U56", "L45", "A12", "J90", "O23", "K34", "L56", "N90", "Z67",
    "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67", "Y45",
    "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  6: [
    "V78", "U56", "A12", "J90", "O23", "L45", "K34", "L56", "N90", "Z67",
    "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67", "Y45",
    "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  7: [
    "L45", "A90", "B23", "C45", "V78", "U56", "A12", "J90", "O23", "N90",
    "K34", "L56", "Z67", "E23", "G67", "F45", "H89", "T34", "S12", "R89",
    "P45", "Q67", "Y45", "W90", "X23", "F12", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  8: [
    "V78", "U56", "A12", "J90", "L45", "O23", "K34", "L56", "N90", "Z67",
    "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67", "Y45",
    "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J12", "K23", "M78"
  ],
  9: [
    "W90", "X23", "F12", "A12", "U56", "O23", "Q67", "P45", "Y45", "R89",
    "S12", "T34", "N90", "K34", "L56", "Z67", "M78", "J90", "L45", "A90",
    "B23", "C45", "D67", "G34", "I78", "E89", "B34", "C56", "D78", "H56",
    "J12", "E23", "G67", "F45", "H89", "K23", "M78"
  ],
  10: [
    "V78", "A12", "W90", "X23", "U56", "J90", "Q67", "P45", "O23", "Y45",
    "T34", "S12", "R89", "N90", "K34", "L56", "Z67", "M78", "E23", "G67",
    "F45", "H89", "F12", "A90", "B23", "C45", "D67", "G34", "B34", "C56",
    "D78", "J12", "E89", "H56", "I78", "K23", "L45"
  ],
  11: [
    "U56", "V78", "T34", "S12", "R89", "O23", "J90", "A12", "K34", "L56",
    "N90", "Z67", "E23", "G67", "F45", "H89", "P45", "Q67", "Y45", "W90",
    "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78", "E89", "B34",
    "C56", "D78", "H56", "J12", "K23", "M78", "L45"
  ],
  12: [
    "F12", "W90", "X23", "A12", "G67", "E23", "F45", "H89", "U56", "O23",
    "N90", "K34", "L56", "Z67", "M78", "J90", "Q67", "P45", "Y45", "T34",
    "S12", "R89", "B34", "C56", "D78", "D67", "G34", "C45", "A90", "B23",
    "I78", "E89", "H56", "J12", "K23", "L45", "M78"
  ],
  13: [
    "J12", "S1053", "T2296", "Q67", "R89", "F45", "A12", "J90", "L56", "U56",
    "Z67", "Y45", "X23", "W90", "V78", "Q67", "P45", "O23", "N90", "M78",
    "K34", "L45", "J12", "H89", "G67", "F45", "E89", "D78", "C56", "B34",
    "A90", "M78", "K23", "D67", "C45", "B23", "S12"
  ],
  14: [
    "W90", "X23", "U56", "F12", "A12", "J90", "O23", "N90", "K34", "L56",
    "Z67", "M78", "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45",
    "Q67", "Y45", "A90", "B23", "C45", "D67", "G34", "I78", "E89", "B34",
    "C56", "D78", "H56", "K23", "J12", "L45", "M78"
  ],
  15: [
    "A12", "B34", "C56", "D78", "E23", "F45", "G67", "H89", "J12", "K34",
    "L56", "M78", "N90", "O23", "P45", "Q67", "R89", "S12", "T34", "U56",
    "V78", "W90", "X23", "Y45", "Z67", "A90", "B23", "C45", "D67", "E89",
    "F12", "G34", "H56", "I78", "J90", "K23", "L45"
  ],
  16: [
    "J90", "O23", "P45", "Q67", "A12", "U56", "V78", "T34", "S12", "R89",
    "N90", "K34", "L56", "Z67", "M78", "E23", "G67", "F45", "H89", "F12",
    "Y45", "W90", "X23", "A90", "B23", "C45", "D67", "G34", "I78", "E89",
    "B34", "C56", "D78", "H56", "J90", "K23", "M78"
  ],
  17: [
    "K23", "L45", "J90", "I78", "H56", "G34", "F12", "E89", "D67", "C45",
    "B23", "A90", "Z67", "Y45", "X23", "W90", "V78", "U56", "T34", "S12",
    "R89", "Q67", "P45", "O23", "N90", "M78", "K34", "J12", "H89", "G67",
    "F45", "E23", "D78", "C56", "B34", "A12", "I78"
  ],
  18: [
    "V78", "U56", "L56", "K34", "Z67", "M78", "A12", "J90", "L45", "O23",
    "N90", "E23", "G67", "F45", "H89", "T34", "S12", "R89", "P45", "Q67",
    "Y45", "W90", "X23", "F12", "A90", "B23", "C45", "D67", "G34", "I78",
    "E89", "B34", "C56", "D78", "H56", "J12", "K23"
  ],
  19: [
    "H56", "J12", "A12", "U56", "W90", "X23", "F12", "G67", "E23", "F45",
    "H89", "Z67", "K34", "L56", "N90", "M78", "J90", "O23", "T34", "S12",
    "R89", "Y45", "P45", "Q67", "A90", "B23", "C45", "D67", "G34", "I78",
    "E89", "B34", "C56", "D78", "K23", "V78", "L45"
  ],
  20: [
    "A12", "B34", "C56", "D78", "E23", "F45", "G67", "H89", "J12", "K34",
    "L56", "M78", "N90", "O23", "P45", "Q67", "R89", "S12", "T34", "U56",
    "V78", "W90", "X23", "Y45", "Z67", "A90", "B23", "C45", "D67", "E89",
    "F12", "G34", "H56", "I78", "J90", "K23", "L45"
  ],
  21: [
    "U56", "F12", "W90", "X23", "A12", "G67", "E23", "F45", "H89", "Y45",
    "T34", "S12", "R89", "O23", "N90", "K34", "L56", "Z67", "M78", "J90",
    "Q67", "P45", "A90", "B23", "C45", "D67", "G34", "I78", "E89", "B34",
    "C56", "D78", "H56", "J12", "K23", "L45", "M78"
  ],
  22: [
    "U56", "W90", "X23", "F12", "A12", "G67", "E23", "F45", "H89", "Y45",
    "T34", "S12", "R89", "J90", "O23", "N90", "K34", "L56", "Z67", "M78",
    "Q67", "P45", "A90", "B23", "C45", "D67", "G34", "I78", "E89", "B34",
    "C56", "D78", "H56", "J12", "K23", "L45", "M78"
  ],
};


interface CardQuestion {
  questionEn: string;
  optionsEn: string[];
  correctEn: string;
  questionFr: string;
  optionsFr: string[];
  correctFr: string;
}

// --- CARD QUESTIONS (without IDs) ---
const cardQuestions: { [id: string]: {
  questionEn: string;
  optionsEn: string[];
  correctEn: string;
  questionFr: string;
  optionsFr: string[];
  correctFr: string;
} } = {
  "A12": {
    questionEn: "What happens when we plant trees?",
    optionsEn: [
      "It makes the air dirtier.",
      "It helps clean the air and gives homes to animals.",
      "It makes the weather hotter."
    ],
    correctEn: "b",
    questionFr: "Que se passe-t-il lorsque nous plantons des arbres ?",
    optionsFr: [
      "Cela rend l'air plus pollué.",
      "Cela aide à nettoyer l'air et donne des foyers aux animaux.",
      "Cela rend le climat plus chaud."
    ],
    correctFr: "b"
  },
  "B34": {
    questionEn: "What happens when we recycle 10 tons of waste?",
    optionsEn: [
      "It helps reduce pollution.",
      "It makes more trash.",
      "It destroys trees."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous recyclons 10 tonnes de déchets ?",
    optionsFr: [
      "Cela aide à réduire la pollution.",
      "Cela crée plus de déchets.",
      "Cela détruit des arbres."
    ],
    correctFr: "a"
  },
  "C56": {
    questionEn: "What happens when we recycle 100 tons of waste?",
    optionsEn: [
      "It helps the Earth stay clean and saves natural resources.",
      "It makes new trash.",
      "It pollutes the oceans."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous recyclons 100 tonnes de déchets ?",
    optionsFr: [
      "Cela aide la Terre à rester propre et économise des ressources naturelles.",
      "Cela crée de nouveaux déchets.",
      "Cela pollue les océans."
    ],
    correctFr: "a"
  },
  "D78": {
    questionEn: "What happens when we recycle 1000 tons of waste?",
    optionsEn: [
      "It helps protect animals and their homes.",
      "It makes more pollution.",
      "It wastes resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous recyclons 1000 tonnes de déchets ?",
    optionsFr: [
      "Cela aide à protéger les animaux et leurs habitats.",
      "Cela crée plus de pollution.",
      "Cela gaspille des ressources."
    ],
    correctFr: "a"
  },
  "E23": {
    questionEn: "What happens when we use wind turbines?",
    optionsEn: [
      "It makes the air dirtier.",
      "It helps create clean energy without pollution.",
      "It uses up all the wind."
    ],
    correctEn: "b",
    questionFr: "Que se passe-t-il lorsque nous utilisons des éoliennes ?",
    optionsFr: [
      "Cela rend l'air plus pollué.",
      "Cela aide à créer de l'énergie propre sans pollution.",
      "Cela utilise tout le vent."
    ],
    correctFr: "b"
  },
  "F45": {
    questionEn: "What happens when we use hydropower?",
    optionsEn: [
      "It makes electricity from water without polluting.",
      "It uses up all the water.",
      "It destroys animals' homes."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons l'hydroélectricité ?",
    optionsFr: [
      "Cela produit de l'électricité à partir de l'eau sans polluer.",
      "Cela utilise toute l'eau.",
      "Cela détruit les habitats des animaux."
    ],
    correctFr: "a"
  },
  "G67": {
    questionEn: "What happens when we use solar energy?",
    optionsEn: [
      "It uses the sun to create clean energy.",
      "It makes the Earth hotter.",
      "It harms plants."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons l'énergie solaire ?",
    optionsFr: [
      "Cela utilise le soleil pour créer de l'énergie propre.",
      "Cela rend la Terre plus chaude.",
      "Cela nuit aux plantes."
    ],
    correctFr: "a"
  },
  "H89": {
    questionEn: "What happens when we use nuclear energy?",
    optionsEn: [
      "It makes electricity with little pollution.",
      "It makes the Earth very hot.",
      "It pollutes the air."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons l'énergie nucléaire ?",
    optionsFr: [
      "Cela produit de l'électricité avec peu de pollution.",
      "Cela rend la Terre très chaude.",
      "Cela pollue l'air."
    ],
    correctFr: "a"
  },
  "J12": {
    questionEn: "What happens when we turn off unused lights?",
    optionsEn: [
      "We save energy and reduce pollution.",
      "We waste energy.",
      "We make the air dirty."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous éteignons les lumières inutilisées ?",
    optionsFr: [
      "Nous économisons de l'énergie et réduisons la pollution.",
      "Nous gaspillons de l'énergie.",
      "Nous rendons l'air plus pollué."
    ],
    correctFr: "a"
  },
  "K34": {
    questionEn: "What happens when we use public buses?",
    optionsEn: [
      "It helps reduce traffic and pollution.",
      "It uses a lot of gas and creates pollution.",
      "It wastes energy."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons les transports en commun, comme les bus ?",
    optionsFr: [
      "Cela aide à réduire le trafic et la pollution.",
      "Cela utilise beaucoup d'essence et crée de la pollution.",
      "Cela gaspille de l'énergie."
    ],
    correctFr: "a"
  },
  "L56": {
    questionEn: "What happens when we use trains?",
    optionsEn: [
      "It helps reduce pollution and saves energy.",
      "It makes the Earth hotter.",
      "It uses too much water."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons le train ?",
    optionsFr: [
      "Cela aide à réduire la pollution et économise de l'énergie.",
      "Cela rend la Terre plus chaude.",
      "Cela utilise trop d'eau."
    ],
    correctFr: "a"
  },
  "M78": {
    questionEn: "What happens when we use bicycles?",
    optionsEn: [
      "It helps reduce pollution and keeps us healthy.",
      "It wastes energy.",
      "It makes the roads dirty."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons des vélos ?",
    optionsFr: [
      "Cela aide à réduire la pollution et nous garde en bonne santé.",
      "Cela gaspille de l'énergie.",
      "Cela rend les routes sales."
    ],
    correctFr: "a"
  },
  "N90": {
    questionEn: "What happens when we carpool?",
    optionsEn: [
      "It reduces the number of cars on the road, helping the environment.",
      "It makes the air dirtier.",
      "It uses more gas."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous faisons du covoiturage ?",
    optionsFr: [
      "Cela réduit le nombre de voitures sur la route, aidant ainsi l'environnement.",
      "Cela rend l'air plus pollué.",
      "Cela utilise plus d'essence."
    ],
    correctFr: "a"
  },
  "O23": {
    questionEn: "What happens when we buy local products?",
    optionsEn: [
      "It helps reduce pollution from transportation.",
      "It makes the Earth hotter.",
      "It uses more resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous achetons des produits locaux ?",
    optionsFr: [
      "Cela aide à réduire la pollution liée au transport.",
      "Cela rend la Terre plus chaude.",
      "Cela utilise plus de ressources."
    ],
    correctFr: "a"
  },
  "P45": {
    questionEn: "What happens when we use sustainable plowing methods?",
    optionsEn: [
      "It helps keep the soil healthy and protects animals.",
      "It wastes water.",
      "It destroys the land."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons des méthodes de labour durables ?",
    optionsFr: [
      "Cela aide à garder le sol en bonne santé et protège les animaux.",
      "Cela gaspille de l'eau.",
      "Cela détruit la terre."
    ],
    correctFr: "a"
  },
  "Q67": {
    questionEn: "What happens when we compost organic waste?",
    optionsEn: [
      "It helps the soil stay healthy and reduces waste.",
      "It makes the soil dry.",
      "It creates more garbage."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous compostons les déchets organiques ?",
    optionsFr: [
      "Cela aide le sol à rester en bonne santé et réduit les déchets.",
      "Cela rend le sol sec.",
      "Cela crée plus de déchets."
    ],
    correctFr: "a"
  },
  "R89": {
    questionEn: "What happens when we donate to a non-profit?",
    optionsEn: [
      "The organization can use the money to help environmental projects.",
      "It wastes the money.",
      "It makes pollution."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous faisons un don à une organisation à but non lucratif ?",
    optionsFr: [
      "L'organisation peut utiliser l'argent pour aider des projets environnementaux.",
      "Cela gaspille de l'argent.",
      "Cela crée de la pollution."
    ],
    correctFr: "a"
  },
  "S12": {
    questionEn: "What happens when we donate $100 to a non-profit?",
    optionsEn: [
      "It supports bigger environmental projects that help the Earth.",
      "It causes pollution.",
      "It wastes the money."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous faisons un don de 100$ à une organisation à but non lucratif ?",
    optionsFr: [
      "Cela soutient des projets environnementaux plus importants qui aident la Terre.",
      "Cela crée de la pollution.",
      "Cela gaspille l'argent."
    ],
    correctFr: "a"
  },
  "T34": {
    questionEn: "What happens when we donate $1000 to a non-profit?",
    optionsEn: [
      "It funds large projects to protect the Earth and its wildlife.",
      "It wastes resources.",
      "It harms the environment."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous faisons un don de 1000$ à une organisation à but non lucratif ?",
    optionsFr: [
      "Cela finance de grands projets pour protéger la Terre et sa faune.",
      "Cela gaspille des ressources.",
      "Cela nuit à l'environnement."
    ],
    correctFr: "a"
  },
  "U56": {
    questionEn: "What happens when we raise public awareness about the environment?",
    optionsEn: [
      "People learn how to protect the Earth.",
      "People pollute more.",
      "It wastes time."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous sensibilisons le public aux enjeux environnementaux ?",
    optionsFr: [
      "Les gens apprennent à protéger la Terre.",
      "Les gens polluent plus.",
      "Cela fait perdre du temps."
    ],
    correctFr: "a"
  },
  "V78": {
    questionEn: "What happens when we help rescue and rehabilitate endangered species?",
    optionsEn: [
      "It helps protect animals and their habitats.",
      "It harms the environment.",
      "It makes animals sick."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous aidons à sauver et réhabiliter les espèces en danger ?",
    optionsFr: [
      "Cela aide à protéger les animaux et leurs habitats.",
      "Cela nuit à l'environnement.",
      "Cela rend les animaux malades."
    ],
    correctFr: "a"
  },
  "W90": {
    questionEn: "What happens when we create laws to protect the environment?",
    optionsEn: [
      "It helps reduce pollution and conserve natural resources.",
      "It makes the Earth hotter.",
      "It uses up resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous créons des lois pour protéger l'environnement ?",
    optionsFr: [
      "Cela aide à réduire la pollution et à conserver les ressources naturelles.",
      "Cela rend la Terre plus chaude.",
      "Cela gaspille des ressources."
    ],
    correctFr: "a"
  },
  "X23": {
    questionEn: "What happens when we create laws that make businesses adopt sustainable practices?",
    optionsEn: [
      "It helps businesses reduce pollution and use resources wisely.",
      "It increases pollution.",
      "It wastes resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous créons des lois obligeant les entreprises à adopter des pratiques durables ?",
    optionsFr: [
      "Cela aide les entreprises à réduire la pollution et à utiliser les ressources de manière plus responsable.",
      "Cela augmente la pollution.",
      "Cela gaspille des ressources."
    ],
    correctFr: "a"
  },
  "Y45": {
    questionEn: "What happens when we eat less meat?",
    optionsEn: [
      "It reduces the environmental impact of livestock farming.",
      "It makes animals sick.",
      "It pollutes the air."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous consommons moins de viande ?",
    optionsFr: [
      "Cela réduit l'impact environnemental de l'élevage.",
      "Cela rend les animaux malades.",
      "Cela pollue l'air."
    ],
    correctFr: "a"
  },
  "Z67": {
    questionEn: "What happens when we use an electric car?",
    optionsEn: [
      "It reduces pollution by using clean energy instead of gas.",
      "It uses a lot of energy and creates pollution.",
      "It wastes electricity."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons une voiture électrique ?",
    optionsFr: [
      "Cela réduit la pollution en utilisant de l'énergie propre au lieu de l'essence.",
      "Cela utilise beaucoup d'énergie et crée de la pollution.",
      "Cela gaspille de l'électricité."
    ],
    correctFr: "a"
  },
  "A90": {
    questionEn: "What happens when we take shorter showers?",
    optionsEn: [
      "We save water and energy.",
      "We waste water.",
      "We pollute the oceans."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous prenons des douches plus courtes ?",
    optionsFr: [
      "Nous économisons de l'eau et de l'énergie.",
      "Nous gaspillons de l'eau.",
      "Nous polluons les océans."
    ],
    correctFr: "a"
  },
  "B23": {
    questionEn: "What happens when we turn off the tap when not in use?",
    optionsEn: [
      "We save water.",
      "We waste water.",
      "We use more electricity."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous fermons le robinet lorsque nous ne l'utilisons pas ?",
    optionsFr: [
      "Nous économisons de l'eau.",
      "Nous gaspillons de l'eau.",
      "Nous utilisons plus d'électricité."
    ],
    correctFr: "a"
  },
  "C45": {
    questionEn: "What happens when we use a reusable water bottle?",
    optionsEn: [
      "We reduce plastic waste.",
      "It creates more pollution.",
      "It wastes resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons une bouteille d'eau réutilisable ?",
    optionsFr: [
      "Cela réduit les déchets plastiques.",
      "Cela crée plus de pollution.",
      "Cela gaspille des ressources."
    ],
    correctFr: "a"
  },
  "D67": {
    questionEn: "What happens when we reduce paper usage?",
    optionsEn: [
      "We help stop deforestation and reduce waste.",
      "It makes more trash.",
      "It wastes trees."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous réduisons l'utilisation de papier ?",
    optionsFr: [
      "Cela aide à stopper la déforestation et réduit les déchets.",
      "Cela crée plus de déchets.",
      "Cela gaspille des arbres."
    ],
    correctFr: "a"
  },
  "E89": {
    questionEn: "What happens when we set up a deposit system for waste?",
    optionsEn: [
      "People are encouraged to recycle more.",
      "It makes more trash.",
      "It wastes time."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous mettons en place un système de consignation des déchets ?",
    optionsFr: [
      "Cela encourage les gens à recycler davantage.",
      "Cela crée plus de déchets.",
      "Cela gaspille du temps."
    ],
    correctFr: "a"
  },
  "F12": {
    questionEn: "What happens when we have a carbon tax?",
    optionsEn: [
      "It encourages businesses to reduce pollution.",
      "It makes the air dirtier.",
      "It wastes money."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous avons une taxe carbone ?",
    optionsFr: [
      "Cela encourage les entreprises à réduire la pollution.",
      "Cela rend l'air plus pollué.",
      "Cela gaspille de l'argent."
    ],
    correctFr: "a"
  },
  "G34": {
    questionEn: "What happens when we use reusable bags?",
    optionsEn: [
      "We reduce plastic waste.",
      "It makes more pollution.",
      "It wastes resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons des sacs réutilisables ?",
    optionsFr: [
      "Cela réduit les déchets plastiques.",
      "Cela crée plus de pollution.",
      "Cela gaspille des ressources."
    ],
    correctFr: "a"
  },
  "H56": {
    questionEn: "What happens when we reduce heating and air conditioning?",
    optionsEn: [
      "We save energy and reduce pollution.",
      "It makes the Earth hotter.",
      "It wastes electricity."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous réduisons l'utilisation du chauffage et de la climatisation ?",
    optionsFr: [
      "Nous économisons de l'énergie et réduisons la pollution.",
      "Cela rend la Terre plus chaude.",
      "Cela gaspille de l'électricité."
    ],
    correctFr: "a"
  },
  "I78": {
    questionEn: "What happens when we clean up waste from the streets?",
    optionsEn: [
      "It makes the environment cleaner and safer.",
      "It wastes time.",
      "It pollutes more."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous nettoyons les déchets dans les rues ?",
    optionsFr: [
      "Cela rend l'environnement plus propre et plus sûr.",
      "Cela fait perdre du temps.",
      "Cela pollue davantage."
    ],
    correctFr: "a"
  },
  "J90": {
    questionEn: "What happens when we create a community garden?",
    optionsEn: [
      "It helps grow local food and supports the environment.",
      "It wastes space.",
      "It makes the soil dry."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous créons un jardin communautaire ?",
    optionsFr: [
      "Cela aide à cultiver des aliments locaux et soutient l'environnement.",
      "Cela gaspille de l'espace.",
      "Cela rend le sol sec."
    ],
    correctFr: "a"
  },
  "K23": {
    questionEn: "What happens when we stop using single-use plastics?",
    optionsEn: [
      "We reduce plastic waste and protect wildlife.",
      "It increases pollution.",
      "It wastes resources."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous arrêtons d'utiliser des plastiques à usage unique ?",
    optionsFr: [
      "Cela réduit les déchets plastiques et protège la faune.",
      "Cela augmente la pollution.",
      "Cela gaspille des ressources."
    ],
    correctFr: "a"
  },
  "L45": {
    questionEn: "What happens when we use a rainwater harvesting bin?",
    optionsEn: [
      "We save water for plants and reduce waste.",
      "It wastes water.",
      "It pollutes the environment."
    ],
    correctEn: "a",
    questionFr: "Que se passe-t-il lorsque nous utilisons un bac de récupération d'eau de pluie ?",
    optionsFr: [
      "Cela économise de l'eau pour les plantes et réduit le gaspillage.",
      "Cela gaspille de l'eau.",
      "Cela pollue l'environnement."
    ],
    correctFr: "a"
  },
};

interface ScenarioData {
  id: number;
  shortHintFr: string;
  shortHintEn: string;
  descFr: string;
  descEn: string;
}

const scenarioList: ScenarioData[] = [
  {
    id: 1,
    shortHintFr: "La région est dévastée. Répare les dégâts ou fais en sorte que ce soit pire.",
    shortHintEn: "The area is devastated. Repair the damage or make it worse.",
    descFr: "Une tornade a frappé la ville, détruisant des maisons et des arbres.",
    descEn: "A tornado hit the city, destroying homes and trees."
  },
  {
    id: 2,
    shortHintFr: "Les bâtiments sont cassés. Répare ou fais en sorte que ce soit pire.",
    shortHintEn: "Buildings are broken. Repair or make it worse.",
    descFr: "Un grand séisme a secoué la région, cassant des routes et des bâtiments.",
    descEn: "A big earthquake shook the region, breaking roads and buildings."
  },
  {
    id: 3,
    shortHintFr: "L'eau envahit tout. Aide à protéger ou fais en sorte que ce soit pire.",
    shortHintEn: "Water is flooding everything. Help protect or make it worse.",
    descFr: "Il a beaucoup plu, et les rivières ont débordé, noyant des villes entières. Les gens ont dû quitter leurs maisons et les champs ont été inondés.",
    descEn: "It rained a lot, and the rivers overflowed, flooding entire cities. People had to leave their homes, and fields were flooded."
  },
  {
    id: 4,
    shortHintFr: "Les arbres sont coupés. Replante des arbres ou fais en sorte que ce soit pire.",
    shortHintEn: "Trees are cut down. Replant trees or make it worse.",
    descFr: "Des arbres ont été coupés pour faire de la place pour des maisons. Cela a détruit les maisons des animaux et endommagé la terre.",
    descEn: "Trees were cut down to make room for houses. This destroyed animal homes and damaged the land."
  },
  {
    id: 5,
    shortHintFr: "Les vents et l'eau détruisent tout. Protège les habitants ou fais en sorte que ce soit pire.",
    shortHintEn: "Wind and water are destroying everything. Protect the people or make it worse.",
    descFr: "Un ouragan puissant a frappé, détruisant des maisons et emportant tout sur son passage. L'eau a submergé les rues, et tout est désormais en ruines.",
    descEn: "A powerful hurricane hit, destroying homes and sweeping everything away. Water flooded the streets, and everything is now in ruins."
  },
  {
    id: 6,
    shortHintFr: "Un grand impact a créé des dégâts. Répare ou fais en sorte que ce soit pire.",
    shortHintEn: "A big impact has caused damage. Repair or make it worse.",
    descFr: "Une grosse météorite a frappé la Terre, laissant un grand trou et envoyant des pierres dans l'air. Cela a perturbé la vie des animaux et des plantes.",
    descEn: "A big meteorite hit the Earth, leaving a big hole and sending rocks into the air. It disrupted the life of animals and plants around it."
  },
  {
    id: 7,
    shortHintFr: "L'eau est rare et les récoltes sont en danger. Aide à économiser ou fais en sorte que ce soit pire.",
    shortHintEn: "Water is scarce, and crops are in danger. Help save water or make it worse.",
    descFr: "Il ne pleut pas assez, et les rivières et lacs sont presque vides. Cela rend difficile la culture des plantes et l'accès à l'eau.",
    descEn: "It isn’t raining enough, and rivers and lakes are almost empty. This makes it hard to grow plants and get water."
  },
  {
    id: 8,
    shortHintFr: "La lave détruit tout. Protège les habitants ou fais en sorte que ce soit pire.",
    shortHintEn: "Lava is destroying everything. Protect the people or make it worse.",
    descFr: "Un volcan est entré en éruption, libérant de la lave et des cendres. Les maisons sont menacées et les routes sont coupées.",
    descEn: "A volcano erupted, spewing lava and ash. Homes are threatened and roads are cut off."
  },
  {
    id: 9,
    shortHintFr: "Les ressources sont épuisées. Trouve des solutions ou fais en sorte que ce soit pire.",
    shortHintEn: "Resources are gone. Find solutions or make it worse.",
    descFr: "Il n'y a pas assez d'eau ni de matières pour tout le monde. Cela crée des conflits entre les gens pour ces ressources.",
    descEn: "There isn’t enough water or materials for everyone. This creates conflicts between people for these resources."
  },
  {
    id: 10,
    shortHintFr: "Des animaux disparaissent. Protège-les ou fais en sorte que ce soit pire.",
    shortHintEn: "Animals are disappearing. Protect them or make it worse.",
    descFr: "Des animaux comme les zèbres et les rhinocéros ont disparu. Cela a perturbé la nature et rendu difficile la survie d'autres animaux.",
    descEn: "Animals like zebras and rhinos have disappeared. This has disturbed nature and made it hard for other animals to survive."
  },
  {
    id: 11,
    shortHintFr: "La maladie se propage. Aide à soigner les malades ou fais en sorte que ce soit pire.",
    shortHintEn: "The disease is spreading. Help treat the sick or make it worse.",
    descFr: "Beaucoup de gens sont malades à cause du Covid. Les écoles et magasins sont fermés, et les hôpitaux sont pleins.",
    descEn: "Many people are sick because of Covid. Schools and stores are closed, and hospitals are full of patients."
  },
  {
    id: 12,
    shortHintFr: "L'air est pollué. Aide à le nettoyer ou fais en sorte que ce soit pire.",
    shortHintEn: "The air is polluted. Help clean it or make it worse.",
    descFr: "L'air dans les grandes villes est sale et les gens ont du mal à respirer. Cela rend beaucoup de gens malades.",
    descEn: "The air in big cities is dirty, and people are having trouble breathing. It makes many people sick."
  },
  {
    id: 13,
    shortHintFr: "Les lumières artificielles empêchent de voir les étoiles. Éteins les lumières ou fais en sorte que ce soit pire.",
    shortHintEn: "Artificial lights block the stars. Turn off the lights or make it worse.",
    descFr: "Les lumières de la ville cachent les étoiles et dérangent les animaux qui vivent la nuit.",
    descEn: "City lights hide the stars and disturb animals that live at night."
  },
  {
    id: 14,
    shortHintFr: "Le bruit est trop fort. Réduis le bruit ou fais en sorte que ce soit pire.",
    shortHintEn: "The noise is too loud. Reduce the noise or make it worse.",
    descFr: "Le bruit des voitures et des machines empêche les gens de se reposer et les rend stressés.",
    descEn: "Noise from cars and machines keeps people from resting and makes them stressed."
  },
  {
    id: 15,
    shortHintFr: "Les océans sont pollués. Nettoie les océans ou fais en sorte que ce soit pire.",
    shortHintEn: "The oceans are polluted. Clean the oceans or make it worse.",
    descFr: "Les océans sont remplis de déchets comme des plastiques, ce qui tue beaucoup d'animaux marins.",
    descEn: "The oceans are full of trash like plastics, which is killing many sea animals."
  },
  {
    id: 16,
    shortHintFr: "Il manque de la nourriture. Aide à fournir de la nourriture ou fais en sorte que ce soit pire.",
    shortHintEn: "There is no food. Help provide food or make it worse.",
    descFr: "Une grande famine a frappé un pays, et beaucoup de gens n'ont pas assez à manger.",
    descEn: "A big famine hit a country, and many people don’t have enough food."
  },
  {
    id: 17,
    shortHintFr: "Les incendies se propagent. Éteins les feux ou fais en sorte que ce soit pire.",
    shortHintEn: "The fires are spreading. Put out the fires or make it worse.",
    descFr: "Des feux de forêt ont brûlé de grandes forêts, détruisant des maisons et mettant en danger des animaux.",
    descEn: "Wildfires burned big forests, destroying homes and putting animals in danger."
  },
  {
    id: 18,
    shortHintFr: "La neige bloque tout. Aide à déblayer ou fais en sorte que ce soit pire.",
    shortHintEn: "Snow is blocking everything. Help clear it or make it worse.",
    descFr: "Un blizzard a bloqué les routes et fait tomber des arbres. Les gens sont coincés chez eux sans électricité.",
    descEn: "A blizzard blocked roads and knocked down trees. People are stuck at home without electricity."
  },
  {
    id: 19,
    shortHintFr: "Il fait trop chaud. Aide à se rafraîchir ou fais en sorte que ce soit pire.",
    shortHintEn: "It’s too hot. Help cool down or make it worse.",
    descFr: "Une chaleur extrême touche la ville. Les gens ont du mal à respirer et les enfants et les personnes âgées sont en danger.",
    descEn: "Extreme heat is hitting the city. People are having trouble breathing, and children and the elderly are in danger."
  },
  {
    id: 20,
    shortHintFr: "Le sol est emporté. Protège la terre ou fais en sorte que ce soit pire.",
    shortHintEn: "The soil is being washed away. Protect the land or make it worse.",
    descFr: "Le vent et l'eau ont emporté la terre des champs. Cela rend difficile la culture des plantes et diminue la nourriture disponible.",
    descEn: "Wind and water have washed away the soil from fields. This makes it hard to grow plants and reduces available food."
  },
  {
    id: 21,
    shortHintFr: "Les glaciers fondent, faisant monter la mer. Aide à ralentir ou fais en sorte que ce soit pire.",
    shortHintEn: "The glaciers are melting, raising the sea. Help slow it down or make it worse.",
    descFr: "Les glaciers fondent rapidement, et l'eau monte, inondant les villes près de la mer.",
    descEn: "Glaciers are melting quickly, and the water is rising, flooding cities near the sea."
  },
  {
    id: 22,
    shortHintFr: "La couche d'ozone est endommagée. Aide à la réparer ou fais en sorte que ce soit pire.",
    shortHintEn: "The ozone layer is damaged. Help repair it or make it worse.",
    descFr: "La couche d'ozone a été abîmée, laissant plus de rayons du soleil atteindre la Terre. Cela rend les gens plus malades et abîme les cultures.",
    descEn: "The ozone layer was damaged, letting more sunlight reach the Earth. This makes people sicker and harms crops."
  },
];




const uiTranslations = {
  en: {
    sectionLabel: "Section:",
    team1Label: "Team 1:",
    team2Label: "Team 2:",
    scenario: "Scenario",
    hints: "Hints",
    hintsText: "Think long-term before choosing a card!",
    cardPlaceholder: "Enter your card ID",
    skipRound: "Skip Timer",
    submitCards: "Submit Cards",
    answerQuestion: "Answer the following question:",
    confirmAnswer: "Confirm Answer",
    extraCardMsg: "Correct! You earn an extra bonus card next round!",
    noBonusMsg: "Incorrect. No bonus awarded.",
    roundScore: "Round",
    overallScore: "Score",
    newRoundMsg: "New Round!",
    cardReuseError: "You have already used this card!",
    winnerText: "Round Winner:",
    tieText: "Tie!",
  },
  fr: {
    sectionLabel: "Classe:",
    team1Label: "Équipe 1:",
    team2Label: "Équipe 2:",
    scenario: "Scénario",
    hints: "Conseils",
    hintsText: "Pensez à long terme avant de choisir une carte!",
    cardPlaceholder: "Entrez l'ID de votre carte",
    skipRound: "Passer la tour",
    submitCards: "Valider les cartes",
    answerQuestion: "Répondez à la question suivante:",
    confirmAnswer: "Confirmer la réponse",
    extraCardMsg: "Correct ! Vous gagnez une carte bonus pour la prochaine manche !",
    noBonusMsg: "Incorrect. Aucun bonus n'est attribué.",
    roundScore: "Ronde",
    overallScore: "Score",
    newRoundMsg: "Nouvelle Ronde!",
    cardReuseError: "Vous avez déjà utilisé cette carte !",
    winnerText: "Vainqueur de la manche :",
    tieText: "Égalité!",
  },
};

// -----------------------------------------------------------------------------
// GAME CONTENT COMPONENT
// -----------------------------------------------------------------------------
function GameContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as "en" | "fr") || "en";
  const t = uiTranslations[lang];
  const topBarT = topBarTranslations[lang];

  // Team names from query
  const team1Name = searchParams.get("team1") || "Team 1";
  const team2Name = searchParams.get("team2") || "Team 2";

  // Basic round states
  const totalRounds = 22;
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [team1Wins, setTeam1Wins] = useState<number>(0);
  const [team2Wins, setTeam2Wins] = useState<number>(0);

  // Card counts
  const [team1CardCount, setTeam1CardCount] = useState<number>(5);
  const [team2CardCount, setTeam2CardCount] = useState<number>(5);

  // Keep track of used cards so they can’t be reused
  const [usedCardsTeam1, setUsedCardsTeam1] = useState<string[]>([]);
  const [usedCardsTeam2, setUsedCardsTeam2] = useState<string[]>([]);

  // Scenario
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(90);

  // UI states
  const [showQuestionPhase, setShowQuestionPhase] = useState<boolean>(false);
  const [cardError, setCardError] = useState<string>("");

  // “Round Winner” overlay
  const [roundWinner, setRoundWinner] = useState<"team1" | "team2" | "tie" | null>(null);
  const [showRoundWinner, setShowRoundWinner] = useState<boolean>(false);

  // “New Round” animation
  const [showNewRoundAnim, setShowNewRoundAnim] = useState<boolean>(false);

  // Card input
  const [team1Card, setTeam1Card] = useState<string>("");
  const [team2Card, setTeam2Card] = useState<string>("");

  // Q&A
  const [team1Question, setTeam1Question] = useState<CardQuestion | null>(null);
  const [team2Question, setTeam2Question] = useState<CardQuestion | null>(null);
  const [team1Answer, setTeam1Answer] = useState<string>("");
  const [team2Answer, setTeam2Answer] = useState<string>("");
  const [team1Confirmed, setTeam1Confirmed] = useState<boolean>(false);
  const [team2Confirmed, setTeam2Confirmed] = useState<boolean>(false);
  const [team1Bonus, setTeam1Bonus] = useState<boolean>(false);
  const [team2Bonus, setTeam2Bonus] = useState<boolean>(false);

  // On mount or each new round, pick scenario
  useEffect(() => {
    if (roundsPlayed < totalRounds) {
      setScenarioIndex(roundsPlayed % scenarioList.length);
    }
  }, [roundsPlayed, totalRounds]);

  // ---------------------------------------------------------------------------
  // awardRound function defined BEFORE its usage in useEffect
  // ---------------------------------------------------------------------------
  const awardRound = useCallback(
    (winner: "team1" | "team2", tie = false) => {
      // Award round wins and set the round winner display
      if (!tie) {
        if (winner === "team1") {
          setTeam1Wins((prev) => prev + 1);
          setRoundWinner("team1");
        } else {
          setTeam2Wins((prev) => prev + 1);
          setRoundWinner("team2");
        }
      } else {
        setRoundWinner("tie");
      }
      
      // Award bonus cards independently of the round outcome:
      if (team1Bonus) {
        setTeam1CardCount((prev) => prev + 1);
      }
      if (team2Bonus) {
        setTeam2CardCount((prev) => prev + 1);
      }
  
      // Show the round winner overlay, then after a delay, reset for the next round
      setShowRoundWinner(true);
      setTimeout(() => {
        setShowRoundWinner(false);
        setShowNewRoundAnim(true);
        setTimeout(() => {
          setShowNewRoundAnim(false);
          // Reset states for next round
          setTeam1Card("");
          setTeam2Card("");
          setTeam1Question(null);
          setTeam2Question(null);
          setTeam1Answer("");
          setTeam2Answer("");
          setTeam1Confirmed(false);
          setTeam2Confirmed(false);
          setTeam1Bonus(false);
          setTeam2Bonus(false);
          setTimeLeft(90);
          setCardError("");
          setShowQuestionPhase(false);
          setRoundsPlayed((prev) => prev + 1);
        }, 2000);
      }, 2000);
    },
    [team1Bonus, team2Bonus]
  );

  // ---------------------------------------------------------------------------
  // useEffect that uses awardRound
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (
      showQuestionPhase &&
      team1Confirmed &&
      team2Confirmed &&
      team1Card &&
      team2Card
    ) {
      const scenarioId = scenarioList[scenarioIndex].id;
      const ranking = newScenarioRankings[scenarioId] || [];
      const idx1 = ranking.indexOf(team1Card.trim().toUpperCase());
      const idx2 = ranking.indexOf(team2Card.trim().toUpperCase());

      if (idx1 < idx2) {
        awardRound("team1");
      } else if (idx2 < idx1) {
        awardRound("team2");
      } else {
        awardRound("team1", true);
        awardRound("team2", true);
      }
    }
  }, [
    showQuestionPhase,
    team1Confirmed,
    team2Confirmed,
    team1Card,
    team2Card,
    scenarioIndex,
    awardRound,
  ]);

  // ---------------------------------------------------------------------------
  // Other functions
  // ---------------------------------------------------------------------------
  const triggerQuestionPhase = useCallback(() => {
    const scenarioId = scenarioList[scenarioIndex].id;
    const ranking = newScenarioRankings[scenarioId] || [];
    const c1 = team1Card.trim().toUpperCase();
    const c2 = team2Card.trim().toUpperCase();

    if (!ranking.includes(c1) || !ranking.includes(c2)) {
      setCardError("Invalid card(s) for this scenario.");
      return;
    }
    const qData1 = cardQuestions[c1];
    const qData2 = cardQuestions[c2];
    if (!qData1 || !qData2) {
      setCardError("No question data for one or both cards.");
      return;
    }
    setTeam1Question(qData1);
    setTeam2Question(qData2);
    setTeam1Answer("");
    setTeam2Answer("");
    setTeam1Confirmed(false);
    setTeam2Confirmed(false);
    setTeam1Bonus(false);
    setTeam2Bonus(false);
    setShowQuestionPhase(true);
  }, [scenarioIndex, team1Card, team2Card]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!showQuestionPhase && team1Card && team2Card) {
        triggerQuestionPhase();
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showQuestionPhase, team1Card, team2Card, triggerQuestionPhase]);

  function handleSubmitCards() {
    const c1 = team1Card.trim().toUpperCase();
    const c2 = team2Card.trim().toUpperCase();

    if (!c1 || !c2) {
      setCardError("Both teams must enter a card.");
      return;
    }
    if (usedCardsTeam1.includes(c1)) {
      setCardError(t.cardReuseError);
      return;
    }
    if (usedCardsTeam2.includes(c2)) {
      setCardError(t.cardReuseError);
      return;
    }
    setUsedCardsTeam1((prev) => [...prev, c1]);
    setUsedCardsTeam2((prev) => [...prev, c2]);
    setCardError("");
    triggerQuestionPhase();
  }

  function handleAnswer(team: "team1" | "team2", answer: string) {
    if (team === "team1") {
      setTeam1Answer(answer);
    } else {
      setTeam2Answer(answer);
    }
  }

  function confirmAnswer(team: "team1" | "team2") {
    if (team === "team1" && team1Question) {
      const correctKey = lang === "fr" ? team1Question.correctFr : team1Question.correctEn;
      setTeam1Confirmed(true);
      setTeam1Bonus(team1Answer === correctKey);
    } else if (team === "team2" && team2Question) {
      const correctKey = lang === "fr" ? team2Question.correctFr : team2Question.correctEn;
      setTeam2Confirmed(true);
      setTeam2Bonus(team2Answer === correctKey);
    }
  }

  function CardCountBadges() {
    return (
      <>
        <div className="absolute top-4 left-4 bg-white text-blue-700 px-3 py-1 rounded-full shadow-lg text-lg font-bold">
          {team1Name.toUpperCase()} {topBarT.teamXCards}: {team1CardCount}
        </div>
        <div className="absolute top-4 right-4 bg-white text-red-700 px-3 py-1 rounded-full shadow-lg text-lg font-bold">
          {team2Name.toUpperCase()} {topBarT.teamXCards}: {team2CardCount}
        </div>
      </>
    );
  }

  function ScoreHeader() {
    return (
      <div className="relative z-10 mt-20 p-4 bg-gray-900 bg-opacity-70 rounded-lg shadow-md max-w-xl w-full text-center">
        <p>
          {t.roundScore}: {roundsPlayed} / {totalRounds}
        </p>
        <p>
          {t.overallScore} - {team1Name} {team1Wins} : {team2Name} {team2Wins}
        </p>
      </div>
    );
  }

  const scenario = scenarioList[scenarioIndex];
  const scenarioDesc = lang === "fr" ? scenario?.descFr : scenario?.descEn;

  // ---------------------------------------------------------------------------
  // Render JSX for GameContent
  // ---------------------------------------------------------------------------
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <div className="relative w-full min-h-screen bg-black flex flex-col items-center text-white overflow-hidden">
        {/* BG */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/earthmain12.jpg')" }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <CardCountBadges />
        <ScoreHeader />
        <div className="relative z-10 flex flex-col items-center w-full px-4 py-6 space-y-6">
          {/* Scenario Box */}
          <motion.div className="p-4 bg-gray-800 rounded-lg shadow-md text-center max-w-2xl w-full">
            <h3 className="text-lg font-bold">{t.scenario}</h3>
            <p className="mt-2 text-sm">{scenarioDesc}</p>
          </motion.div>

          {/* Timer & Skip */}
          <div className="flex items-center space-x-4">
            <motion.h2
              key={timeLeft}
              className="text-2xl font-bold"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {timeLeft}s
            </motion.h2>
            {timeLeft > 0 && (
              <button
                onClick={() => setTimeLeft(0)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                {t.skipRound}
              </button>
            )}
          </div>

          {/* Card Input or Question Phase */}
          <AnimatePresence>
            {showQuestionPhase ? (
              <motion.div
                key="questionPhase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center space-y-6 w-full mt-6"
              >
                {/* Team 1 Question */}
                <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-2">
                    {t.team1Label} -{" "}
                    {team1Question
                      ? lang === "fr"
                        ? team1Question.questionFr
                        : team1Question.questionEn
                      : ""}
                  </h3>
                  <p className="mb-2">{t.answerQuestion}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {team1Question?.[lang === "fr" ? "optionsFr" : "optionsEn"].map(
                      (option: string, idx: number) => {
                        const letter = String.fromCharCode(97 + idx);
                        return (
                          <button
                            key={letter}
                            onClick={() => handleAnswer("team1", letter)}
                            className={`px-4 py-2 bg-white text-blue-700 rounded-full shadow hover:bg-blue-100 transition ${
                              team1Answer === letter ? "ring-4 ring-green-500" : ""
                            }`}
                          >
                            {letter}) {option}
                          </button>
                        );
                      }
                    )}
                  </div>
                  {!team1Confirmed && (
                    <button
                      onClick={() => confirmAnswer("team1")}
                      className="mt-4 px-6 py-2 bg-green-600 rounded-lg text-white text-xl hover:bg-green-700 transition"
                    >
                      {t.confirmAnswer}
                    </button>
                  )}
                  {team1Confirmed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="mt-2 text-lg font-bold text-green-400"
                    >
                      {team1Bonus ? t.extraCardMsg : t.noBonusMsg}
                    </motion.div>
                  )}
                </div>

                {/* Team 2 Question */}
                <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-2">
                    {t.team2Label} -{" "}
                    {team2Question
                      ? lang === "fr"
                        ? team2Question.questionFr
                        : team2Question.questionEn
                      : ""}
                  </h3>
                  <p className="mb-2">{t.answerQuestion}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {team2Question?.[lang === "fr" ? "optionsFr" : "optionsEn"].map(
                      (option: string, idx: number) => {
                        const letter = String.fromCharCode(97 + idx);
                        return (
                          <button
                            key={letter}
                            onClick={() => handleAnswer("team2", letter)}
                            className={`px-4 py-2 bg-white text-blue-700 rounded-full shadow hover:bg-blue-100 transition ${
                              team2Answer === letter ? "ring-4 ring-green-500" : ""
                            }`}
                          >
                            {letter}) {option}
                          </button>
                        );
                      }
                    )}
                  </div>
                  {!team2Confirmed && (
                    <button
                      onClick={() => confirmAnswer("team2")}
                      className="mt-4 px-6 py-2 bg-green-600 rounded-lg text-white text-xl hover:bg-green-700 transition"
                    >
                      {t.confirmAnswer}
                    </button>
                  )}
                  {team2Confirmed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="mt-2 text-lg font-bold text-green-400"
                    >
                      {team2Bonus ? t.extraCardMsg : t.noBonusMsg}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cardInputPhase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center space-y-4 w-full mt-4"
              >
                {cardError && <div className="text-red-500">{cardError}</div>}
                <div className="flex flex-col md:flex-row md:space-x-8">
                  {/* Team 1 Card Input */}
                  <div className="flex flex-col items-start">
                    <span className="bg-green-700 bg-opacity-80 px-3 py-1 rounded text-white font-bold mb-2">
                      {team1Name.toUpperCase()}
                    </span>
                    <input
                      type="text"
                      placeholder={t.cardPlaceholder}
                      value={team1Card}
                      onChange={(e) => setTeam1Card(e.target.value)}
                      className="px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-56"
                    />
                    {team1Card.trim() && (
                      <div className="mt-2">
                        <img
                          src={`/cards/gng1503${team1Card.trim().toUpperCase()}.png`}
                          alt={team1Card.trim().toUpperCase()}
                          className="w-56 object-contain border-2 border-white rounded"
                        />
                      </div>
                    )}
                  </div>
                  {/* Team 2 Card Input */}
                  <div className="flex flex-col items-start">
                    <span className="bg-red-700 bg-opacity-80 px-3 py-1 rounded text-white font-bold mb-2">
                      {team2Name.toUpperCase()}
                    </span>
                    <input
                      type="text"
                      placeholder={t.cardPlaceholder}
                      value={team2Card}
                      onChange={(e) => setTeam2Card(e.target.value)}
                      className="px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-56"
                    />
                    {team2Card.trim() && (
                      <div className="mt-2">
                        <img
                          src={`/cards/gng1503${team2Card.trim().toUpperCase()}.png`}
                          alt={team2Card.trim().toUpperCase()}
                          className="w-56 object-contain border-2 border-white rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSubmitCards}
                  className="mt-4 px-6 py-3 bg-green-600 rounded-lg text-white text-xl hover:bg-green-700 transition"
                >
                  {t.submitCards}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Round Winner Overlay */}
          <AnimatePresence>
            {showRoundWinner && roundWinner && (
              <motion.div
                key="roundWinnerOverlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50"
              >
                <div className="text-center">
                  {roundWinner === "team1" && (
                    <>
                      <h2 className="text-4xl font-extrabold mb-4">
                        {t.winnerText} {team1Name.toUpperCase()}
                      </h2>
                      <img
                        src="/roundteam1win.jpg"
                        alt="Team 1 Winner"
                        className="w-96 h-auto mx-auto border-4 border-white rounded"
                      />
                    </>
                  )}
                  {roundWinner === "team2" && (
                    <>
                      <h2 className="text-4xl font-extrabold mb-4">
                        {t.winnerText} {team2Name.toUpperCase()}
                      </h2>
                      <img
                        src="/roundteam2win.jpg"
                        alt="Team 2 Winner"
                        className="w-96 h-auto mx-auto border-4 border-white rounded"
                      />
                    </>
                  )}
                  {roundWinner === "tie" && (
                    <h2 className="text-4xl font-extrabold mb-4">{t.tieText}</h2>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Round Animation */}
          <AnimatePresence>
            {showNewRoundAnim && (
              <motion.div
                key="newRoundAnim"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className="p-6 bg-blue-700 rounded-lg shadow-lg text-4xl font-extrabold mt-6"
              >
                {t.newRoundMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Default Export: GamePage Component
// -----------------------------------------------------------------------------
const GamePage: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <GameContent />
    </Suspense>
  );
};

export default GamePage;