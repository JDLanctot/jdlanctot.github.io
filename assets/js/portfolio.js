/* -- Parallax movement of the portfolio items -- */
const track = document.getElementById("img-track");
let prevPct = 0;

const handleOnDwn = e => {
  track.dataset.mouseDwnAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDwnAt = "0";
  track.dataset.prevPct = track.dataset.pct;
};

const handleOnMove = e => {
  if (track.dataset.mouseDwnAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth * 3 / 5;
  const pct = (mouseDelta / maxDelta) * -100;
  const nextPctUnconstrained = parseFloat(track.dataset.prevPct) + pct;
  const nextPct = Math.max(Math.min(nextPctUnconstrained, 0), -100);

  track.dataset.pct = nextPct;

  track.animate(
      {
        transform: `translate(${nextPct}%, -50%)`,
      },
      { duration: 1400, fill: "forwards" }
  );

  for (const img of track.getElementsByClassName("track-img")) {
    img.animate(
        {
          objectPosition: `${100 + nextPct}% center`,
        },
        { duration: 1400, fill: "forwards" }
    );
  }
};

/* -- Handling a button to toggle the portfolio as visible or not -- */
const pfBtn = document.getElementById("pf-btn");
const pfCloseBtn = document.getElementById("pf-close-btn");
const hdrPfBtn = document.getElementById("hdr-pf-btn");

const tglTrackVis = () => {
  const isTrackVisible = track.style.visibility === "visible";
  const pct = isTrackVisible ? 0 : prevPct;

  track.style.visibility = isTrackVisible ? "hidden" : "visible";
  track.dataset.mouseDwnAt = 0;
  track.dataset.pct = pct;
  track.dataset.prevPct = pct;
};

const tglHdrBtnStyle = () => {
  hdrPfBtn.classList.toggle("active");

  if (hdrPfBtn.classList.contains("active")) {
    hdrPfBtn.style.backgroundColor = "#FFFAFF";
    hdrPfBtn.style.color = "#0D1F22";
  } else {
    hdrPfBtn.style.backgroundColor = "";
    hdrPfBtn.style.color = "";
  }
};

const tglVisAndStyle = () => {
  tglTrackVis();
  tglHdrBtnStyle();
};

pfBtn.addEventListener("click", tglVisAndStyle);
pfCloseBtn.addEventListener("click", tglVisAndStyle);
hdrPfBtn.addEventListener("click", tglVisAndStyle);