function getMenu(){
    db.collection("Menu").where("Category","==","Chicken Roaster").get().then((querySnapshot) => {
        console.log();
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                Name: doc.data().Name,
                Category: doc.data().Category,
                Price: doc.data().Price,
                Description: doc.data().Description,
                Image:""
                
            })
         
        });

        firebase.storage().ref('menu/'+ doc.data().Name + '/profile.jpg').getDownloadURL()
        .then(imgUrl => 
        {
          return doc.data().Image = imgUrl;
           
        })
        generateItems(items)
        console.log(items);
    });
}

function generateItems(items) {
    

    let itemsHTML = "";
    items.forEach((item) => {

      // firebase.storage().ref('menu/'+ item.Name + '/profile.jpg').getDownloadURL()
      // .then(imgUrl => 
      // {
      //   return item.Image = imgUrl;
      //    
      // })
        let doc = document.createElement("div");
        doc.classList.add("col-xl-2", "col-lg-3","col-md-4","col-sm-6","col-12");
        doc.innerHTML = `
       
        <!-- Product Grid Item -->
        <div class="product-grid-item mb-30">
            <div class="product-img mb-3">
                 <a href="menu-details.html"> 
                 <img src="${item.Image}" class=" w-100" alt="" >
                 </a>
            </div>
            <div class="product-content">
                <h6 class="mb-10">${item.Price}</h6>
                 <a href="menu-details.html">
                    <p class="black">${item.Name}</p>
                 </a>
            </div>
        </div>
        <!-- End Product Grid Item -->
 
        `

      // let addToCartEl = document.createElement("div");
      // addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
      // addToCartEl.innerText = "Add to cart";
      // addToCartEl.addEventListener("click", function(){
      //     addToCart(item)
      // })
       // doc.appendChild(addToCartEl);
        document.querySelector(".row-menu").appendChild(doc);
        
    })
}

getMenu();