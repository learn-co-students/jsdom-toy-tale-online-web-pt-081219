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

  toyForm.addEventListener("submit", submitToy);

  displayToys();
});

async function getToys(){
  const url = "http://localhost:3000/toys";
  const resp = await fetch(url);
  return await resp.json();
}

async function displayToys(){
  const data = await getToys();
  const toyCollectionDiv = document.querySelector('#toy-collection');
  
  data.forEach((el) => {
    toyCollectionDiv.append(createCard(el));
  })
}

async function likeFn(){
  const parentId = this.parentElement.id;
  const pEl = this.parentNode.children.item(2)
  const prevLikesCount = parseInt(pEl.innerText)
  const newLikesCount = prevLikesCount + 1
  const url = `http://localhost:3000/toys/${parentId}`

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikesCount
    })
  }

  await fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      pEl.innerText = newLikesCount;
    })
    .catch(error => console.log(error.message))
}

async function submitToy(e){
  e.preventDefault();

  const imgEl = document.querySelector("#image-input");
  const imgValue = imgEl.value;
  const nameEl = document.querySelector("#name-input");
  const nameValue = nameEl.value;

  const url = "http://localhost:3000/toys";
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": nameValue,
      "image": imgValue,
      "likes": 0
    })
  }

  await fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      const toyCollectionDiv = document.querySelector('#toy-collection');
      toyCollectionDiv.append(createCard(json));
    })
    .catch(error => error.message);

}

function createCard(el){
  const divEl = document.createElement("div");
  divEl.id = el.id;
  divEl.classList.add('card')

  const headerEl = document.createElement("h1");
  headerEl.innerText = el.name;
  divEl.append(headerEl)

  const imgEl = document.createElement("img");
  imgEl.src = el.image;
  imgEl.classList.add("toy-avatar");
  divEl.append(imgEl);

  const pEl = document.createElement("p");
  pEl.innerText = el.likes;
  divEl.append(pEl);

  const btnEl = document.createElement("button");
  btnEl.addEventListener("click", likeFn)
  btnEl.classList.add("like-btn");
  btnEl.innerText = "Like <3";
  divEl.append(btnEl);

  return divEl;
}