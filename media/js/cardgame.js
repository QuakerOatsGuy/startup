let cards = Array.from(document.getElementsByClassName('card'));
let values = Array.from({length: 8}, (_, i) => i+1).concat(Array.from({length: 8}, (_, i) => i+1));
values.sort(() => Math.random() - 0.5);

let openCards = [];
cards.forEach((card, index) => {
    card.dataset.value = values[index];
    card.addEventListener('click', function() {
        console.log("Card Clicked")
        if (openCards.length < 2) {
            console.log(openCards)
            card.innerHTML = card.dataset.value;
            console.log(card.innerHTML)
            openCards.push(card);
            if (openCards.length === 2) {
                if (openCards[0].dataset.value !== openCards[1].dataset.value) {
                    setTimeout(() => {
                        openCards.forEach(card => card.textContent = '');
                        openCards = [];
                    }, 1000);
                } else {
                    openCards = [];
                }
            }
        }
    });
});

function test(){
    //console.log("Card has been clicked")
}
