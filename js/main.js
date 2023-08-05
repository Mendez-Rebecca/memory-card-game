/*----- constants -----*/


/*----- app's state (variables) -----*/
let guesses;
let successes;
let clicks;


/*----- cached element references -----*/
const buttonEl = document.querySelector('button');
const countdownEl = document.getElementById('countdown-timer');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const guessesEl = document.getElementById('guesses-remaining');


/*----- event listeners -----*/
// create an event listener that handles the click on the cards (name it handleCards)
// create an event listener that handles the click of the button (name it handleButton)

document.querySelector('button').addEventListener('click', handleButton);
document.getElementById('card-back').addEventListener('click', handleCards);

    // need a button for start game, try again


/*----- functions -----*/
function handleCards(evt) {
    console.log(evt)
    if (evt.target.tagName !== 'IMG')  return;
    cardBack.style.visibility = 'hidden';
    cardFront.style.visibility = 'visible';
}

function handleButton(evt) {
    if (evt.target.tagName !== 'BUTTON') return;
    buttonEl.style.visibility = 'hidden';
    countdown();
}

function countdown() {
    let count = 3;
    countdownEl.style.visibility = 'visible';
    countdownEl.innerText = count;
    const timer = setInterval(function() {
        count--;
        if (count) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timer);
            countdownEl.style.visibility = 'hidden';
            init();
        }
    }, 1000)

}

function init() {
    guesses = 10;
    successes = 0;
    clicks = 0;
    renderCards();
    render();
}

function render() {
    renderGuesses();
}

function renderCards() {
    cardFront.style.visibility = 'hidden';
    cardBack.style.visibility = 'visible';
}

function renderGuesses() {
    guessesEl.style.visibility = 'visible';
    guessesEl.innerText = `${guesses}`;
}

/*----- Pseudo -----*/

/*

1a. Create an interface that explains the instructions of the game.
    a. The game does not begin until the player clicks the "start game" button.
    b. Initialize the game when this button is clicked.


1b. Start with the init();

2. Write up the init function that initalizes the all state of the game.
    This will initialize the score (in this game's case, matched pairs).
    The results will either be a win (matching all the pairs) or a loss (reaching max number of attmepts).
    Use the render() at the end of the init.

3. Create the render function.
    What does this function need to update every time an action is performed?
    a. Cards
    b. Attempts
    c. Successes
    d. The countdown (amount of time you have to view the cards on initial setup)
    Write up the functions for each inside the render.

4. Create renderCards function.
    a. If the two selected cards match, hide the cards.
    b. If the two selected cards do not match, flip the cards back over.
    c. When the cards are all hidden, declare that the player has won.

5. Create renderAttempts function.
    Every time a player fails to create a match after two clicks, this counts as a fail.
        a. If the cards are not hidden after a player has clicked twice, increase the number of attempts.
    When the player has reached the max number of attempts, the player has lost.
        b. If the player reaches max number of attempts, the player can only reset the game and try again.
        c. Play an audio file when the player loses?

6. Create renderSuccesses function.
    When a player reaches the max number of successes, the player has won the game.
        a. If successes === 5, the player wins.
        b. The player can no longer click anything except the reset button.
        c. Play an audio file when the player wins?

7. Create renderCountdown function.
    The player has 30 seconds to review the cards before the game starts.
        a. When the countdown reaches 0, hide the countdown.
        b. Preesing the "play now" will initiate the countdown.

8. Create a function for the event listener (handleCards)
    a. If the area clicked is not a card, return.
    b. If the area clicked is a card, flip the card over.
        I. The player can only make two choices per attempt.
        II. If the clicks reach 2, the player either succeeded or failed.
        III. A card that is already flipped cannot be flipped again.
        IV. If the card is "hidden" the player cannot click it.
    c. winner = success() function
        I. Write up the success function.
    d. render();

9. Create the success function.
    When the player reaches a score of 5, the player has won the game.
        a. If successes !== 5, return 'na'.
        b. If successes === 5, enable the winning game audio, unhide the reset button.

10. Handle buton function.
    a. When the player clicks "start game," initialize the game.
    b. When the player clicks "play again," initialize the game.

*/
