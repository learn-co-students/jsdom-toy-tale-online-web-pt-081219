let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  let toyCollection = document.getElementById('toy-collection')
  fetch('http://localhost:3004/toys')
  .then(function(response) {
    return response.json();
})
  .then(function(json) {
    let keys = []
    keys.push(Object.keys(json))
    for (const element of keys['0']) {
      renderToy(json[element])
    }

});
});

function renderToy(toy) {
  //create card
  let collection = document.querySelector("#toy-collection")
  let card = document.createElement('div')
  card.id = `${toy.name}-card`
  //name
  let name = document.createElement('h2')
  name.innerHTML = toy.name
  card.appendChild(name)
  // likes count
  let likes = document.createElement('p')
  likes.id = toy.name
  likes.innerHTML = `${toy.name} has ${toy.likes} likes`
  card.appendChild(likes)
  // like button
  const likeBtn = document.createElement('button')
  likeBtn.id = toy.id
  likeBtn.innerHTML = "Like"
  likeBtn.addEventListener('click', (e) => {
    findToy(e.target.id)
})
  card.appendChild(likeBtn)
  //img
  let image = document.createElement('img')
  image.src = toy.image
  card.appendChild(image)

  collection.appendChild(card)
};

function findToy(id) {
  fetch(`http://localhost:3004/toys/${id}`)
  .then(function(response) {
    return response.json();
})
  .then(function(json) {
    likeToy(json)
});
}

function likeToy(toy) {
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': toy.likes + 1
    })
  }
  fetch(`http://localhost:3004/toys/${toy.id}`, configObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    })
    .catch(function(error) {
      console.log(error.message);
    });
  let likes = document.getElementById(`${toy.name}`)
  likes.innerHTML = `${toy.name} has ${toy.likes + 1} likes`
}

// h2 tag with the toy's name
// img tag with the src of the toy's image attribute and the class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class "like-btn"