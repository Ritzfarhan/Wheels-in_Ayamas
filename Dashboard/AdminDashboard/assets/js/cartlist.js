function getCartItems() {
    auth.onAuthStateChanged(user => {
   
    
    db.collection("cart-items").where("user", "==", user.uid ).onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
})
}

function getTotalCost(items){
    let totalCost1 = 0;
    let totalCost2 = 0;
    let servicetax = 0;
    let tax = 0;
    items.forEach((item)=>{
        totalCost1 += (item.Price * item.quantity);
       servicetax = 0.3*totalCost1;
       tax = 0.5*totalCost1;
       totalCost2 = totalCost1 + servicetax + tax;
        console.log(item);
    })
    document.querySelector(".subtotal").innerText = numeral(totalCost1).format(' 0,0.00');
    document.querySelector(".service-tax").innerText = numeral(servicetax).format(' 0,0.00');
    document.querySelector(".tax").innerText = numeral(tax).format(' 0,0.00');
    document.querySelector(".total-cost").innerText = numeral(totalCost2).format(' 0,0.00');
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 0) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    var number = 0;
    cartItems.forEach((item) => {
        number += 1;
        //document.getElementById('number').innerHTML = number;
        itemsHTML += `
        <tr>
        <td>#<p id="number"></p></td>
        <td><a href="#">${item.Name}</a></td>
        <td><a data-id="${item.id}" href="#"><img data-id="${item.id}" class="cart-item-decrease" src="../../assets/img/svg/minus.svg" class="svg" alt="">&nbsp;<input type="number" value="${item.quantity}">&nbsp<img data-id="${item.id}" class="cart-item-increase" src="../../assets/img/svg/plus.svg" class="svg" alt=""></td>
        <td><span>RM${item.Price}</span></td>
        <td><span>RM ${numeral(item.Price * item.quantity).format('0,0.00')}</span> <a href="#"><img data-id="${item.id}" class="cart-item-delete" src="../../assets/img/svg/table-colse.svg" class="svg" alt=""></a></td>
     </tr>

        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
    let increaseButtons = document.querySelectorAll(".cart-item-increase");

    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function(){
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function() {
            increaseCount(button.dataset.id)
        })
    })

    deleteButtons.forEach((button)=>{
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id)
        })
    })

}


getCartItems();