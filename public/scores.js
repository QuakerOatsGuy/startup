async function loadScores() {
  let scores = [];
  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/scores');
    scores = await response.json();
    console.log(scores);

    // Save the scores in case we go offline in the future
    localStorage.setItem('scores', JSON.stringify(scores));
  } catch {
    // If there was an error then just use the last saved scores
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  }

  displayScores(scores);
}

function displayScores(scores) {
  const tableBodyEl = document.querySelector('#scores');

  if (scores.length) {
    // Update the DOM with the scores
    for (const [i, score] of scores.entries()) {
      const positionTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const timeTdEl = document.createElement('td');
      const guessesTdEl = document.createElement('td');
      const dateTdEl = document.createElement('td');

      positionTdEl.textContent = i + 1;
      nameTdEl.textContent = score.name;
      timeTdEl.textContent = score.time;
      guessesTdEl.textContent = score.guesses;
      dateTdEl.textContent = score.date;

      const rowEl = document.createElement('tr');
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(timeTdEl);
      rowEl.appendChild(guessesTdEl);
      rowEl.appendChild(dateTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to play!</td></tr>';
  }
}

loadScores();
