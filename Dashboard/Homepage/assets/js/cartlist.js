//const { response } = require("express");


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
    let itemquantity = 0;
    let tax = 0;
    let MyrtoUSD =0;
    //const name = "recipient";
    items.forEach((item)=>{
        totalCost1 += (item.Price * item.quantity);
        itemquantity += item.quantity;
       servicetax = 0.3*totalCost1;
       tax = 0.5*totalCost1;
       totalCost2 = totalCost1 + servicetax + tax;
       MyrtoUSD = totalCost2 * 0.23838;
        console.log(item);
    })
    document.querySelector(".subtotal").innerText = numeral(totalCost1).format(' 0,0.00');
    document.querySelector(".service-tax").innerText = numeral(servicetax).format(' 0,0.00');
    document.querySelector(".tax").innerText = numeral(tax).format(' 0,0.00');
    document.querySelector(".total-cost").innerText = numeral(totalCost2).format(' 0,0.00');
    document.querySelector(".paypal-total").value = numeral(MyrtoUSD).format(' 0,0.00');
    //document.querySelector(".paypal-desc").innerHTML = name;
    //document.querySelector(".paypal-item").value = itemquantity;
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

//const createStripeCheckout = firebase.functions().httpsCallable('createStripeCheckout')
//const stripe = Stripe('pk_test_51JrmNpD70I0R1YvLtiyd3IslyDQMokBAsDTtq5ZHmVoWjQ6egfldmZI3l9TWctMil25L6LoKoUZdCcrPsEMkUEPA00PfWzoBV5')
//const orderButton = document.getElementById('orderButton')
//
//orderButton.addEventListener('click', ()=>{
//    createStripeCheckout()
//    .then(response => {
//      const sessionId = response.data.id
//      stripe.redirectToCheckout({ sessionId: sessionId })
//    })
//})

function getItems() {
    auth.onAuthStateChanged(user => {
    
    
    db.collection("cart-items").where("user", "==", user.uid ).onSnapshot((snapshot) => {
       let cartItems = [];
       snapshot.docs.forEach((doc) => {
             cartItems.push({
                id: doc.id, 
                ...doc.data()
             })
       })
       insertOrder(cartItems);

    })
 })
 }

 function insertOrder(cartItems) {

    let totalCost1 = 0;
    let totalCost2 = 0;
    let servicetax = 0;
    let itemquantity = 0;
    let tax = 0;

    cartItems.forEach((item)=>{
       totalCost1 += (item.Price * item.quantity);
       itemquantity += item.quantity;
       servicetax = 0.3*totalCost1;
       tax = 0.5*totalCost1;
       totalCost2 = totalCost1 + servicetax + tax;
       MyrtoUSD = totalCost2 * 0.23838;
       console.log(item);
    })

    auth.onAuthStateChanged(user => {
       db.collection('users').doc(user.uid).get().then(doc => {
             db.collection("Order Status").add({
                Amount: totalCost2.toFixed(2),
                Date: firebase.firestore.Timestamp.now(),
                Name:  doc.data().Username,
                order: "on Hold",
                status:1,
                user:user.uid,
                completion:"",
                model:"undefined"
             }).then(function(docRef){
                db.collection("cart-items").where("user", "==", user.uid ).onSnapshot((snapshot) => {
                    let cartItems = [];
                    snapshot.docs.forEach((doc) => {
                        cartItems.push({
                            id: doc.id, 
                            ...doc.data()
                        })
                    })
                    console.log(docRef.id);
                    insertCartItems(cartItems,docRef.id);
                })

                 
             })

       });

       


    
    
 })
 }

 function insertCartItems(cartItems ,docRef) {
    
   
    cartItems.forEach((item) => {
        db.collection("Order Status").doc(docRef)
        .collection('cart-items').doc(item.id).set({
                id: item.id,
                Name: item.Name,
                Category: item.Category,
                Price: item.Price,
                Description: item.Description,
                ImageUrl:item.ImageUrl,
                quantity: 1,
                user: item.user
        })
        
       
    })
}
/////////////////////////////////////////////////////////////////////////
 