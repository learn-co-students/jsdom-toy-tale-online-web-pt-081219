let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    //when you click the 'add new toy' button addToy variable switches
    // to opposite value which renders or hides the add toy form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      // adds event listener for the submit button
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postNewToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });

  function getToys(){
    return fetch('http://localhost:3000/toys')
      .then(response => response.json())
      // forEach works like .each, using singlular 'toy' to send to createToyCards Function
      .then(toys => toys.forEach(toy => createToyCards(toy))) 
  }

  function createToyCards(toy) {
    const toyCollectionDiv = document.querySelector('#toy-collection')

    const toyCardDiv = document.createElement('div')
    const toyH2 = document.createElement('h2')
    const toyImg = document.createElement('img')
    const toyP = document.createElement('p')
    const toyBtn = document.createElement('button')

    //update each element and attributes 
    toyH2.innerText = toy.name
    toyImg.src = toy.image 
    toyImg.setAttribute('class', 'toy-avatar')
    toyP.innerText = `${toy.likes} likes`
    toyBtn.innerText = 'Like <3'
    toyBtn.setAttribute('class', 'like-btn')

    toyCardDiv.appendChild(toyH2)
    toyCardDiv.appendChild(toyImg)
    toyCardDiv.appendChild(toyP)
    toyCardDiv.appendChild(toyBtn)
    toyCollectionDiv.appendChild(toyCardDiv)

    toyBtn.addEventListener('click', (event) => {
      likes(event)
    })
  }

  function postNewToy(toyData) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "name": toyData.name.value,
        "image": toyData.image.value, 
        "likes": 0
      })
    })
    .then(response => response.json())
    .then((toy) => {
      createToyCards(toy)
    })
  }

  function likes(event) {
    event.preventDefault()
    let incrementedLike = parseInt(event.target.previousElementSibling.innerText) + 1
    
    fetch(`http://localhost:3000/toys${event.target.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": incrementedLike
      })
    })
    .then(response => response.json())
    .then((toy => {
      event.target.previousElementSibling.innerText = `${incrementedLike} likes`
    }))
  }



 getToys();

});
