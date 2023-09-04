const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');
const textBox = document.querySelector('#textBox');

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function getColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
                (25 + 70 * Math.random()) + '%,' + 
                (85 + 10 * Math.random()) + '%)'
}

/* Add Card Logic */
const addCardToBank = (event) => {
    const card = createCard(textBox.value);
    const bank = document.querySelector('#bank');
    bank.appendChild(card);
}
addCard.onclick = addCardToBank;

/* Card Logic */
const createCard = (id) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable', 'true');
    card.style.backgroundColor = getColor();
    card.id = id;
    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;
    card.onclick = deleteCard;
    changeText(card, id);
    return card;
}

const changeText = (card, id) => {
    card.innerHTML = id;
}

const deleteCard = (event) => {
    const willDeleteCard = window.confirm('Do you want to delete this card?');
    if (willDeleteCard) {
        event.target.remove();
    }
}

const onDragStart = (event) => {
    console.log('dragging element');
    event.dataTransfer.setData('id', event.target.id);
    setTimeout(() => {
        event.target.style.visibility = 'hidden';
    }, 50)
}

const onDragEnd = (event) => {
    event.target.style.visibility = 'visible';
    console.log('end dragging');

}

cards.forEach((card) => {
    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;
})