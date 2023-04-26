document.body.style.height = window.innerHeight;
const first_page = document.querySelector(".first_page");
const new_card = document.querySelector(".new_card");
const clear = document.getElementById("clear");
const card_number = document.getElementById("card_number");
const myForm = document.getElementById("myForm");
const main = document.getElementById("main");
let cards = [];
let displaying_card_index = 1;

// {localStorage.setItem("cards_arr",JSON.stringify(cards))}
// if (!localStorage.getItem("cards_arr")) {
//   localStorage.setItem("cards_arr", JSON.stringify(cards));
// }

class Card {
	constructor(question, answer, cardNumber) {
		this.question = question;
		this.answer = answer;
		this.cardNumber = cardNumber;
	}
}

function clear_all() {
	localStorage.clear();
	// localStorage.removeItem("cards_arr");
	cards = [];
	card_number.innerText = "";
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

function initCards() {
	if (localStorage.getItem("cards_arr")) {
		cards = JSON.parse(localStorage.getItem("cards_arr"));
		card_number.innerText = `1/${cards.length}`;
		makeCards(cards);
	}
	console.log(cards);
	showCard(1);
}

initCards();

function addCard() {
	// event.preve
	let cardNumber = cards.length + 1;
	const question = document.getElementById("question").value;
	const answer = document.getElementById("answer").value;
	const newCard = new Card(question, answer, cardNumber);
	cards.push(newCard);
	localStorage.setItem("cards_arr", JSON.stringify(cards));
	// return cards;
}

console.log(innerWidth);
window.addEventListener("resize", () => {
	if (innerWidth <= 700) {
		let ratio = innerWidth / 650;
		first_page.style.scale = ratio;
		new_card.style.scale = ratio;
	}
});

// card.addEventListener("click", flip);

function flip() {
	const card = document.getElementById("card");

	card.classList.add("annimated");

	// card.addEventListener("animationend", flipping);
	setTimeout(flipping, 250);
	setTimeout(() => {
		card.classList.remove("annimated");
	}, 500);
}
function flipping() {
	const front = document.getElementById("front");
	const back = document.getElementById("back");
	front.classList.toggle("hide");
	back.classList.toggle("hide");
}
function flippingBack() {}
myForm.addEventListener("submit", addCard);
// console.log(card.dataset.number);

function makeCards(cardsArr) {
	const cardNodes = cardsArr.map((cardObj) => {
		const div = document.createElement("div");
		div.className = "card";
		div.id = "card";
		div.addEventListener("click", flip);
		div.setAttribute("data-number", cardObj.cardNumber);
		div.innerHTML = `<div><i class="fa-solid fa-repeat"></i> Flip</div>
    <div class="" id="front">${cardObj.question}</div>
    <div class="hide" id="back">${cardObj.answer}</div>`;
		return div;
	});
	console.log(cardNodes);
	const card_container = document.createElement("div");
	card_container.className = "card_container";
	cardNodes.forEach((cardNode) => {
		card_container.append(cardNode);
	});
	main.append(card_container);
}

function showCard(index) {
	const cardNode = document.querySelector(`[data-number="${index}"]`);
	console.log(cardNode);
}
