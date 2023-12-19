let cards = Array.from(document.getElementsByClassName('card'));
let values = Array.from({length: 8}, (_, i) => i+1).concat(Array.from({length: 8}, (_, i) => i+1));
let wrong_guesses_amount = document.getElementById('wrong_guesses_amount')

let startTime;
let finalTime;
let elapsedTime = 0;
let timerId;
let isRunning = false;


function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerId = requestAnimationFrame(updateTime);
  isRunning = true; // Set the flag to true when the timer starts
  console.log("Timer Start");
}

function stopTimer() {
  cancelAnimationFrame(timerId);
  isRunning = false; // Set the flag to false when the timer stops
  let hours = Math.floor(elapsedTime / 3600000);
  let minutes = Math.floor((elapsedTime % 3600000) / 60000);
  let seconds = ((elapsedTime % 60000) / 1000).toFixed(0);
  
  finalTime = '';
  if (hours > 0) {
    finalTime += `${hours} Hours, `;
  }
  if (minutes > 0) {
    finalTime += `${(minutes < 10 ? "" : "")}${minutes} Minutes, and `;
  }
  finalTime += `${(seconds < 10 ? "" : "")}${seconds} Seconds`;
  
  console.log("Timer Stopped, Final Time: " + finalTime);
}  

function resetTimer() {
  cancelAnimationFrame(timerId);
  elapsedTime = 0;
  document.querySelector("th.time").textContent = formatTime(elapsedTime);
  isRunning = false; // Set the flag to false when the timer resets
}

function updateTime() {
  if (isRunning == true) { // Only update the time if the timer is running
    elapsedTime = Date.now() - startTime;
    document.querySelector("th.time").textContent = formatTime(elapsedTime);
    timerId = requestAnimationFrame(updateTime);
  }
}

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = ((time % 60000) / 1000).toFixed(0);
  return `${hours}:${(minutes < 10 ? "0" : "")}${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}




wrong_guesses = 0;
correct_guesses = 0;
values.sort(() => Math.random() - 0.5);

var card_images = ["","godot.png","css.png","firefox.png","html5.png","javascript.png","linuxmint.png","vlc.png","blender.png"];// dumbest fix of all time

document.querySelector("th.username").textContent = localStorage.userName;
startTimer();
window.scrollTo(0, document.body.scrollHeight);// So you don't have to scroll to the bottom every time

let openCards = [];
cards.forEach((card, index) => {
    card.dataset.value = values[index];
    card.addEventListener('click', function() {
        console.log("Card Clicked")

        // Check if the card is already open or matched
        if (!card.classList.contains('open') && !card.classList.contains('matched')) {
            if (openCards.length < 2) {
                console.log(openCards)
                card.innerHTML = "<img class = card_img src=\"media/card_img/"+ card_images[card.dataset.value] + "\">";
                console.log(card.innerHTML, card_images[card.dataset.value])
                openCards.push(card);
                card.classList.add('open'); // Add 'open' class to the card

                if (openCards.length === 2) {
                    if (openCards[0].dataset.value !== openCards[1].dataset.value) {
                        setTimeout(() => {
                            openCards.forEach(card => {
                                card.textContent = '';
                                card.classList.remove('open'); // Remove 'open' class from the card
                            });
                            openCards = [];
                            wrong_guesses++;//Incorrect guess
                            console.log(wrong_guesses)
                            wrong_guesses_amount.innerHTML = "Wrong Guesses: " + wrong_guesses;
                        }, 1000);

                    } else {
                        openCards.forEach(card => {
                            card.classList.remove('open'); // Remove 'open' class from the cards
                            card.classList.add('matched'); // Add 'matched' class to the cards
                        });
                        openCards = [];
                        // Correct guess
                        correct_guesses++;

                        if(correct_guesses == 8){
                            // Won game
                            stopTimer();
                            console.log(finalTime);
                            document.querySelector(".card-container").innerHTML = 
                            "You Win!!!" + "<br>" + wrong_guesses + " Wrong Guesses" + "<br>" +
                            "You took "+ finalTime + "." + "<br>" +
                            "<button onClick='window.location.reload();'>Play Again</button>"
                            ;
                            let game = new Game();
                            game.saveScore();
                            
                        }
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

    async saveScore() {
    console.log("Saving scores...");
    const userName = this.getPlayerName();
    const userTime = finalTime;
    const userWrongGuesses = wrong_guesses;
    const date = new Date().toLocaleDateString();
    const newScore = {name: userName, time: userTime, guesses: userWrongGuesses, date: date};
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

// FEATURES TO BE ADDED

/*
-Broadcast to database for player scores
*/
