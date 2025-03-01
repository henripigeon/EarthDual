"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";

// All Positive Cards (with IDs)
const positiveCards = [
  [
    {
      "id": "A12",
      "nameFr": "Planter arbres",
      "nameEn": "Plant Trees",
      "descFr": "Planter des arbres pour aider à absorber le dioxyde de carbone et améliorer la qualité de l'air.",
      "descEn": "Plant trees to help absorb carbon dioxide and improve air quality."
    },
    {
      "id": "B34",
      "nameFr": "Recyclage (10 tonnes)",
      "nameEn": "Recycling (10 Tons)",
      "descFr": "Recycler 10 tonnes de déchets pour réduire l'empreinte écologique.",
      "descEn": "Recycle 10 tons of waste to reduce the ecological footprint."
    },
    {
      "id": "C56",
      "nameFr": "Recyclage (100 tonnes)",
      "nameEn": "Recycling (100 Tons)",
      "descFr": "Recycler 100 tonnes de déchets pour promouvoir l'économie circulaire.",
      "descEn": "Recycle 100 tons of waste to promote a circular economy."
    },
    {
      "id": "D78",
      "nameFr": "Recyclage (1000 tonnes)",
      "nameEn": "Recycling (1000 Tons)",
      "descFr": "Recycler 1000 tonnes de déchets pour réduire la pollution et préserver les ressources naturelles.",
      "descEn": "Recycle 1000 tons of waste to reduce pollution and conserve natural resources."
    },
  
    {
      "id": "E23",
      "nameFr": "Éolienne",
      "nameEn": "Wind Turbine",
      "descFr": "Installer des éoliennes pour produire de l'énergie propre et renouvelable.",
      "descEn": "Install wind turbines to generate clean and renewable energy."
    },
    {
      "id": "F45",
      "nameFr": "Hydraulique",
      "nameEn": "Hydropower",
      "descFr": "Utiliser l'énergie hydraulique pour produire de l'électricité en utilisant le mouvement de l'eau.",
      "descEn": "Use hydropower to generate electricity through water movement."
    },
    {
      "id": "G67",
      "nameFr": "Solaire",
      "nameEn": "Solar Energy",
      "descFr": "Installer des panneaux solaires pour produire de l'énergie propre à partir du soleil.",
      "descEn": "Install solar panels to generate clean energy from the sun."
    },
    {
      "id": "H89",
      "nameFr": "Énergie nucléaire",
      "nameEn": "Nuclear Energy",
      "descFr": "Utiliser l'énergie nucléaire de manière sécurisée pour produire de l'électricité avec peu d'émissions.",
      "descEn": "Use nuclear energy safely to generate electricity with minimal emissions."
    },
  
    {
      "id": "J12",
      "nameFr": "Fermer lumière (x3)",
      "nameEn": "Turn off lights (x3)",
      "descFr": "Éteindre les lumières inutiles pour économiser de l'énergie.",
      "descEn": "Turn off unused lights to save energy."
    },
    {
      "id": "K34",
      "nameFr": "Autobus",
      "nameEn": "Bus",
      "descFr": "Utiliser les transports en commun, comme les bus, pour réduire les émissions de gaz à effet de serre.",
      "descEn": "Use public transportation, like buses, to reduce greenhouse gas emissions."
    },
    {
      "id": "L56",
      "nameFr": "Train",
      "nameEn": "Train",
      "descFr": "Prendre le train pour réduire la consommation de carburant et l'empreinte carbone.",
      "descEn": "Take the train to reduce fuel consumption and carbon footprint."
    },
    {
      "id": "M78",
      "nameFr": "Vélo",
      "nameEn": "Bicycle",
      "descFr": "Utiliser le vélo comme moyen de transport pour réduire la pollution et promouvoir la santé.",
      "descEn": "Use bicycles as transportation to reduce pollution and promote health."
    },
  
    {
      "id": "N90",
      "nameFr": "Covoiturage",
      "nameEn": "Carpooling",
      "descFr": "Partager des trajets en voiture pour réduire les émissions et économiser des ressources.",
      "descEn": "Share car rides to reduce emissions and save resources."
    },
    {
      "id": "O23",
      "nameFr": "Acheter localement",
      "nameEn": "Buy Locally",
      "descFr": "Acheter des produits locaux pour réduire l'empreinte carbone liée au transport.",
      "descEn": "Buy local products to reduce the carbon footprint of transportation."
    },
    {
      "id": "P45",
      "nameFr": "Labourage",
      "nameEn": "Plowing",
      "descFr": "Utiliser des méthodes agricoles durables pour préserver la terre et la biodiversité.",
      "descEn": "Use sustainable farming practices to preserve the land and biodiversity."
    },
    {
      "id": "Q67",
      "nameFr": "Compostage",
      "nameEn": "Composting",
      "descFr": "Recycler les déchets organiques en compost pour enrichir le sol et réduire les déchets.",
      "descEn": "Recycle organic waste into compost to enrich soil and reduce waste."
    },
  
    {
      "id": "R89",
      "nameFr": "Don organisation but non lucratif (10$)",
      "nameEn": "Donation to Non-profit Organization (10$)",
      "descFr": "Faire un don de 10$ à une organisation à but non lucratif pour soutenir des causes sociales et environnementales.",
      "descEn": "Donate $10 to a non-profit organization to support social and environmental causes."
    },
    {
      "id": "S12",
      "nameFr": "Don organisation but non lucratif (100$)",
      "nameEn": "Donation to Non-profit Organization (100$)",
      "descFr": "Faire un don de 100$ à une organisation à but non lucratif pour renforcer son impact.",
      "descEn": "Donate $100 to a non-profit organization to amplify its impact."
    },
    {
      "id": "T34",
      "nameFr": "Don organisation but non lucratif (1000$)",
      "nameEn": "Donation to Non-profit Organization (1000$)",
      "descFr": "Faire un don de 1000$ pour aider à financer des projets de grande envergure dans des organisations à but non lucratif.",
      "descEn": "Donate $1000 to help fund large-scale projects in non-profit organizations."
    },
    {
      "id": "U56",
      "nameFr": "Sensibiliser le public",
      "nameEn": "Raise Public Awareness",
      "descFr": "Organiser des événements ou des campagnes pour sensibiliser le public aux enjeux environnementaux.",
      "descEn": "Organize events or campaigns to raise public awareness about environmental issues."
    },
  
    {
      "id": "V78",
      "nameFr": "Programme de protection des espèces en danger",
      "nameEn": "Rescue and Rehabilitation Program",
      "descFr": "Participer à des programmes de sauvetage et de réhabilitation pour protéger les espèces en danger.",
      "descEn": "Participate in rescue and rehabilitation programs to protect endangered species."
    },
    {
      "id": "W90",
      "nameFr": "Former lois et législations",
      "nameEn": "Create Laws and Legislation",
      "descFr": "Mettre en place des lois et législations pour soutenir la protection de l'environnement.",
      "descEn": "Create laws and legislation to support environmental protection."
    },
    {
      "id": "X23",
      "nameFr": "Lois pour entreprise",
      "nameEn": "Laws for Businesses",
      "descFr": "Créer des lois obligeant les entreprises à adopter des pratiques durables.",
      "descEn": "Create laws requiring businesses to adopt sustainable practices."
    },
    {
      "id": "Y45",
      "nameFr": "Réduire consommation de viande",
      "nameEn": "Reduce Meat Consumption",
      "descFr": "Réduire la consommation de viande pour diminuer l'impact environnemental de l'élevage.",
      "descEn": "Reduce meat consumption to decrease the environmental impact of livestock farming."
    },
  
    {
      "id": "Z67",
      "nameFr": "Voiture électrique",
      "nameEn": "Electric Car",
      "descFr": "Utiliser une voiture électrique pour réduire les émissions de gaz à effet de serre.",
      "descEn": "Use an electric car to reduce greenhouse gas emissions"
    },
    {
      "id": "A90",
      "nameFr": "Courte douche",
      "nameEn": "Short Shower",
      "descFr": "Prendre des douches plus courtes pour économiser de l'eau.",
      "descEn": "Take shorter showers to conserve water."
    },
    {
      "id": "B23",
      "nameFr": "Fermer robinet",
      "nameEn": "Turn off Tap",
      "descFr": "Fermer le robinet lorsque vous ne l'utilisez pas pour économiser de l'eau.",
      "descEn": "Turn off the tap when not in use to conserve water."
    },
  
    {
      "id": "C45",
      "nameFr": "Bouteille d’eau réutilisable",
      "nameEn": "Reusable Water Bottle",
      "descFr": "Utiliser une bouteille d'eau réutilisable pour éviter les déchets plastiques.",
      "descEn": "Use a reusable water bottle to avoid plastic waste."
    },
    {
      "id": "D67",
      "nameFr": "Réduire usage de papier (papier toilette, papier pour essuyer les mains)",
      "nameEn": "Reduce Paper Usage (Toilet Paper, Paper Towels)",
      "descFr": "Réduire l'utilisation de papier pour diminuer la déforestation et les déchets.",
      "descEn": "Reduce paper usage to decrease deforestation and waste."
    },
    {
      "id": "E89",
      "nameFr": "Consignation déchets",
      "nameEn": "Deposit Waste",
      "descFr": "Mettre en place un système de consignation des déchets pour encourager le recyclage.",
      "descEn": "Implement a waste deposit system to encourage recycling."
    },
    {
      "id": "F12",
      "nameFr": "Taxe carbone",
      "nameEn": "Carbon Tax",
      "descFr": "Instaurer une taxe sur le carbone pour inciter les entreprises à réduire leurs émissions.",
      "descEn": "Implement a carbon tax to incentivize businesses to reduce emissions."
    },
    {
      "id": "G34",
      "nameFr": "Sac réutilisable",
      "nameEn": "Reusable Bag",
      "descFr": "Utiliser un sac réutilisable pour réduire les déchets plastiques.",
      "descEn": "Use a reusable bag to reduce plastic waste."
    },
    {
      "id": "H56",
      "nameFr": "Réduire chauffage/climatisation",
      "nameEn": "Reduce Heating/AC",
      "descFr": "Réduire l'utilisation du chauffage et de la climatisation pour économiser de l'énergie.",
      "descEn": "Reduce heating and air conditioning usage to save energy."
    },
    {
      "id": "I78",
      "nameFr": "Nettoyer déchet (rue)",
      "nameEn": "Clean up Waste (Street)",
      "descFr": "Participer à des nettoyages communautaires pour réduire les déchets dans les rues.",
      "descEn": "Participate in community clean-ups to reduce waste in the streets."
    },
    {
      "id": "J90",
      "nameFr": "Jardin communautaire",
      "nameEn": "Community Garden",
      "descFr": "Créer un jardin communautaire pour encourager la production alimentaire locale.",
      "descEn": "Create a community garden to encourage local food production."
    },
    {
      "id": "K23",
      "nameFr": "Éliminer plastique usage unique",
      "nameEn": "Eliminate Single-Use Plastics",
      "descFr": "Éliminer l'utilisation de plastiques à usage unique pour réduire la pollution plastique.",
      "descEn": "Eliminate the use of single-use plastics to reduce plastic pollution."
    },
    {
      "id": "L45",
      "nameFr": "Bac récupération eau pluie (arroser plantes)",
      "nameEn": "Rainwater Harvesting Bin (Water Plants)",
      "descFr": "Installer un bac de récupération d'eau de pluie pour arroser les plantes.",
      "descEn": "Install a rainwater harvesting bin to water plants."
    },
  
    {
      "id": "M12",
      "nameFr": "Protection des forêts",
      "nameEn": "Forest Protection",
      "descFr": "Préserver les forêts pour absorber le carbone et protéger la biodiversité.",
      "descEn": "Preserve forests to absorb carbon and protect biodiversity."
    },
    {
      "id": "N34",
      "nameFr": "Toiture végétalisée",
      "nameEn": "Green Roof",
      "descFr": "Installer une toiture végétalisée pour améliorer l'isolation et absorber le CO2.",
      "descEn": "Install a green roof to improve insulation and absorb CO2."
    },
    {
      "id": "O56",
      "nameFr": "Plantation de haies Haie végétale",
      "nameEn": "Hedge Planting",
      "descFr": "Planter des haies pour protéger la faune et stocker du carbone.",
      "descEn": "Plant hedges to protect wildlife and store carbon."
    },
  
    {
      "id": "P78",
      "nameFr": "Mode écoresponsable",
      "nameEn": "Sustainable Fashion",
      "descFr": "Acheter des vêtements durables et éthiques pour réduire l'empreinte carbone de l'industrie textile.",
      "descEn": "Buy sustainable and ethical clothing to reduce the carbon footprint of the fashion industry."
    },
    {
      "id": "Q90",
      "nameFr": "Isolation thermique",
      "nameEn": "Thermal Insulation",
      "descFr": "Améliorer l’isolation des bâtiments pour réduire la consommation d’énergie.",
      "descEn": "Improve building insulation to reduce energy consumption."
    },
  
    {
      "id": "R23",
      "nameFr": "Éducation environnementale",
      "nameEn": "Environmental Education",
      "descFr": "Sensibiliser les jeunes aux enjeux climatiques et aux gestes éco-responsables.",
      "descEn": "Educate young people on climate issues and eco-friendly actions."
    },
    {
      "id": "S45",
      "nameFr": "Réduction du gaspillage alimentaire",
      "nameEn": "Reduce Food Waste",
      "descFr": "Éviter le gaspillage alimentaire en consommant intelligemment et en compostant les déchets organiques.",
      "descEn": "Avoid food waste by consuming smartly and composting organic waste."
    },
    {
      "id": "T67",
      "nameFr": "Réduction des déchets électroniques",
      "nameEn": "Reduce Electronic Waste",
      "descFr": "Recycler et réparer les appareils électroniques pour limiter les déchets toxiques.",
      "descEn": "Recycle and repair electronic devices to reduce toxic waste."
    },
  
    {
      "id": "U89",
      "nameFr": "Réduction de plastique dans l’océan",
      "nameEn": "Reduce Ocean Plastic",
      "descFr": "Participer aux initiatives visant à réduire la pollution plastique dans les océans.",
      "descEn": "Participate in initiatives to reduce plastic pollution in the oceans."
    },
    {
      "id": "V12",
      "nameFr": "Encourager l'agroécologie",
      "nameEn": "Encourage Agroecology",
      "descFr": "Soutenir des pratiques agricoles durables qui respectent les écosystèmes.",
      "descEn": "Support sustainable farming practices that respect ecosystems."
    },
    {
      "id": "W34",
      "nameFr": "Récupération de chaleur industrielle",
      "nameEn": "Industrial Heat Recovery",
      "descFr": "Réutiliser la chaleur produite par les industries pour économiser de l’énergie.",
      "descEn": "Reuse heat produced by industries to save energy."
    },
    {
      "id": "X56",
      "nameFr": "Encourager le télétravail",
      "nameEn": "Encourage Remote Work",
      "descFr": "Favoriser le télétravail pour réduire les déplacements et les émissions de CO2.",
      "descEn": "Promote remote work to reduce commuting and CO2 emissions."
    },
    {
      "id": "Y78",
      "nameFr": "Réutilisation des matériaux de construction",
      "nameEn": "Reuse Construction Materials",
      "descFr": "Recycler et réutiliser des matériaux de construction pour limiter l’extraction de ressources.",
      "descEn": "Recycle and reuse construction materials to limit resource extraction."
    },
    {
      "id": "Z90",
      "nameFr": "Réduction des feux de forêt",
      "nameEn": "Reduce Wildfires",
      "descFr": "Mettre en place des actions pour prévenir et limiter les feux de forêt.",
      "descEn": "Implement actions to prevent and reduce wildfires."
    },
    {
      "id": "A13",
      "nameFr": "Plan de reforestation",
      "nameEn": "Reforestation Plan",
      "descFr": "Participer à des projets de reforestation pour restaurer les écosystèmes.",
      "descEn": "Participate in reforestation projects to restore ecosystems."
    },
    {
      "id": "B13",
      "nameFr": "Déforestation massive",
      "nameEn": "Mass Deforestation",
      "descFr": "Couper excessivement les arbres sans replanter, réduisant l’absorption du CO2.",
      "descEn": "Excessively cutting trees without replanting, reducing CO2 absorption."
    },
    {
      "id": "C35",
      "nameFr": "Utilisation excessive de plastique",
      "nameEn": "Excessive Plastic Use",
      "descFr": "Utiliser du plastique à usage unique sans recyclage, augmentant la pollution.",
      "descEn": "Using single-use plastic without recycling, increasing pollution."
    },
    {
      "id": "D57",
      "nameFr": "Gaspillage alimentaire",
      "nameEn": "Food Waste",
      "descFr": "Jeter de la nourriture en bon état, augmentant le gaspillage des ressources.",
      "descEn": "Throwing away edible food, increasing resource waste."
    },
    {
      "id": "E79",
      "nameFr": "Surconsommation d’eau",
      "nameEn": "Overconsumption of Water",
      "descFr": "Utiliser de l’eau potable de manière excessive sans nécessité.",
      "descEn": "Using drinking water excessively without necessity."
    },
    {
      "id": "F91",
      "nameFr": "Privilégier la voiture individuelle",
      "nameEn": "Prioritizing Individual Cars",
      "descFr": "Utiliser une voiture individuelle plutôt que des transports en commun, augmentant les émissions de CO2.",
      "descEn": "Using an individual car instead of public transportation, increasing CO2 emissions."
    },
    {
      "id": "G14",
      "nameFr": "Laisser les lumières allumées inutilement",
      "nameEn": "Leaving Lights On Unnecessarily",
      "descFr": "Ne pas éteindre les lumières lorsqu’elles ne sont pas utilisées, gaspillant de l’énergie.",
      "descEn": "Not turning off lights when not in use, wasting energy."
    },
    {
      "id": "H36",
      "nameFr": "Chauffage/climatisation excessive",
      "nameEn": "Excessive Heating/AC Use",
      "descFr": "Mettre le chauffage ou la climatisation trop fort, augmentant la consommation énergétique.",
      "descEn": "Using heating or AC too much, increasing energy consumption."
    },
    {
      "id": "I58",
      "nameFr": "Surproduction de déchets électroniques",
      "nameEn": "Overproduction of E-Waste",
      "descFr": "Jeter des appareils électroniques au lieu de les réparer ou recycler.",
      "descEn": "Throwing away electronics instead of repairing or recycling them."
    },
    {
      "id": "J80",
      "nameFr": "Acheter sans réfléchir",
      "nameEn": "Mindless Buying",
      "descFr": "Acheter des produits inutiles ou non durables, augmentant la surconsommation.",
      "descEn": "Buying unnecessary or non-durable products, increasing overconsumption."
    },
    {
      "id": "K92",
      "nameFr": "Ignorer le recyclage",
      "nameEn": "Ignoring Recycling",
      "descFr": "Jeter les déchets recyclables dans la poubelle ordinaire, augmentant la pollution.",
      "descEn": "Throwing recyclable waste in regular trash, increasing pollution."
    },
    {
      "id": "M37",
      "nameFr": "Voyager fréquemment en avion",
      "nameEn": "Frequent Air Travel",
      "descFr": "Prendre souvent l’avion sans nécessité, augmentant l’empreinte carbone.",
      "descEn": "Frequently flying without necessity, increasing carbon footprint."
    },
    {
      "id": "N59",
      "nameFr": "Acheter des produits importés au lieu du local",
      "nameEn": "Buying Imported Instead of Local",
      "descFr": "Privilégier les produits importés, augmentant l’empreinte carbone liée au transport.",
      "descEn": "Prioritizing imported goods, increasing the carbon footprint of transportation."
    },
    {
      "id": "O81",
      "nameFr": "Jeter des déchets dans la nature",
      "nameEn": "Littering",
      "descFr": "Abandonner ses déchets dans la nature, polluant les sols et l’eau.",
      "descEn": "Leaving waste in nature, polluting soil and water."
    },
    {
      "id": "P93",
      "nameFr": "Encourager l’obsolescence programmée",
      "nameEn": "Encouraging Planned Obsolescence",
      "descFr": "Acheter et produire des objets conçus pour ne pas durer, augmentant les déchets.",
      "descEn": "Buying and producing items designed to break quickly, increasing waste."
    },
    {
      "id": "Q16",
      "nameFr": "Reforestation à grande échelle",
      "nameEn": "Large-Scale Reforestation",
      "descFr": "Planter des millions d'arbres pour restaurer les forêts et absorber le CO2.",
      "descEn": "Plant millions of trees to restore forests and absorb CO2."
    },
    {
      "id": "R38",
      "nameFr": "Nettoyage des océans",
      "nameEn": "Ocean Cleanup",
      "descFr": "Retirer les déchets plastiques des océans pour protéger la faune marine.",
      "descEn": "Remove plastic waste from the oceans to protect marine life."
    },
    {
      "id": "S60",
      "nameFr": "Protection des forêts tropicales",
      "nameEn": "Tropical Forest Protection",
      "descFr": "Préserver les forêts tropicales, essentielles à la biodiversité et à l'absorption du CO2.",
      "descEn": "Protect tropical forests, essential for biodiversity and CO2 absorption."
    },
    {
      "id": "T82",
      "nameFr": "Développement des énergies renouvelables",
      "nameEn": "Renewable Energy Development",
      "descFr": "Investir massivement dans l’énergie solaire, éolienne et hydraulique pour remplacer les énergies fossiles.",
      "descEn": "Invest heavily in solar, wind, and hydro energy to replace fossil fuels."
    },
    {
      "id": "U94",
      "nameFr": "Régénération des sols agricoles",
      "nameEn": "Agricultural Soil Regeneration",
      "descFr": "Restaurer les sols dégradés avec des techniques agricoles durables pour capturer le CO2 et améliorer la biodiversité.",
      "descEn": "Restore degraded soils with sustainable farming techniques to capture CO2 and improve biodiversity."
    },
    {
      "id": "V17",
      "nameFr": "Création de réserves naturelles",
      "nameEn": "Creation of Nature Reserves",
      "descFr": "Protéger des espaces naturels en les transformant en réserves pour préserver la faune et la flore.",
      "descEn": "Protect natural areas by turning them into reserves to preserve wildlife and plants."
    },
    {
      "id": "W39",
      "nameFr": "Construction de villes écologiques",
      "nameEn": "Construction of Eco-Cities",
      "descFr": "Construire des villes basées sur des énergies renouvelables, des transports propres et une gestion écologique des ressources.",
      "descEn": "Build cities based on renewable energy, clean transportation, and ecological resource management."
    },
    {
      "id": "X61",
      "nameFr": "Innovation en capture du carbone",
      "nameEn": "Carbon Capture Innovation",
      "descFr": "Développer des technologies avancées pour capturer et stocker le carbone de l’atmosphère.",
      "descEn": "Develop advanced technologies to capture and store atmospheric carbon."
    }
  ]
    
];

function CardsInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as "en" | "fr") || "en";

  const pageTitle = lang === "fr" ? "Cartes" : "Cards";
  const backButtonText = lang === "fr" ? "Retour à l'accueil" : "Back to Home";
  const toggleButtonText = lang === "fr" ? "Passer en anglais" : "Switch to French";

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "fr" : "en";
    router.push(`/cards?lang=${newLang}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white font-sans">
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
        <h1 className="text-5xl font-extrabold text-center mb-10">{pageTitle}</h1>
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {positiveCards.flat().map((card, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white bg-opacity-20 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {/* Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                {idx + 1}
              </div>
              <h3 className="text-3xl font-extrabold mb-3 border-b-2 border-white pb-2">
                {lang === "fr" ? card.nameFr : card.nameEn}
              </h3>
              <p className="text-xl leading-relaxed">
                {lang === "fr" ? card.descFr : card.descEn}
              </p>
              {card.id && (
                <div className="mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/cards/gng1503${card.id}.png`}
                    alt={lang === "fr" ? card.nameFr : card.nameEn}
                    className="w-full object-contain"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CardsInfoPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading Cards...</div>}>
      <CardsInfoContent />
    </Suspense>
  );
}
