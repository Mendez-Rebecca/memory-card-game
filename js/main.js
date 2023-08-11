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

let deck = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
]


/*----- cached element references -----*/
const buttonEl = document.querySelector('button');
const countdownEl = document.getElementById('countdown-timer');
const changeHeading = document.querySelector('h1');


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
    if (evt.target.classList.contains('flipped')) return;
    if (isActive) return;

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

                if (frontImage.style.display === 'block') {
                    frontImage.classList.add('flipped')
                }

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
        if (clicks === 2) {
            cardMatch(firstCard, secondCard);
        }
        isActive = false;
        clicks = 0;
    }
}

function cardMatch(firstImg, secondImg) {
    for (let card of board) {
        if (firstImg === card.id && secondImg === card.match) {
            successes += 1;
            if (successes === 6) {
                getWin();
            }
                isActive = false;
                firstCard = null;
                secondCard = null;
        } else if
            (firstImg === card.id && secondImg !== card.match) {
                const flipBack = setInterval(function() {
                    let firstFrontImage = document.getElementById(`front${firstImg}`).
                        querySelector('.front-image img')
                        firstFrontImage.style.display = 'none';
                    let secondFrontImage = document.getElementById(`front${secondImg}`).
                        querySelector('.front-image img')
                        secondFrontImage.style.display = 'none';
                    let firstBackImage = document.getElementById(`back${firstImg}`).
                        querySelector('.back-image img')
                        firstBackImage.style.display = 'block';
                    let secondBackImage = document.getElementById(`back${secondImg}`).
                        querySelector('.back-image img')
                        secondBackImage.style.display = 'block';

                        isActive = false;
                        firstCard = null;
                        secondCard = null;
                        clearInterval(flipBack);
                }, 1000)
            }
        }
    }


function getWin() {
    changeHeading.innerText = `Congratulations! You matched all the cards!`;
    buttonEl.innerText = 'Reset Game';
    buttonEl.style.visibility = 'visible';
}

function resetGame() {
    changeHeading.innerText = 'Memory Card Game';
    successes = 0;
    cards.forEach(card => {
        const frontImage = card.querySelector('.front-image img');
        const backImage = card.querySelector('.back-image img');
        {
            frontImage.style.display = 'block';
            backImage.style.display = 'none';
        }
    });
    buttonEl.innerText = 'Start Game';
}

function handleButton(evt) {
    if (evt.target.tagName !== 'BUTTON') return;
    if (buttonEl.innerText === 'Start Game') {
        buttonEl.style.visibility = 'hidden';
        countdown();
    } else if (buttonEl.innerText === 'Reset Game') {
        resetGame();
    }
}

function countdown() {
    let count = 3;
    countdownEl.style.visibility = 'visible';
    countdownEl.innerText = count;
    const timer = setInterval(function() {
        count--;
        if (count > 0) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timer);
            countdownEl.style.visibility = 'hidden';
            renderCards();
        }
    }, 1000)
    isActive = false;
}

function renderCards() {
    cards.forEach(card => {
        const frontImage = card.querySelector('.front-image img');
        const backImage = card.querySelector('.back-image img');

        if (frontImage.style.display === 'none') {
            frontImage.style.display = 'block';
            backImage.style.display = 'none';
        } else {
            backImage.style.display = 'block';
            frontImage.style.display = 'none';
        }
    });
}
