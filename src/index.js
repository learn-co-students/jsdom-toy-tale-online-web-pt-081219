let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyContainer = document.getElementById('toy-collection') 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  // fetchToys();
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(function(json){
    json.forEach(toy => {
      const div = document.createElement('div');
      div.setAttribute('class', 'card');
      const h2= document.createElement('h2');
      const p = document.createElement('p');
      const image = document.createElement('img');
      const button = document.createElement('button');
      image.setAttribute('class', 'toy-avatar');
      button.setAttribute('class', 'like-btn');
      h2.innerHTML = toy.name;
      image.src = toy.image;
      p.innerHTML= toy.likes+ " likes";
      button.innerHTML = "Like <3"
      div.appendChild(h2);
      div.appendChild(image);
      div.appendChild(p);
      div.appendChild(button)
      toyContainer.appendChild(div);
    })
  });
});

// function fetchToys(){
//   return fetch("http://localhost:3000/toys")
//   .then(res => res.json())
//   .then(data => toysOnDOM(data))
// }

// function toysOnDOM(json){
//   json.forEach(toy => {
//     addToyToDOM(toy);
//   })
// }

// function addToyToDOM(toy){
//   const toyCollection = document.getElementById("toy-collection")
//   toyColection.append(makeCard(toy));
// }

// function makeCard(toy){
//   cosnt div = document.createElement("div");
//   div.id = toy.id;
//   div.setAttribute("class", "card");

//   let h2 = document.createElement("h2")
//   let img = document.createElement("img")
//   let p = document.createElement("p")
//   let button = document.createElement("button")

//   h2.innerText = toy.name
//   img.src = toy.image
//   p.innerText = toy.likes
  
//   button.classList.add("like-btn");
//   button.innerText = "Like <3";


//   div.append(h2);
//   div.append(img);
//   div.append(p);
//   div.append(button);

//   return div;
// }