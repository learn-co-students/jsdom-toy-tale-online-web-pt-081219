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
    .then(function (toyObject) {
      addExistingToys(toyObject);
    });
}

function addExistingToys(toyObject) {
  const toyCollection = document.getElementById("toy-collection");

  while (toyCollection.firstChild) {
    toyCollection.removeChild(toyCollection.firstChild);
  }

  for (const toy in toyObject) {
    const div = document.createElement("div");
    div.className = "card";

    const h2 = document.createElement("h2");
    h2.innerHTML = toyObject[toy].name;
    div.appendChild(h2);

    const img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toyObject[toy].image;
    div.appendChild(img);

    const p = document.createElement("p");
    p.innerHTML = toyObject[toy].likes + " Likes";
    div.appendChild(p);

    const button = document.createElement("button");
    button.innerHTML = "Like <3";
    button.className = "like-btn";
    button.addEventListener("click", function(e) {
      updateToyObjectLikes(toyObject[toy]);
      p.innerHTML = toyObject[toy].likes + " Likes";
    });
    div.appendChild(button)

    toyCollection.appendChild(div);

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

function updateToyObjectLikes(toy) {
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