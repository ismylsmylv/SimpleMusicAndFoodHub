let url = "http://localhost:3000/singers/";
let bigCard = document.querySelector(".bigCard");

// console.log(window.location.href);

let id = new URLSearchParams(window.location.search).get("id");
console.log(id);

let favItemsArr = [];
let favItems = []
if (favItems) {
  favItemsArr = [...favItems];
  let sup = document.querySelector(".favSup")
  let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
  sup.textContent = favoritesLocal.length;
}
else {
  let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
  sup.textContent = favoritesLocal.length;
}
fetch(`${url}${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    bigCard.innerHTML += `
        <div class="image"><img src="${data.image}" alt=""></div>
        <div class="bigCardFooter">
          <h1 class="title">${data.name}</h1>
          <p class="nation">${data.name} is ${data.nation}</p>
          <p class="age">Age: ${data.age}</p>
          <p class="genre">Genre: ${data.genre}</p>
          <a href="./index.html" class="btn btn-outline-primary">Home</a>
          <button href="#" name="${data.id}" class="btn btn-outline-danger favorite"><i class="fa-regular fa-heart"></i></button>
      </div>`;
    let favItemsArr = [];
    let favItems = JSON.parse(localStorage.getItem("favorites"));

    if (favItems) {
      favItemsArr = [...favItems];
      let sup = document.querySelector(".favSup")
      let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
      sup.textContent = favoritesLocal.length;
    }

    let favorites = document.querySelectorAll(".favorite");

    favorites.forEach((btn) => {
      let isFavorite = favItemsArr.some((fav) => fav.id == btn.getAttribute("name"));

      if (isFavorite) {
        btn.querySelector("i").classList.add("fa-solid", "fa-regular");
      }

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        let icon = this.querySelector("i");

        if (icon.classList.contains("fa-solid")) {
          icon.classList.remove("fa-solid")
          icon.classList.add("fa-regular");
          favItemsArr = favItemsArr.filter((elem) => elem.id != this.getAttribute("name"));

        } else {
          icon.classList.add("fa-solid", "fa-regular");
          favItemsArr.push(data.find((elem) => elem.id == this.getAttribute("name")));

        }

        localStorage.setItem("favorites", JSON.stringify(favItemsArr));
        let sup = document.querySelector(".favSup")
        let favoritesLocal = JSON.parse(localStorage.getItem("favorites"));
        sup.textContent = favoritesLocal.length;
      });
    });
  });

let isLogged = JSON.parse(localStorage.getItem("loginId"))
console.log(isLogged);
let profile = document.querySelector("#profile")
let logOut = document.querySelector("#logOut")
let login = document.querySelector("#login")
let signup = document.querySelector("#signup")
if (isLogged) {
  login.style.display = "none"
  signup.style.display = "none"
}
else {
  profile.style.display = "none"
  logOut.style.display = "none"
}
logOut.addEventListener("click", function (e) {
  e.preventDefault()
  localStorage.removeItem("loginId")
  window.location.href = './index.html'
})