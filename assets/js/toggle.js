/* -- Add accordion style toggling -- */
// Get all the toggle btns
const togglebtns = document.querySelectorAll('.toggle-btn');

// Loop through each toggle btn
togglebtns.forEach(btn => {
    // Add a click event listener to each btn
    btn.addEventListener('click', () => {
        // Get the next sibling element of the btn
        const content = btn.nextElementSibling;
        // Toggle the "hidden" class on the content element
        content.classList.toggle('active');
        // Change the text of the btn based on whether the content is hidden or not
        if (content.classList.contains('active')) {
            btn.textContent = 'Show More';
        } else {
            btn.textContent = 'Show Less';
        }
    });
});