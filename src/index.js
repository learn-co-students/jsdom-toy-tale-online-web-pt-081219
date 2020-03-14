let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", event => {
        event.preventDefault();
        console.log(event.target.name.value, event.target.image.value)
        submitToy(event.target.name.value, event.target.image.value)
      });
    } else {
      toyForm.style.display = "none";
    }
  });

  // Fetch Toys
  const collection = document.querySelector('div#toy-collection');
  function renderToy(toys) {
    toys.forEach(toy => {
      const card = document.createElement('div.card');
      card.innerHTML = `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p class="likes">${toy.likes} Likes</p>
        <button class="like-btn" id="${toy.id}">Like <3</button>
      </div>`
      let btn = card.querySelector('button.like-btn');
      btn.addEventListener('click', (e) => {
        submitLike(e)
      });
      collection.appendChild(card);
    });
  };

  function renderError(error) {
    const body = document.querySelector('body');
    const p = document.createElement('p')
    p.innerHTML = `<p style="color:red;"><strong>${error.message}</strong></p>`
    body.appendChild(p);
    console.log(error.message);
  };

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (toys) {
      renderToy(toys);
    })
    .catch(function (error) {
      alert("Error!");
      renderError(error);
    });

  // Submit Toys
  
  
  
  
  function submitToy(name, image) {
      let formData = {
        name: name,
        image: image,
        likes: 0
      };
      let configToy = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch("http://localhost:3000/toys", configToy)
        .then(function (response) {
          return response.json();
        })
        .then(function (toy) {
          let new_toy = renderToy(toy);
          collection.append(new_toy)
        })
        .catch(function (error) {
          alert("Error! Toy was not created.");
          renderError(error);
        });
  };

  // Post Likes
  
  function submitLike(e) {
    e.preventDefault()
    let findLikes = parseInt(e.target.previousElementSibling.innerText);
    let newLikes = findLikes + 1;
    
    let addLike = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    };

    fetch(`http://localhost:3000/toys/${e.target.id}`, addLike)
      .then(function (response) {
        console.log(e.target)
        return response.json();
      })
      .then(function (toy) {
        e.target.previousElementSibling.innerText = `${newLikes} Likes`;
      })
      .catch(function (error) {
        alert("Error! Toy was not Liked.");
        renderError(error);
      });
  };

});
