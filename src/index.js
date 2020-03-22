// Set false, so the form is initially hidden
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // When you click the 'add new toy' button
    // addToy variable switches to the opposite value
    // which renders and hides the add toy form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

// Function to get the toys via fetch get request
  function getToys() {
    return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    // sends the each toy object to the createToyCards
    // function to be rendered in the DOM
    .then(toys => toys.forEach(toy => createToyCards(toy)))
  }

  function createToyCards(toy) {
    // Grab the div for the new cards
    const toyCollectionDiv = document.querySelector('#toy-collection')

    // Create the HTML elements needed for each card
    const toyCardDiv = document.createElement('div')
    const toyH2 = document.createElement('h2')
    const toyImg = document.createElement('img')
    const toyP = document.createElement('p')
    const toyBtn = document.createElement('button')

    // Update each element and attributes (if specified)
    toyH2.innerText = toy.name
    toyImg.src = toy.image
    toyImg.setAttribute('class', 'toy-avatar')
    toyP.innerText = `${toy.likes} likes`
    toyBtn.innerText = 'Like <3'
    toyBtn.setAttribute('class', 'like-btn')

    // Append all the new elements to the new div
    toyCardDiv.appendChild(toyH2)
    toyCardDiv.appendChild(toyImg)
    toyCardDiv.appendChild(toyP)
    toyCardDiv.appendChild(toyBtn)
    // Append the new div to the existing div
    toyCollectionDiv.appendChild(toyCardDiv)
  }

  getToys()
});
