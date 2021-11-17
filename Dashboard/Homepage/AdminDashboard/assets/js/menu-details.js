const product_title = document.querySelector('.product_title');

function deleteItem(itemId){
    db.collection("Menu").doc(itemId).get().then(doc => {  
            
        const title = `<h4 class="product_title">${doc.data().Name} </h4>`;

        product_title.innerHTML = title;




    });
}

function createEventListeners() {

    let menudetails = document.querySelectorAll(".menu-details");

    menudetails.forEach((button)=>{
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id)
        })
    })
}