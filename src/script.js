
const timeToDate = new Date("jan 1,2024");

setInterval(() => {
  const currDate = new Date();
  const timeLeft = timeToDate - currDate;

  if (timeLeft < 0) {
    return;
  }
  flipAllCards(timeLeft);
}, 1000);

function flipAllCards(timeLeft) {
  let d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let s = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  flip(document.querySelector(".days"), d < 10 ? "0" + d : d);
  flip(document.querySelector(".hours"), h < 10 ? "0" + h : h);
  flip(document.querySelector(".minutes"), m < 10 ? "0" + m : m);
  flip(document.querySelector(".seconds"), s < 10 ? "0" + s : s);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");

  let startNumber = +topHalf.textContent;
  if (startNumber < 10) startNumber = "0" + startNumber;

  topHalf.textContent = startNumber;
  bottomHalf.textContent = startNumber;

  if (+newNumber === +startNumber) return;

  const topFlip = document.createElement("div");
  const bottomFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  bottomFlip.classList.add("bottom-flip");

  topFlip.textContent = startNumber;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", (e) => {
    topHalf.textContent = newNumber;
  });

  topFlip.addEventListener("animationend", (e) => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", (e) => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}
