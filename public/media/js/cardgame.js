let cards = Array.from(document.getElementsByClassName('card'));
let values = Array.from({length: 8}, (_, i) => i+1).concat(Array.from({length: 8}, (_, i) => i+1));
let wrong_guesses_amount = document.getElementById('wrong_guesses_amount')
wrong_guesses = 0;
correct_guesses = 0;
values.sort(() => Math.random() - 0.5);

var card_images = ["","godot.png","css.png","firefox.png","html5.png","javascript.png","linuxmint.png","vlc.png","blender.png"];// dumbest fix of all time

let openCards = [];
cards.forEach((card, index) => {
    card.dataset.value = values[index];
    card.addEventListener('click', function() {
        console.log("Card Clicked")

        if (openCards.length < 2) {
            console.log(openCards)
            card.innerHTML = "<img class = card_img src=\"media/card_img/"+ card_images[card.dataset.value] + "\">";
            console.log(card.innerHTML, card_images[card.dataset.value])
            openCards.push(card);

            if (openCards.length === 2) {
                if (openCards[0].dataset.value !== openCards[1].dataset.value) {
                    setTimeout(() => {
                        openCards.forEach(card => card.textContent = '');
                        openCards = [];
                        wrong_guesses++;//Incorrect guess
                        console.log(wrong_guesses)
                        wrong_guesses_amount.innerHTML = "Wrong Guesses: " + wrong_guesses;
                    }, 1000);

                } else {
                    openCards = [];
                    // Correct guess
                    correct_guesses++;

                    if(correct_guesses == 8){
                        // Won game
                        card.innerHTML = "You Win!!!";
                        saveScore;
                    }
                }
            }
        }
    });
});

function test(){
    //console.log("Card has been clicked")
}

class Game{
    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
    updateScoresLocal(newScore) {
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          scores = JSON.parse(scoresText);
        }
    
        let found = false;
        for (const [i, prevScore] of scores.entries()) {
          if (newScore > prevScore.score) {
            scores.splice(i, 0, newScore);
            found = true;
            break;
          }
        }
    
        if (!found) {
          scores.push(newScore);
        }
    
        if (scores.length > 10) {
          scores.length = 10;
        }
    
        localStorage.setItem('scores', JSON.stringify(scores));
      }
      broadcastEvent(from, type, value) {
        const event = {
          from: from,
          type: type,
          value: value,
        };
        this.socket.send(JSON.stringify(event));
      }
    async saveScore(score) {
    const userName = this.getPlayerName();
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      // Let other players know the game has concluded
      this.broadcastEvent(userName, GameEndEvent, newScore);

      // Store what the service gave us as the high scores
      const scores = await response.json();
      localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
      // If there was an error then just track scores locally
      this.updateScoresLocal(newScore);
    }
  }
}
// BUGS

/*
-No real win state
-Clicking a card multiple times will result in the "You Win" message displaying
-No way to stop the player from interacting with correct cards
*/

// FEATURES TO BE ADDED

/*
-Timer
-Win State
-Broadcast to database for player scores
*/
