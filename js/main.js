/*----- constants -----*/
const cards = document.querySelectorAll('.card')

const board = [
  { id: '1', match: '7', cardBack: 'back1' },
  { id: '2', match: '8', cardBack: 'back2' },
  { id: '3', match: '9', cardBack: 'back3' },
  { id: '4', match: '10', cardBack: 'back4' },
  { id: '5', match: '11', cardBack: 'back5' },
  { id: '6', match: '12', cardBack: 'back6' },
  { id: '7', match: '1', cardBack: 'back7' },
  { id: '8', match: '2', cardBack: 'back8' },
  { id: '9', match: '3', cardBack: 'back9' },
  { id: '10', match: '4', cardBack: 'back10' },
  { id: '11', match: '5', cardBack: 'back11' },
  { id: '12', match: '6', cardBack: 'back12' },
];

/*----- app's state (variables) -----*/
let successes = 0;
let clicks = 0;
let firstCard;
let secondCard;
let isActive = true;


/*----- cached element references -----*/
const buttonEl = document.querySelector('button');
const countdownEl = document.getElementById('countdown-timer');


/*----- event listeners -----*/
// create an event listener that handles the click on the cards (name it handleCards)
// create an event listener that handles the click of the button (name it handleButton)

document.querySelector('button').addEventListener('click', handleButton);

    // need a button for start game, try again


/*----- functions -----*/
cards.forEach(card => {
    card.addEventListener('click', handleCards);
})

function handleCards(evt) {
    if (!isActive) return;
    let clickedCard = evt.target;
    let backCardId = clickedCard.id;
    if (evt.target.tagName !== 'IMG' || clickedCard.classList.contains('flip-over')) return;
    if (clickedCard !== firstCard) {
        clickedCard.classList.add('flip-over')
        clickedCard.style.display = 'none';
    if ('click') {
        clicks += 1;
    }
        for(let card of board) {
            if (backCardId === card.cardBack) {
                let frontImage = document.getElementById(`front${card.id}`).
                querySelector('.front-image img')
                frontImage.style.display = 'block';
                clickedCard.classList.remove('flip-over')
                if (!firstCard) {
                    return firstCard = clickedCard;
                }
                secondCard = clickedCard;
            }
        }
        for (let card of board) {
            if (firstCard.id === card.cardBack) {
                firstCard = `${card.id}`
            }
            if (secondCard.id === card.cardBack) {
                secondCard = `${card.id}`
            }
        }
        console.log(clicks)
        isActive = false;
        if (clicks === 2) {
            cardMatch(firstCard, secondCard);
        }
        clicks = 0;
    }
}

function cardMatch(firstImg, secondImg) {
    for (let card of board) {

        if (firstImg === card.id && secondImg === card.match) {
            successes += 1;
            let cardImageOne = document.getElementById(`front${card.id}`).
                querySelector('.front-image img')
                cardImageOne.style.display = 'none';
            let cardImageTwo = document.getElementById(`front${card.match}`).
                querySelector('.front-image img')
                cardImageTwo.style.display = 'none';
                console.log(clicks)
                isActive = true;
                firstCard = null;
                secondCard = null;
        } else {

        }
    }
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
            renderCards();
        }
    }, 1000)
}

function renderCards() {
    cards.forEach(card => {
        const frontImage = card.querySelector('.front-image img');
        const backImage = card.querySelector('.back-image img');

        if (frontImage.style.display !== 'none') {
            frontImage.style.display = 'none';
            backImage.style.display = 'block';
        } else {
            backImage.style.display = 'none';
            frontImage.style.display = 'block';
        }
    });
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
