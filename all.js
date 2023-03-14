/* -- Paralax movement of the portfolio items -- */
const track = document.getElementById("image-track");

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth*3/5;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
            parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1400, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("track-image")) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1400, fill: "forwards" }
        );
    }
};

/* -- Handing a button to toggle the portfolio as visible or not -- */
const portfolioBtn = document.getElementById("portfolio-btn");
let prevPercentage = track.dataset.prevPercentage || 0;

const toggleTrackVisibility = (button) => {
    if (track.style.visibility === "visible") {
        track.style.visibility = "hidden";
        track.dataset.mouseDownAt = 0;
        track.dataset.percentage = 0;
        prevPercentage = track.dataset.prevPercentage || 0;
        track.dataset.prevPercentage = 0;
    } else {
        track.style.visibility = "visible";
        track.dataset.mouseDownAt = 0;
        track.dataset.percentage = prevPercentage;
        track.dataset.prevPercentage = prevPercentage;
    }
};

portfolioBtn.onclick = () => toggleTrackVisibility(portfolioBtn);

const headerPortfolioBtn = document.getElementById("header-portfolio-btn");

const toggleHeaderBtnStyle = () => {
    headerPortfolioBtn.classList.toggle("active");
    if (headerPortfolioBtn.classList.contains("active")) {
        headerPortfolioBtn.style.backgroundColor = "#FFFAFF";
        headerPortfolioBtn.style.color = "#0D1F22";
    } else {
        headerPortfolioBtn.style.backgroundColor = "";
        headerPortfolioBtn.style.color = "";
    }
}

headerPortfolioBtn.onclick = () => {
    toggleHeaderBtnStyle();
    toggleTrackVisibility(headerPortfolioBtn);
};

portfolioBtn.onclick = () => {
    toggleHeaderBtnStyle();
    toggleTrackVisibility(portfolioBtn);
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

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

/* -- Add accordion style toggling -- */
// Get all the toggle buttons
const toggleButtons = document.querySelectorAll('.toggle-btn');

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