const { firebaseConfig } = require('./firebaseConfig');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, query, where, increment, addDoc } = require('firebase/firestore/lite');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function getTeams() {
	const teamcol = collection(db, 'TeamListWorlds');
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
		const userList = await getUsersWhoVotedCorrectly(messageId, result);
		await updateScoreboard(userList, messageId, games);
	} catch (error) {
		logError(error, error.message, 'ZoeyOneOhOne', 'Error reportin game.');
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
		  
		  resolve(usernames);
		} catch (error) {
		  logError(error, error.message, 'ZoeyOneOhOne', 'Error while getting users who voted correctly.');
		  reject(error);
		}
	  });
}

async function updateScoreboard(userList, messageId, games) {
    const scoreRef = collection(db, 'Scoreboard');

    try {
        for (const username of userList) {
            const userDocRef = doc(scoreRef, username);
            const userDocSnapshot = await getDoc(userDocRef);

            const pointsIncrement = {
                points: increment(1) // Increment the points field by 1
            };

            // Retrieve the user's guessed vote object
            const gameDocumentRef = doc(collection(db, 'Games'), messageId);
            const votesCollectionRef = collection(gameDocumentRef, 'Votes');
            const userVoteDocRef = doc(votesCollectionRef, username);
            const userVoteDocSnapshot = await getDoc(userVoteDocRef);

            // if (userVoteDocSnapshot.exists()) {
            //     const voteObj = userVoteDocSnapshot.data();
            //     const guessedGames = voteObj.numberOfGames;
            //     const actualGames = games;

            //     if (guessedGames === actualGames) {
            //         pointsIncrement.points = increment(2); // Increment by 2 points if guessed both correctly
            //     }
            // }

            if (userDocSnapshot.exists()) {
                // Document exists, update it
                await updateDoc(userDocRef, pointsIncrement);
            } else {
                // Document doesn't exist, create a new one
                await setDoc(userDocRef, pointsIncrement);
            }
        }
    } catch (error) {
		logError(error, error.message, 'ZoeyOneOhOne', 'Error updating scoreboard.')
    }
}

async function getTeamEmoji(messageId, vote) {
	const gameCol = collection(db, 'Games');
	const gameDoc = await getDoc(doc(gameCol, messageId));
	let team = '';

	if (gameDoc.exists()) {
		if (vote === 'team1Button') {
			team = gameDoc.data().team1;
		} else if (vote === 'team2Button') {
			team = gameDoc.data().team2;
		}
	} else {
		console.log('Game not found.');
	}

	const teamCollection = collection(db, 'TeamListWorlds');
    const q = query(teamCollection, where('Name', '==', team));
    const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		return null;
	}

	const teamArray = [];

	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const emoji = data.Emoji;

		const teamObj = {
			name: data.Name,
			emoji: data.Emoji
		}
		teamArray.push(teamObj);
	});

	return teamArray[0];
}

async function logError(error, message, user, description) {
	try {
		const today = new Date();
		const formattedDate = today.toLocaleDateString(); // e.g., "09/18/2023" (format may vary depending on your system's locale)
        const errorString = error instanceof Error ? error.toString() : String(error); // Convert error object to string

		data = {
			date: formattedDate,
			error: errorString,
			message: message,
			user: user,
			status: 'Open',
			description: description
		}
		const errorCollectionRef = collection(db, 'ErrorLog');
		await addDoc(errorCollectionRef, data);
	} catch (error) {
		console.error('An error occurred in logError:', error);
	}
}

exports.getTeams = getTeams;
exports.castVote = castVote;
exports.addGame = addGame;
exports.seriesVote = seriesVote;
exports.reportGame = reportGame;
exports.logError = logError;
exports.getTeamEmoji = getTeamEmoji;