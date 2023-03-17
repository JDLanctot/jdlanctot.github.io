/* -- Add transition to slide in -- */
// Get all the cards
const cards = document.querySelectorAll('.card');

// Loop through each card
cards.forEach(card => {
    // Add the class 'card-show' after a delay
    setTimeout(() => {
        card.classList.add('card-show');
    }, 200 * card.dataset.index); // Use the 'data-index' attribute to delay each card by a different amount
});