const rows = document.querySelectorAll('.row')
const colors = ['green', 'aquamarine', 'yellow', 'orange', 'orangered', 'red']

const onDragOver = (event) => {
    event.preventDefault();
}

const onDrop = (event) => {
    event.preventDefault();
    draggedCardId = event.dataTransfer.getData('id');
    draggedCard = document.getElementById(draggedCardId);

    console.log('current id is:', draggedCardId);
    
    event.target.appendChild(draggedCard);
    console.log('dropped element');
}

rows.forEach((row, index) => {
    const label = row.querySelector('.label');
    label.style.backgroundColor = colors[index]
    row.ondragover = onDragOver;
    row.ondrop = onDrop;
})