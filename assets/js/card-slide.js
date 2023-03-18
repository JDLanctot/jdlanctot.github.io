/* -- Add transition to slide in -- */
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('card-show');
    }, 200 * index);
});