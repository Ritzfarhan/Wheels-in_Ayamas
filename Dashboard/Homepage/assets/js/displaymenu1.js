 function getMenu() {
    db.collection("Menu").where("Category", "==", "Chicken Roaster").onSnapshot(snapshot => {
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
        doc.classList.add("col-lg-6", "menu-item", "filter-chicken");
       // doc.style = document.querySelector(".menu");
        doc.style.position = "absolute";
        //posx = col*50; posy=row*50;
        //doc.style.left ="auto";
        //doc.style.top = "auto";
        //doc.style.marginTop = "50px";
        //doc.style.width =  document.querySelector(".row-menu");;
       // doc.style.height = document.querySelector(".row-menu");;

        doc.innerHTML = `
       
        <img src="${item.ImageUrl}" class="menu-img" alt="">
            <div class="menu-content">
              <a href="/Homepage/Dashmin_Light/Dashmin_Light/Dashmin_html/pages/ecommerce/golden-roaster-whole.html">${item.Name}</a><span>RM ${item.Price}  &nbsp; <div id="add"></div></span>
            </div>
            <div class="menu-ingredients">
            ${item.Description} &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
 
        `

         let addToCartEl = document.createElement("button");
         addToCartEl.classList.add("btn-info-menu", "btn");
        
         //addToCartEl.style.left = String(posx)+"px";
         //addToCartEl.style.top = String(posy)+"px";
         //addToCartEl.style.width = "50px";
         //addToCartEl.style.height = "50px";
         //
         addToCartEl.innerText = "add to cart";
         addToCartEl.addEventListener("click", function(){
            AddtoCart(item)
         })
         //let addbtn = document.getElementById("add").appendChild(addToCartEl);
        // document.querySelector(".price").appendChild(addToCartEl);
        doc.appendChild(addToCartEl);
        
        //document.querySelector(".row-menu").appendChild(doc);
        document.querySelector(".row-menu").appendChild(doc);
       


    })
    createEventListeners();
}

function createEventListeners() {
    let AddtocartButtons = document.querySelectorAll(".addtocart");
    

   

    AddtocartButtons.forEach((button) => {
        button.addEventListener("click", function(){
            AddtoCart(button.dataset.id);
        })
    })

}

getMenu();