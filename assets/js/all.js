/* -- Parallax movement of the portfolio items -- */
const track = document.getElementById("image-track");
let prevPercentage = 0;

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth * 3 / 5;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

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

/* -- Handling a button to toggle the portfolio as visible or not -- */
const portfolioBtn = document.getElementById("portfolio-btn");
const portfolioCloseBtn = document.getElementById("portfolio-close-btn");
const headerPortfolioBtn = document.getElementById("header-portfolio-btn");

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

/* -- Add transition to slide in -- */
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    setTimeout(() => {
        card.classList.add('card-show');
    }, 200 * index);
});

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
