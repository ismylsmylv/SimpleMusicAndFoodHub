let url = "http://localhost:3000/meals/";
let results = document.querySelector(".results");

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((elem, i) => {
            elem.count = 1
            let cartMeals = JSON.parse(localStorage.getItem("cartMeals"));
            if (cartMeals) {
                let sup = document.querySelector("sup")
                if (data) {
                    sup.textContent = cartMeals.length;
                }
            }

            results.innerHTML += `
            <div class="card" style="width: 18rem;">
            <div class="cardImg"><img name="${elem.id}" src="${elem.image}"     class="card-img-top" alt="singer"></div> 
            <div class="card-body">
            <h5 class="card-title">${elem.name}</h5>
            <p class="card-text">${elem.ingredients}</p>
            <button href="" name="${elem.id}" class="btn btn-outline-primary details">Details</button>
            <button href="#" name="${elem.id}" class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></button>
            <button href="#" name="${elem.id}" class="btn btn-outline-danger favorite"><i class="fa-regular fa-heart"></i></button>
            <button href="#" name="${elem.id}" class="btn btn-outline-warning cart"><i class="fa-solid fa-cart-shopping"></i></i></button>
              </div>
            </div>`;
        });

        let detailBtn = document.querySelectorAll(".details");
        detailBtn.forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                console.log(btn.getAttribute("name"));
                let elemId = btn.getAttribute("name");
                window.location.href = `detailMeal.html?id=${elemId}`;
            });
        });

        //favorites
        let favItemsArr = [];
        let favItems = JSON.parse(localStorage.getItem("favMeals"));

        if (favItems) {
            favItemsArr = [...favItems];
            let sup = document.querySelector(".favSup")
            let favoritesLocal = JSON.parse(localStorage.getItem("favMeals"));
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

                localStorage.setItem("favMeals", JSON.stringify(favItemsArr));
                let sup = document.querySelector(".favSup")
                let favoritesLocal = JSON.parse(localStorage.getItem("favMeals"));
                sup.textContent = favoritesLocal.length;
            });
        });

        //cart
        let cart = document.querySelectorAll(".cart")
        let cartItemsMealArr = []
        let cartItemsMeal = JSON.parse(localStorage.getItem("cartMeals"))

        //remove
        let deletes = document.querySelectorAll(".delete")
        for (let btn of deletes) {
            btn.addEventListener("click", function (e) {
                e.preventDefault()
                this.parentElement.parentElement.remove()
                console.log(this.name);
                fetch(url + this.name, {
                    method: "Delete"
                })
            })
        }

        //  localStorage.setItem("cart", JSON.stringify(cartItemsMealArr))
        // console.log(cartItemsMeal);
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


        // let sup = document.querySelector("sup")
        // let cartCount=[]
        // cartCount = JSON.parse(localStorage.getItem("cart"))
        // // sup.textContent=cartCount.length()
        // console.log(cartCount.length());
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


//search
let search = document.querySelector(".searchInp");
let searchBtn = document.querySelector(".searchBtn");

search.addEventListener("input", async function (e) {
    e.preventDefault();
    let res = await fetch(url);
    let data = await res.json();
    let matchedHTML = "";

    let matched = data.filter(element => {
        return element.name.trim().toLowerCase().includes(search.value.trim().toLowerCase());
    });



    if (matched.length > 0) {
        matched.forEach(elem => {
            matchedHTML += `
      <div class="card" style="width: 18rem;">
      <div class="cardImg"><img name="${elem.id}" src="${elem.image}" class="card-img-top" alt="singer"></div> 
        <div class="card-body">
          <h5 class="card-title">${elem.name}</h5>
          <p class="card-text">${elem.ingredients}</p>
          
          <button href="#" name="${elem.id}" class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></button>
          <button href="#" name="${elem.id}" class="btn btn-outline-danger favorite"><i class="fa-regular fa-heart"></i></button>
          <button href="#" name="${elem.id}" class="btn btn-outline-warning cart"><i class="fa-solid fa-cart-shopping"></i></i></button>
        </div>
      </div>`;
        });
        results.innerHTML = matchedHTML;
    } else {
        results.innerHTML = "";
    }
});