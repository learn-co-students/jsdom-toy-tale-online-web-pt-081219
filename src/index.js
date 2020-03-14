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
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
})
  .then(function(json) {
    let keys = []
    keys.push(Object.keys(json))
    for (const element of keys['0']) {
      addToy(json[element])
    }

});

function addToy(toy) {
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
  likes.innerHTML = `${toy.name} has ${toy.likes} likes`
  card.appendChild(likes)
  // like button
  let likeBtn = document.createElement('button')
  likeBtn.id = toy.id
  likeBtn.innerHTML = "Like"
  card.appendChild(likeBtn)
  likeBtn.addEventListener('click', (e) => {
    likeToy(e)
  })
  //img
  let image = document.createElement('img')
  image.src = toy.image
  card.appendChild(image)

  collection.appendChild(card)
};

function likeToy(e) {
  console.log(e.target)
}
});

// h2 tag with the toy's name
// img tag with the src of the toy's image attribute and the class name "toy-avatar"
// p tag with how many likes that toy has
// button tag with a class "like-btn"