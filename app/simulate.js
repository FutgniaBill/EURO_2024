// Importe la fonction connectToDatabase depuis database.js
const { connectToDatabase } = require('./database');

async function simulateEuro2024Draw() {
  try {
    // Connexion à la base de données
    const db = await connectToDatabase();

    // Équipes qualifiées pour l'EURO 2024
    const qualifiedTeams = [
      'Allemagne',
      'Écosse',
      'Hongrie',
      'Suisse',
      'Espagne',
      'Croatie',
      'Italie',
      'Albanie',
      'Slovénie',
      'Danemark',
      'Serbie',
      'Angleterre',
      'Vainqueur des barrages, Voie A',
      'Pays-Bas',
      'Autriche',
      'France',
      'Belgique',
      'Slovaquie',
      'Roumanie',
      'Vainqueur des barrages, Voie B',
      'Turquie',
      'Vainqueur des barrages, Voie C',
      'Portugal',
      'Tchéquie'
    ];

    // Groupes de l'EURO 2024
    const groups = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: []
    };

    // Tire au sort des équipes dans les groupes
    function drawTeams() {
      const shuffledTeams = qualifiedTeams.sort(() => Math.random() - 0.5);

      Object.keys(groups).forEach((group, index) => {
        groups[group] = shuffledTeams.slice(index * 4, (index + 1) * 4);
      });
    }

    // Simule le tirage
    drawTeams();

    // Affiche les équipes dans chaque groupe
    Object.keys(groups).forEach((group) => {
      console.log(`Groupe ${group}:`);
      console.log(groups[group]);
    });

    // Enregistre les résultats du tirage dans la base de données 
    await db.collection('drawResults').insertOne({ groups });
    console.log('Résultats du tirage enregistrés dans la base de données.');

    console.log('Le tirage au sort de l\'Euro 2024 a été simulé avec succès !');
  } catch (error) {
    console.error('Erreur lors de la simulation du tirage :', error);
  }
}

simulateEuro2024Draw();
