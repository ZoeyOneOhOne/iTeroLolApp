const { firebaseConfig } = require('./firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, query, where, increment } = require('firebase/firestore/lite');

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
		numberOfGames: 3,
		team1: team1,
		team2: team2
	}
	const userVoteDocRef = doc(db, `Games/${messageID}`);
	await setDoc(userVoteDocRef, data);
}

async function reportGame(result, messageId, games) {
	const gamesCollectionRef = collection(db, 'Games');
	const docRef = doc(gamesCollectionRef, messageId);
	const updateData =  {
		result: result,
		games: games
	}

	try {
		await updateDoc(docRef, updateData);
		console.log('Game reported successfully');

		const userList = await getUsersWhoVotedCorrectly(messageId, result);
		await updateScoreboard(userList);
	} catch (error) {
		console.error('Error reporting game:', error);
	}
}



async function getUsersWhoVotedCorrectly(messageId, winner) {
	return new Promise(async (resolve, reject) => {
		const gameDocumentRef = doc(collection(db, 'Games'), messageId);
		const votesCollectionRef = collection(gameDocumentRef, 'Votes');
	
		try {
		  const queryVotedFor = query(votesCollectionRef, where('votedFor', '==', winner));
		  const querySnapshot = await getDocs(queryVotedFor);
	
		  const usernames = querySnapshot.docs.map(doc => doc.id);
		  console.log('Usernames with matching votedFor value:', usernames);
		  
		  resolve(usernames);
		} catch (error) {
		  console.error('Error querying documents:', error);
		  reject(error);
		}
	  });
}

async function updateScoreboard(userList) {
	const scoreRef = collection(db, 'Scoreboard');

	try {
		for (const username of userList) {
		  const userDocRef = doc(scoreRef, username);
		  
		  const userDocSnapshot = await getDoc(userDocRef);
	
		  if (userDocSnapshot.exists()) {
			// Document exists, update it
			await updateDoc(userDocRef, {
			  points: increment(1) // Increment the points field by 1
			});
			console.log(`Updated scoreboard for ${username}`);
		  } else {
			// Document doesn't exist, create a new one
			await setDoc(userDocRef, {
				points: 1 // Initialize the points field
			});
			console.log(`Created new scoreboard emtry for ${username}`);
		  }
		}
	  } catch (error) {
		console.error('Error updating scoreboard:', error);
	  }
}

exports.getTeams = getTeams;
exports.castVote = castVote;
exports.addGame = addGame;
exports.seriesVote = seriesVote;
exports.reportGame = reportGame;