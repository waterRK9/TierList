const rows = document.querySelectorAll('.rowContainer')
const colors = ['green', 'aquamarine', 'yellow', 'orange', 'orangered', 'red']

const onDragOver = (event) => {
    event.preventDefault();
}

const onDrop = (event) => {
    event.preventDefault();
    draggedCardId = event.dataTransfer.getData('id');
    draggedCard = document.getElementById(draggedCardId);

    const cardData = {
        innerHTML: draggedCard.innerHTML,
        row: event.target.parentNode.querySelector('.label').innerText,
        backgroundColor: draggedCard.style.backgroundColor,
    }
    window.localStorage.setItem(draggedCard.id, JSON.stringify(cardData));
    event.target.appendChild(draggedCard);
    console.log('dropped element');
}

rows.forEach((row, index) => {
    const label = row.querySelector('.label');
    label.style.backgroundColor = colors[index]
    row.ondragover = onDragOver;
    row.ondrop = onDrop;
})