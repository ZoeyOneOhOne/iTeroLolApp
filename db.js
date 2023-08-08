const { firebaseConfig } = require('./firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, setDoc, updateDoc } = require('firebase/firestore/lite');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function getTeams() {
	const teamcol = collection(db, 'TeamList');
	const teams = await getDocs(teamcol);
	const teamlist = teams.docs.map(doc => doc.data());
	return teamlist;
}

async function castVote(team, username, messageID) {
	data = {
		votedFor: team,
	}
	const userVoteDocRef = doc(db, `Games/${messageID}/Votes/${username}`);
	await setDoc(userVoteDocRef, data);
}

async function seriesVote(series, username, messageID) {
	const userVoteDocRef = doc(db, `Games/${messageID}/Votes/${username}`);
	await updateDoc(userVoteDocRef, {
		numberOfGames: series
	});
}

async function addGame(team1, team2, messageID) {
	data = {
		result: 'pending',
		isLocked: false,
		numberOfGames: 3,
		team1: team1,
		team2: team2
	}
	const userVoteDocRef = doc(db, `Games/${messageID}`);
	await setDoc(userVoteDocRef, data);
}

exports.getTeams = getTeams;
exports.castVote = castVote;
exports.addGame = addGame;
exports.seriesVote = seriesVote;