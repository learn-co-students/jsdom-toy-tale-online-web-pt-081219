let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const submit = document.getElementsByClassName("submit")[0];

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  renderToys();
  
  submit.addEventListener("click", addNewToy);


});

function renderToys() {
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      addToyCollection(json);
    });
}

function addToyCollection(toys) {
  const toyCollection = document.getElementById("toy-collection");

  while (toyCollection.firstChild) {
    toyCollection.removeChild(toyCollection.firstChild);
  }
  
  for (const toy in toys) {
    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("h2");
    name.innerHTML = toys[toy].name;
    card.appendChild(name);

    const img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toys[toy].image;
    card.appendChild(img);

    const likes = document.createElement("p");
    likes.innerHTML = toys[toy].likes + " Likes";
    card.appendChild(likes);

    const button = document.createElement("button");
    button.innerHTML = "Like <3";
    button.className = "like-btn";
    button.addEventListener("click", function(e) {
      updateLikes(toys[toy]);
      p.innerHTML = toys[toy].likes + " Likes";
    });
    card.appendChild(button)

    toyCollection.appendChild(card);

  }
}


function addNewToy(event) {
  event.preventDefault();
  const toyName = document.getElementsByTagName("input")[0].value;
  const toyImage = document.getElementsByTagName("input")[1].value;

  let formData = {
    id: "",
    name: toyName,
    image: toyImage,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj);
  renderToys();
  location.reload();

}

function updateLikes(toy) {
  toy.likes++;
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  }
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj);
}