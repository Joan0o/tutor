/*Final Projects 
Result Page
Created By: Preyash Patel
Last Modified: April 30, 2023 */

// Get the stored values from cookies
const cookies = document.cookie.split(';');
let wordChooserName = '';
let word = '';
let numWrongGuesses = 0;
let guesserName = '';
let isWinner = false;




cookies.forEach(function(cookie) {
	const parts = cookie.split('=');
	const name = parts[0].trim();
	const value = parts[1].trim();

	console.log(parts);

	if (name === 'wordChooserName') {
		wordChooserName = value;
	} else if (name === 'word') {
		word = value;
	} else if (name === 'numWrongGuesses') {
		numWrongGuesses = parseInt(value);
	} else if (name === 'guesserName') {
		guesserName = value;
	} else if (name === 'isWinner') {
		isWinner = (value === 'true');
	}
});

// Update the page elements with the game result
document.getElementById('word-chooser-name').textContent = wordChooserName;
document.getElementById('guesser-name').textContent = guesserName;
document.getElementById('word').textContent = `"${word}"`;
console.log(isWinner);
if (isWinner) {
	document.getElementById('result-text').textContent = `Congratulations ${guesserName}, you guessed the word correctly!`;
} else {
	document.getElementById('result-text').textContent = `Sorry ${guesserName}, you did not guess the word correctly.`;
}

// When the Play Again button is clicked, start a new game
document.getElementById('play-again-button').addEventListener('click', function() {
	window.location.href = 'PatelProject3_Page1.html';
});
