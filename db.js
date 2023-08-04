const { firebaseConfig } = require('./firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function getTeams() {
	const teamcol = collection(db, 'TeamList');
	const teams = await getDocs(teamcol);
	const teamlist = teams.docs.map(doc => doc.data());
    const teamResult = await Promise.all(teamlist);
	return teamResult;
}

exports.getTeams = getTeams;