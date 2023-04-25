document.body.style.height = window.innerHeight;
const first_page = document.querySelector(".first_page");
const new_card = document.querySelector(".new_card");
const card = document.getElementById("card");
const front = document.getElementById("front");
const back = document.getElementById("back");
const clear = document.getElementById("clear");
let card_number = 0;
const cards = [];
// {localStorage.setItem("cards_arr",JSON.stringify(cards))}
if (!localStorage.getItem("cards_arr")) {
  localStorage.setItem("cards_arr", JSON.stringify(cards));
}
class Card {
  constructor(question, answer, card_number) {
    this.question = question;
    this.answer = answer;
    this.card_number = card_number;
  }
}

function clear_all() {
  localStorage.clear();
  // localStorage.removeItem("cards_arr")
  cards=[];
}

function addNew() {
  first_page.className = "first_page hide";
  new_card.className = "new_card show";
  document.body.style.backgroundColor = "#cce0fd";
}

function close_new() {
  new_card.className = "new_card hide";
  first_page.className = "first_page show";
  document.body.style.backgroundColor = "#fff";
}

function addCard() {
  if (localStorage.getItem("cards_arr")) {
    const cards = JSON.parse(localStorage.getItem("cards_arr"));
  } else {
    const cards = [];
  }
  card_number = cards.length+1;

  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;
  const newCard = new Card(question, answer, card_number);
  console.log(newCard);
  cards.push(newCard);
  localStorage.setItem("cards_arr", JSON.stringify(cards));
}

console.log(innerWidth);
window.addEventListener("resize", () => {
  if (innerWidth <= 700) {
    let ratio = innerWidth / 650;
    first_page.style.scale = ratio;
    new_card.style.scale = ratio;
  }
});

card.addEventListener("click", flip);

function flip() {
  card.classList.add("annimated");

  card.addEventListener("animationend", flipping);
}
function flipping() {
  card.classList.remove("annimated");
  front.classList.toggle("hide");
  back.classList.toggle("hide");
}
console.log(card.dataset.number);
// `<div class="card" id="card" data-number="${}">
//   <div><i class="fa-solid fa-repeat"></i> Flip</div>
//   <div class="" id="front">${}</div>
//   <div class="hide" id="back">${}</div>
// </div>`
