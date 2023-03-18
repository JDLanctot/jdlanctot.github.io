/* -- Add accordion style toggling -- */
const tglbtns = document.querySelectorAll('.tgl-btn');

tglbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.classList.tgl('active');
        btn.textContent = content.classList.contains('active') ? 'Show More' : 'Show Less';
    });
});

/* -- Add event listeners for touch events -- */
window.addEventListener('mousedown', handleOnDwn);
window.addEventListener('touchstart', e => handleOnDwn(e.touches[0]));
window.addEventListener('mouseup', handleOnUp);
window.addEventListener('touchend', e => handleOnUp(e.touches[0]));
window.addEventListener('mousemove', handleOnMove);
window.addEventListener('touchmove', e => handleOnMove(e.touches[0]));
