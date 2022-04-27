const cart = JSON.parse(localStorage.getItem("cart"));

let cartList = document.querySelector("#cartList");
let total;


function fillCart(cartArray){
  
    for(let {name, price, image, code, lot, subtotal} of cartArray){

        let cartItem = document.createElement("tr");

        cartItem.innerHTML = `<td>${name}</td>
                              <td>$ ${price}</td>
                              <td>${lot}</td>
                              <td>$ ${subtotal}</td>
                              <td class="is-flex is-justify-content-center"><button id="${code}" class="button is-danger removeProduct">Eliminar</button></td>`;

        cartList.appendChild(cartItem);

    }

}



function cartAmount(cartArray){

    total = 0;
    for (let product of cartArray){
        total += parseInt(product.subtotal);
    }
    return total;
}


function fillTotal(item){
    
    let totalCart = document.getElementById("tdfoot"); 
     totalCart.innerText = `$ ${item}`;       
}


fillCart(cart);
fillTotal(cartAmount(cart));


let removeButtons = document.querySelectorAll(".removeProduct");

removeButtons.forEach(element => {
    element.addEventListener("click", removeProduct)
})

function removeProduct(e){

    let index = cart.findIndex(product => product.code == e.target.id);

    cart.splice(index, 1);

    e.target.parentNode.parentNode.remove();

    fillTotal(cartAmount(cart));

    localStorage.setItem("cart", JSON.stringify(cart));
    
    Toastify({
        text: `PRODUCTO ELIMINADO!`,
        duration: 1000,
        style: {
            background: "linear-gradient(to right, red, black)"
        }
    }).showToast();
    
} 