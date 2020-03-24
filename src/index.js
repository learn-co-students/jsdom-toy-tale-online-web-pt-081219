let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      createNewToy();
    } else {
      toyForm.style.display = "none";
    }
  });

  fetchToys();

  const toysDiv = document.getElementById("toy-collection")

  function createNewToy() {
    toyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // console.log(e)
      let toyData = {
        "name": e.target.name.value,
        "image": e.target.image.value,
        "likes": 0
      }
      document.querySelector("form.add-toy-form").reset();

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accpet": "application/json"
        },
        body: JSON.stringify(toyData)
      })
      .then(response => response.json())
      .then(newToy => {
         createToyCard(newToy);
      })
      .catch(error => {
        console.log(error.message)
      })
    })
  };
  
  function fetchToys() {
    fetch("http://localhost:3000/toys") 
      .then(resp => resp.json())
      .then(toys => {
        toys.forEach(function(toy) {
          createToyCard(toy)
      })
  })};

  function createToyCard(toy) {
    toysDiv.innerHTML += `
      <div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} likes</p>
        <button class="like-btn">Like <3</button>
      </div>
    `
  };

  toysDiv.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "like-btn") {
      const toyID = e.target.parentElement.dataset.id
      const toyLikes = e.target.previousElementSibling
      const likeCount = parseInt(toyLikes.innerText)
      const updateLikeCount = likeCount + 1;
      toyLikes.innerText = `${updateLikeCount} likes`;
      
      fetch(`http://localhost:3000/toys/${toyID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        "likes": updateLikeCount
      })
    })
    .then(response => response.json())
    .then(console.log)
    }
  });


});
