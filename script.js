document.body.style.height = window.innerHeight;
const first_page = document.querySelector(".first_page");
const new_card = document.querySelector(".new_card");

function addNew() {
  first_page.className="first_page hide"
  new_card.className="new_card show"
}

function close_new() {
    new_card.className="new_card hide"
    first_page.className="first_page show"
}
function addCard() {}
