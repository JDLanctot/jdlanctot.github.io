/* -- Add accordion style toggling -- */
const toggleBtns = document.querySelectorAll('.toggle-btn');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.classList.toggle('active');
        btn.textContent = content.classList.contains('active') ? 'Show More' : 'Show Less';
    });
});

/* -- Add event listeners for touch events -- */
window.addEventListener('mousedown', handleOnDown);
window.addEventListener('touchstart', e => handleOnDown(e.touches[0]));
window.addEventListener('mouseup', handleOnUp);
window.addEventListener('touchend', e => handleOnUp(e.touches[0]));
window.addEventListener('mousemove', handleOnMove);
window.addEventListener('touchmove', e => handleOnMove(e.touches[0]));
