/*Final Projects 
User 1 Page
Created By: Preyash Patel
Last Modified: April 30, 2023 */
// When the form is submitted, store the word chooser's name, word, and number of wrong guesses in cookies and redirect to page 2
document.getElementById('word-chooser-form').addEventListener('submit', function(event) {
	event.preventDefault(); // Prevent the default form submission behavior

	// Get the form inputs
	const wordChooserName = document.getElementById('word-chooser-name').value;
	const word = document.getElementById('word').value;
	const numWrongGuesses = document.getElementById('num-wrong-guesses').value;

	// Store the inputs in cookies
	document.cookie = `wordChooserName=${wordChooserName}`;
	document.cookie = `word=${word}`;
	document.cookie = `numWrongGuesses=${numWrongGuesses}`;
	//document.cookie = `gusserName=${guesserName}`;

	// Redirect to page 2
	window.location.href = 'PatelProject3_Page2.html';
});

