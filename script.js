document.body.style.height = window.innerHeight;
const first_page = document.querySelector(".first_page");
const new_card = document.querySelector(".new_card");
const clear = document.getElementById("clear");
const card_number = document.getElementById("card_number");
const myForm = document.getElementById("myForm");
const main = document.getElementById("main");
let cards = [];
let displaying_card_index = 0;

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

function previous() {
	displaying_card_index--;
	if (displaying_card_index < 0) {
		displaying_card_index = cards.length - 1;
	}
	document.querySelector(".card_container").style.left = `${
		displaying_card_index * -540
	}px`;
	document.querySelectorAll(".card").forEach((elem) => {
		if (elem.dataset.number != displaying_card_index + 1) {
			elem.style.opacity = "0";
		} else {
			elem.style.opacity = 1;
		}
	});
	card_number.innerText = `${displaying_card_index + 1}/${cards.length}`;
	// makeCards(cards);
}

function next() {
	displaying_card_index++;
	if (displaying_card_index > cards.length - 1) {
		displaying_card_index = 0;
	}
	const card_container = document.querySelector(".card_container");
	card_container.style.left = `${displaying_card_index * -540}px`;
	const cardsArr = document.querySelectorAll(".card");
	cardsArr.forEach((elem) => {
		if (elem.dataset.number != displaying_card_index + 1) {
			elem.style.opacity = "0";
		} else {
			elem.style.opacity = 1;
		}
	});
	card_number.innerText = `${displaying_card_index + 1}/${cards.length}`;
	// makeCards(cards);
}

function clear_all() {
	localStorage.clear();
	// localStorage.removeItem("cards_arr");
	cards = [];
	card_number.innerText = "";
	window.location.reload();
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
	// console.log(cards[0]);
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

function flip(event) {
const card=event.target;
	card.classList.add("annimated");
	const front = card.childNodes[2];
	const back = card.childNodes[4];
	// card.addEventListener("animationend", flipping);
	setTimeout(()=>{front.classList.toggle("hide");
	back.classList.toggle("hide");}, 250);
	setTimeout(() => {
		card.classList.remove("annimated");
	}, 500);
console.log(card.childNodes)}

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
	cardNodes.forEach((cardNode,index) => {
		card_container.append(cardNode);
	});
	main.append(card_container);
}

function showCard(index) {
	const cardNode = document.querySelector(`[data-number="${index}"]`);
	// console.log(cardNode.dataset.number);
}
