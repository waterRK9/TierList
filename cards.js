const cards = document.querySelectorAll('.card');
const addCard = document.querySelector('#addCard');
const textBox = document.querySelector('#textBox');
const color = document.querySelector('#colorPicker');

/* Add Card Logic */
const addCardToBank = (event) => {
    const card = createCard(textBox.value, color.value);
    const bank = document.querySelector('#bank');
    bank.appendChild(card);
}
addCard.onclick = addCardToBank;

/* Card Logic */
const createCard = (id, color, cardData = null) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable', 'true');
    card.style.backgroundColor = color;
    card.style.opacity = Math.floor(Math.random() * (0.95 - 0.75 + 1.0)) + 0.75;
    card.id = id;
    card.ondragstart = onDragStart;
    card.ondragend = onDragEnd;
    card.onclick = deleteCard;
    if (cardData?.innerHTML) {
        card.innerHTML = cardData.innerHTML;
        card.style.backgroundColor = cardData.backgroundColor;
    } else {
        changeText(card, id);
    }
    return card;
}

const changeText = (card, id) => {
    card.innerHTML = id;

    /* Save Data to Local Storage */
    console.log(card.parentNode);
    const cardData = {
        innerHTML: card.innerHTML,
        row: card.parentNode?.querySelector('.label')?.innerText,
        backgroundColor: card.style.backgroundColor,
    }
    window.localStorage.setItem(card.id, JSON.stringify(cardData));
}

const deleteCard = (event) => {
    const willDeleteCard = window.confirm('Do you want to delete this card?');
    if (willDeleteCard) {
        event.target.remove();
        window.localStorage.removeItem(event.target.id);
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

/* Logic upon first window load */
window.onload = () => {
    const keys = Object.keys(window.localStorage);
    keys.forEach((key) => {
        const cardData = JSON.parse(window.localStorage.getItem(key));
        const loadedCard = createCard(key, "", cardData);
        const row = document.querySelectorAll('.rowContainer');
        const correctRowContainer = Array.from(row).find((row) => {
            return row.querySelector('.label').innerText === cardData.row;
        });
        const correctRow = correctRowContainer?.querySelector('.row');
        console.log(correctRow);
        if (correctRow) {
            correctRow.appendChild(loadedCard);
        } else {
            const bank = document.querySelector('#bank');
            bank.appendChild(loadedCard);
        }
    })
}