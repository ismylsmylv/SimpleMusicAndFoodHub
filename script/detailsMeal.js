let url = "http://localhost:3000/meals/";
let bigCard = document.querySelector(".bigCard");

// console.log(window.location.href);

let id = new URLSearchParams(window.location.search).get("id");
console.log(id);

let favItemsArr = [];
let favItems = []
if (favItems) {
    favItemsArr = [...favItems];
    let sup = document.querySelector(".favSup")
    let favoritesLocal = JSON.parse(localStorage.getItem("favorites")) || [];
    sup.textContent = favoritesLocal.length;
}
else {
    let favoritesLocal = JSON.parse(localStorage.getItem("favorites")) || [];
    sup.textContent = favoritesLocal.length;
}
fetch(`http://localhost:3000/meals/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        bigCard.innerHTML += ` <div class="image"><img src="${data.image}" alt=""></div>
        <div class="bigCardFooter">
            <h1 class="title">${data.name}</h1>
            <p class="nation">${data.ingredients}</p>
            <a href="./meals.html" class="btn btn-outline-primary">Meals</a>
            
        </div>`;
        let favItemsArr = [];
        let favItems = JSON.parse(localStorage.getItem("favorites"));
        {/* <button href="#" name="${data.id}" class="btn btn-outline-warning cart"><i
                    class="fa-solid fa-cart-shopping"></i></i></button> */}
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
                    favItemsArr.push({ id: this.getAttribute("name") });
                }

                localStorage.setItem("favorites", JSON.stringify(favItemsArr));
                let sup = document.querySelector(".favSup")
                let favoritesLocal = JSON.parse(localStorage.getItem("favorites")) || [];
                sup.textContent = favoritesLocal.length;
            });
        });
        let cart = document.querySelectorAll(".cart")
        let cartItemsMealArr = []
        let cartItemsMeal = JSON.parse(localStorage.getItem("cartMeals"))
        if (cartItemsMeal) {
            cartItemsMealArr = [...cartItemsMeal]
        }
        for (let btn of cart) {
            btn.addEventListener("click", function (e) {
                console.log(this.name);
                if (cartItemsMealArr.find((elem) => elem.id == this.name)
                ) {
                    cartItemsMealArr.find((elem) => elem.id == this.name).count++
                    localStorage.setItem("cartMeals", JSON.stringify(cartItemsMealArr))
                    console.log(cartItemsMealArr);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Added again to cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    let sup = document.querySelector("sup")
                    let cartMeals = JSON.parse(localStorage.getItem("cartMeals"));
                    sup.textContent = cartMeals.length;

                }
                else {
                    console.log(this.classList);
                    cartItemsMealArr.push(data.find(elem => elem.id == this.name));
                    localStorage.setItem("cartMeals", JSON.stringify(cartItemsMealArr))
                    console.log(cartItemsMealArr);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Added to cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    let sup = document.querySelector("sup")
                    let cartMeals = JSON.parse(localStorage.getItem("cartMeals"));
                    sup.textContent = cartMeals.length;

                }
            })
        }
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