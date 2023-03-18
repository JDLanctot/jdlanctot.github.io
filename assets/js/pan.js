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
let prevPercentage = track.dataset.prevPercentage || 0;

const toggleTrackVisibility = () => {
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

portfolioBtn.onclick = () => toggleTrackVisibility();
portfolioCloseBtn.onclick = () => toggleTrackVisibility();

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