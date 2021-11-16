function getCartItems() {
    auth.onAuthStateChanged(user => {
    db.collection("cart-items").where("user", "==", user.uid ).onSnapshot((snapshot) => {
        let totalCount = 0;
        snapshot.docs.forEach((doc)=>{
            totalCount += doc.data().quantity;
        })
        console.log(totalCount);
        setCartCounter(totalCount);
    })
})
}

function setCartCounter(totalCount) {
    // cart-item-number
    document.querySelector(".count").innerText = totalCount;
}

getCartItems();