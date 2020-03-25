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
