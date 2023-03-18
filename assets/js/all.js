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

/* -- Handing a btn to toggle the portfolio as visible or not -- */
const portfolioBtn = document.getElementById("portfolio-btn");
const portfolioCloseBtn = document.getElementById("portfolio-close-btn");
const headerPortfolioBtn = document.getElementById("header-portfolio-btn");
let prevPercentage = track.dataset.prevPercentage || 0;

const toggleTrackVisibility = () => {
    const isTrackVisible = track.style.visibility === "visible";
    const percentage = isTrackVisible ? 0 : prevPercentage;

    track.style.visibility = isTrackVisible ? "hidden" : "visible";
    track.dataset.mouseDownAt = 0;
    track.dataset.percentage = percentage;
    track.dataset.prevPercentage = percentage;
};

const toggleHeaderBtnStyle = () => {
    headerPortfolioBtn.classList.toggle("active");

    if (headerPortfolioBtn.classList.contains("active")) {
        headerPortfolioBtn.style.backgroundColor = "#FFFAFF";
        headerPortfolioBtn.style.color = "#0D1F22";
    } else {
        headerPortfolioBtn.style.backgroundColor = "";
        headerPortfolioBtn.style.color = "";
    }
};

const toggleVisibilityAndStyle = () => {
    toggleTrackVisibility();
    toggleHeaderBtnStyle();
};

portfolioBtn.addEventListener("click", toggleVisibilityAndStyle);
portfolioCloseBtn.addEventListener("click", toggleVisibilityAndStyle);
headerPortfolioBtn.addEventListener("click", toggleVisibilityAndStyle);

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