const products = [];

products.push(new Product(1, "Six-pack", "Coca-Cola", `Images/cocacola.jpg`, 500));
products.push(new Product(2, "Six-pack", "Sprite", `Images/sprite.jpg`, 450));
products.push(new Product(3, "Six-pack", "Fanta", `Images/fanta.jpg`, 450));
products.push(new Product(4, "Six-pack", "Paso de los Toros", `Images/pasodelostoros.jpg`, 450));
products.push(new Product(5, "Six-pack", "Quilmes", `Images/quilmes.jpg`, 650));


const mainContainer = document.getElementById(`main`);

function fillPage(productsArray){

    for(const {code, tipe, name, image, price} of productsArray){

        let productCard = document.createElement(`div`);
         
        productCard.className = `column is-one-quarter main__card is-flex is-flex-direction-column is-justify-content-center is-align-items-center`;

        productCard.innerHTML = `<img src = ${image} alt="${code}">
                                 <h2 class = main__card--title>${name}</h2>
                                 <p>${tipe}</p>
                                 <p>$<strong>${price}</strong></p>
                                 <button class="button is-hidden is-link cardButton">Agregar al carrito</button>`;

        mainContainer.appendChild(productCard);
    }

    let localStorageCart = JSON.parse(localStorage.getItem("cart"));
    
    localStorageCart && cartCounter(localStorageCart);
}

fillPage(products);


cart = []

let buttons = document.querySelectorAll(".cardButton");

buttons.forEach(element => {
    element.addEventListener("click", addToCart)
})

function addProduct(name, price, image, code){
    const product = new CartProduct(name, price, image, code);
    cart.push(product);
}
function addSubtotal(cartArray, i){
    cartArray[i].lot++;
    cartArray[i].subtotal = cartArray[i].price * cartArray[i].lot;
}
function addToCart(e){
    
    Toastify({
        text: `PRODUCTO AGREGADO!`,
        duration: 1000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
    }).showToast();

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let index = cart.findIndex(product => product.code == e.target.parentNode.children[0].alt);
    
    let name = e.target.parentNode.children[1].textContent;
    let price = e.target.parentNode.children[3].children[0].textContent;
    let image = e.target.parentNode.children[0].src;
    let code = e.target.parentNode.children[0].alt;
    
    (index == -1) ? addProduct(name, price, image, code) : addSubtotal(cart, index);

    localStorage.setItem("cart", JSON.stringify(cart));
    cartCounter(cart);

    
}

function cartCounter(cartArray){

    let cartText = document.getElementById("cartLink");
    let totalProducts = 0;

    for(let product of cartArray){
        totalProducts += product.lot;
    }

    cartText.innerHTML = "";
    cartText.innerHTML = `<img src="Images/logocarrito.png" alt="Carrito de Compras" width="30" height="40">
                          <p>(${totalProducts})</p>`

}

fetch ('https://apis.datos.gob.ar/georef/api/provincias?')
  .then( res => res.json())
  .then ( data => {
    data.provincias.forEach(element => {
     const statesList = document.getElementById('states');
     let option = document.createElement('option');
     option.text = `${element.nombre}`;
     statesList.appendChild (option);
  })
});



const registerButton = document.querySelector("#register__button");
registerButton.addEventListener("click", registerUser);

function registerUser(e){
  const name = e.target.closest(`.box`).children[0].children[1].children[0].value;
  const adress = e.target.closest(`.box`).children[1].children[1].children[0].value;
  const state = e.target.closest(`.box`).children[1].children[1].children[1].children[0].value;
  const email = e.target.closest(`.box`).children[2].children[1].children[0].value;
  const password = e.target.closest(`.box`).children[3].children[1].children[0].value;
  const user = new User(name, adress, state, email, password);
  localStorage.setItem(`user`, JSON.stringify(user));
}

const loginButton = document.querySelector(`#login`);
loginButton.addEventListener("click", loginUser);

function loginUser(e){
    const rUser = JSON.parse(localStorage.getItem('user'));
    const uEmail = e.target.closest(`.loginParent`).children[0].children[0].children[0].value;
    const uPass = e.target.closest(`.loginParent`).children[1].children[0].children[0].value;
    
    if(uEmail === rUser.email && uPass === rUser.password){
        const vButtons = document.querySelectorAll ('.cardButton');
        vButtons.forEach (element =>{
            element.classList.remove('is-hidden');
        })
    }
}