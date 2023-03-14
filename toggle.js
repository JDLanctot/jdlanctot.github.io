/* -- Add accordion style toggling -- */
// Get all the toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-button');

// Loop through each toggle button
toggleButtons.forEach(button => {
    // Add a click event listener to each button
    button.addEventListener('click', () => {
        // Get the next sibling element of the button
        const content = button.nextElementSibling;
        // Toggle the "hidden" class on the content element
        content.classList.toggle('active');
        // Change the text of the button based on whether the content is hidden or not
        if (content.classList.contains('active')) {
            button.textContent = 'Show More';
        } else {
            button.textContent = 'Show Less';
        }
    });
});