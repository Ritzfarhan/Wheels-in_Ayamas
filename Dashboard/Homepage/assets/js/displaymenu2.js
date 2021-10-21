function getMenu() {
    db.collection("Menu").where("Category", "==", "Meal For One").onSnapshot(snapshot => {
        console.log();
        let items = [];
        snapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                Name: doc.data().Name,
                Category: doc.data().Category,
                Price: doc.data().Price,
                Description: doc.data().Description,
                ImageUrl: doc.data().ImageUrl

            })

        });

        //firebase.storage().ref('menu/'+ doc.data().Name + '/profile.jpg').getDownloadURL()
        //.then(imgUrl => 
        //{
        //  return doc.data().Image = imgUrl;
        //   
        //})
        generateItems(items)
        console.log(items);
    });
}

function AddtoCart(item) {
    console.log(item);
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                id: item.id,
                Name: item.Name,
                Category: item.Category,
                Price: item.Price,
                Description: item.Description,
                ImageUrl:item.ImageUrl,
                quantity: 1
            })
        }
        
    })
}

function deleteItem(itemId) {
    console.log(itemId);
    const product_title = document.querySelector('.product_title');
    db.collection("Menu").doc(itemId).get().then(doc => {

        const title = `<h4 class="product_title">${doc.data().Name} </h4>`;

        product_title.innerHTML = title;




    });
}

function generateItems(items) {



    //let itemsHTML = "";
    items.forEach((item) => {

        // firebase.storage().ref('menu/' + item.Name + '/profile.jpg').getDownloadURL()
        //     .then(imgUrl => {
        //         db.collection("Menu").doc(item.id).update({
        //             ImageUrl: imgUrl
        //
        //         })
        //     })
        //
        let doc = document.createElement("div");
        doc.classList.add("col-xl-2", "col-lg-3", "col-md-4", "col-sm-6", "col-12");
        doc.innerHTML = `
       
        <!-- Product Grid Item -->
        <div class="product-grid-item mb-30">
            <div class="product-img mb-3">
                 <a data-id="${item.id}" class="menu-details" href="meal4one-set-c.html"> 
                 <img src="${item.ImageUrl}" class=" w-100" alt="" id="menupic">
                 </a>
            </div>
            <div class="product-content">
                <h6 class="mb-10">RM${item.Price}</h6>
                 <a data-id="${item.id}" href="meal4one-set-c.html">
                    <p class="black">${item.Name}</p>
                 </a>
            </div>
           
        </div>
        <!-- End Product Grid Item -->
 
        `
        let addToCartEl = document.createElement("button");
        addToCartEl.classList.add("single_add_to_cart_button", "btn", "button", "button1", "btn-fill");
        addToCartEl.innerText = "Add To Cart";
        addToCartEl.addEventListener("click", function(){
            AddtoCart(item)
         })
        // let addToCartEl = document.createElement("div");
        // addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
        // addToCartEl.innerText = "Add to cart";
        // addToCartEl.addEventListener("click", function(){
        //     addToCart(item)
        // })
        doc.appendChild(addToCartEl);
        document.querySelector(".row-menu").appendChild(doc);
        createEventListeners();

    })
}




function createEventListeners() {

    let menudetails = document.querySelectorAll(".menu-details");

    menudetails.forEach((button) => {
        button.addEventListener("click", function () {
            deleteItem(button.dataset.id)
        })
    })
}

getMenu();