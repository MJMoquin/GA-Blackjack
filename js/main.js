/*------------ constants ---------------*/
const players = {
    '1': {
        name: 'Dealer',
        hand: [],
        bank: null
    },
    '2': {
        name: 'Player',
        hand: [],
        bank: 500
    }
}


/*------ app's state (variables) -------*/
let turn = 1;
let winner;
let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
let gameDeck = [];

/*----- cached element references ------*/
const dealerCards = document.getElementById('dealerHand');
const playerCards = document.getElementById('playerHand');
const playScoreEl = document.getElementById('playerScore');
const dealScoreEl = document.getElementById('dealerScore');
const hitBtn = document.getElementById('hitBtn');
const standBtn = document.getElementById('standBtn');
const resetBtn = document.getElementById('reset');
const dealTotal = document.getElementById('dealerTotal');
const playTotal = document.getElementById('playerTotal');
const playBankEl = document.getElementById('playerBank')

/*---------- event listeners -----------*/
standBtn.addEventListener('click', stand);
hitBtn.addEventListener('click', hit)
resetBtn.addEventListener('click', function() {
    players[1].hand = [];
    players[2].hand = [];
    resetBoard();
    turn =1;
    init();
});

/*------------- functions --------------*/
init();

function init() {
    shuffleDeck();
    dealCards();
    renderHands();
    winner = "";
}

function resetBoard() {
    for (let i in players) {
        for (let j = 0; j <= 6; j++) {
            let idStart;
            if(i == 1) {
                idStart = 'dc';
            }
            else {
                idStart = 'pc';
            }
            myId = idStart + j;
            myElement = document.getElementById(myId);
            classList = myElement.classList;
            while (classList.length > 0) {
                classList.remove(classList.item(0));
            }
            classList.add('card', 'large', 'hidden')
            if (j < 2) classList.remove('hidden');
            if (myId === 'dc0') classList.add('back-red');
        }
    }
    dealTotal.classList.add('hidden');
    resetBtn.classList.add('hidden')
    hitBtn.classList.remove('hidden')
    standBtn.classList.remove('hidden')
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

function totalHand(player) {
    let hand = players[player].hand;
    let marker;
    let total = 0;
    for (card in hand) {
      marker = (hand[card].replace(hand[card].charAt(0), ''))
      if (marker === 'K' || marker === 'Q' || marker === 'J') {
        total += 10;
      }
      else if (marker === 'A') {
        total += 1;
      }
      else {
        total += Number(marker);
      }
    }
    if (total <= 11) {
        if (hand.includes('hA') || hand.includes('dA') || hand.includes('cA') || hand.includes('sA')) {
        total += 10;
        }
    }   
    renderScore(total, player);
    
}

function hit() {
    if (turn != 1) return;
    players[2].hand.push(gameDeck[0]);
    gameDeck.shift();
    totalHand(2);
    renderHands();
}

function stand() {
    if (turn != 1) return;
    turn *= -1;
    dealerPlay();
}

function dealerPlay () {
    document.getElementById('dc0').classList.remove('back-red');
    document.getElementById('dealerTotal').classList.remove('hidden');
    if (playScoreEl.innerText == 21 && players[2].hand.length == 2) {
        totalHand(1);
        renderHands();
    }
    else {
        while ((dealScoreEl.innerText) < 17 && (playScoreEl.innerText <= 21)) {
            players[1].hand.push(gameDeck[0]);
            gameDeck.shift();
            totalHand(1);
            renderHands();
        }
    }
    getWinner();
    totalHand(1);
    renderHands();
    hitBtn.classList.add('hidden')
    standBtn.classList.add('hidden')
    resetBtn.classList.remove('hidden')
    
}

function renderHands() {
    for (let i in players) {
        for (let j = 0; j < players[i].hand.length; j++) {
            let idStart;
            if(i == 1) {
                idStart = 'dc';
            }
            else {
                idStart = 'pc';
            }
            myId = idStart + j;
            myElement = document.getElementById(myId);
            myElement.classList.add(players[i].hand[j]);
            myElement.classList.remove('hidden');
        }
    }
    totalHand(2);
    totalHand(1);
}

function renderScore(total, player) {
    if (player === 2) {
        if (Number(total) >=21) {
            playScoreEl.innerText = Number(total);
            stand();
        }
        playScoreEl.innerText= Number(total);
    }
    else {
        if (Number(total) == 21) {
            dealScoreEl.innerText = Number(total);
            stand();
        }
        dealScoreEl.innerText = Number(total);
    }
    playBankEl.innerText = players[2].bank;
}

function renderBank() {
    console.log(winner)
    if (winner == 'player') {
        players[2].bank += 5;
    }
    else if (winner == 'dealer') {
        players[2].bank -= 5;
    }
    playBankEl.innerText = players[2].bank;
}

function getWinner() {
    player = Number(playScoreEl.innerText);
    dealer = Number(dealScoreEl.innerText);
    if ((dealer > player && dealer <= 21) || player > 21) {
        winner = "dealer"
    }
    else if ((player > dealer && player <= 21) || dealer > 21) {
        winner = "player"
    }
    else {
        winner = 'T'
    }
    renderBank();
}
