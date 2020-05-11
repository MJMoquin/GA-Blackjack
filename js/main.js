/*------------ constants ---------------*/
const players = {
    'player': {
        name: '',
        hand: [],
        bank: 0
    }
    'dealer': {
        name: 'Dealer',
        hand: [],
        bank: null
    }
}


/*------ app's state (variables) -------*/
let turn = 1;
let pot = 0;
let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
let gameDeck = [];

/*----- cached element references ------*/

/*---------- event listeners -----------*/

/*------------- functions --------------*/


function init() {
    players.player.bank = 500;
    shuffleDeck();
    dealCards();

}

function shuffleDeck () {
    let cardToShuffle;
    // Shuffle 5 decks for game play
    for (let i = 1; i <= 5; i++) {
      let tempDeck = deck.slice();
      for (let j = 0; j = tempDeck.length; j++) {
          cardToShuffle = tempDeck.splice(Math.random()*tempDeck.length , 1);
          gameDeck.push(cardToShuffle.toString());
      }
    }
}

function placeBet() {

}

function dealCards() {
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 2; j++) {
        players[i].hand.push(gameDeck[0]);
        gameDeck.shift();
      }   
    }
}

function totalHand() {

}

function hit() {

}

function stand() {

}

function dealerPlay () {

}

function getWinner() {

}

function renderHand() {
    playArea.innerHTML = '';
    cardsInPlay.forEach(function(card) {
        // 0 denotes a card face down
        if (card[0]) {
            let appendCard = document.createElement("div");
            appendCard.className = "card large back-red";
            playArea.appendChild(appendCard);
        // 1 denotes a card being guessed    
        } else if (card[1]) {
            let appendCard = document.createElement("div");
            appendCard.className = `card large ${card[1]}`;
            playArea.appendChild(appendCard);
        // 2 denotes a card guessed correctly    
        } else if (card[2]) {
            let appendCard = document.createElement("div");
            appendCard.className = `card large ${card[2]}`;
            playArea.appendChild(appendCard);
        }
    }) 
}

