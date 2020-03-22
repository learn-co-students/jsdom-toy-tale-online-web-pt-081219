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

  function getToys() {
    return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(toy => createToyCards(toy)))
  }

  function createToyCards(toy) {
    const toyCollectionDiv = document.querySelector('#toy-collection')
    const toyCardDiv = document.createElement('div')
    const toyH2 = document.createElement('h2')
    const toyImg = document.createElement('img')
    const toyP = document.createElement('p')
    const toyBtn = document.createElement('button')

    toyH2.innerText = toy.name
    toyImg.src = toy.image
    toyImg.width = '100'
    toyImg.class = 'toy-avatar'
    toyP.innerText = `${toy.likes} likes`
    toyBtn.innerText = 'Like <3'

    toyCardDiv.appendChild(toyH2)
    toyCardDiv.appendChild(toyImg)
    toyCardDiv.appendChild(toyP)
    toyCardDiv.appendChild(toyBtn)
    toyCollectionDiv.appendChild(toyCardDiv)
  }

  getToys()
});
