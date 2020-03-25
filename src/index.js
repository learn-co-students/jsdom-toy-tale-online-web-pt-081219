let addToy = false;
const TOY_URL = "http://localhost:3000/toys";

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

function toggleForm() {
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
}

addBtn.addEventListener("click", () => {
  toggleForm();
});

function insertCard(card) {
  let div = document.querySelector("#toy-collection");
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.innerHTML = `
    <h2>${card.name}</h2>
    <img src="${card.image}" class="toy-avatar" />
    <p><span>${card.likes}</span> Likes </p>
    <button class="like-btn">Like <3</button>
  `;
  div.appendChild(cardDiv);

  cardDiv.querySelector(".like-btn").addEventListener("click", () => {
    console.log("did I get the right one?");
    card.likes++;
    cardDiv.querySelector("p span").innerText = card.likes;
    fetch(`${TOY_URL}/${card.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(card)
    });
  });

  return cardDiv;
}

function getToys() {
  return fetch(TOY_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(cards) {
      for (let card of cards) {
        insertCard(card);
      }
    })
    .catch(function(error) {
      console.log("3");
      console.error(error);
      document.body.innerHTML = error.message;
    });
}

getToys();

let toyForm = document.querySelector(".add-toy-form");
toyForm.addEventListener("submit", event => {
  event.preventDefault();
  let data = new FormData(toyForm);
  data.append("likes", 0);
  let json = Object.fromEntries(data);
  toyForm.reset();
  fetch(TOY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  })
    .then(response => response.json())
    .then(result => {
      toggleForm();
      let scrollToMe = insertCard(result);
      console.log("Success:", result);
      scrollToMe.scrollIntoView();
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
