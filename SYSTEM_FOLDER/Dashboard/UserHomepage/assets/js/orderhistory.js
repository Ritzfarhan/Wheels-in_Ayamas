//const refHistory = firebase.firestore().collection('Order Status').where("completion", "==", "true")

auth.onAuthStateChanged(user => {
    firebase.firestore().collection('Order Status').where("user", "==", user.uid).onSnapshot(snapshot => {
        // console.log(snapshot);
    
        let requests = [];
        snapshot.forEach(doc => {
            requests.push({ ...doc.data(), id: doc.id });
        });
        console.log(requests);
    
        let order = '';
        requests.forEach(request => {
            if(request.completion=="true"){
            order +=
    
                `         
    
            
             <tr>
                <td>RM${request.Amount}</td>
                <td>${request.Date.toDate().toDateString()}</td>
                <td>${request.Name}</td>
                <td>
                    <button  data-id="${request.id}"  type="button" class="status-btn completed statusbutton">${request.order}</button>
                </td>
                <td class="actions">
                   <span  data-id="${request.id}" class="contact-edit" data-toggle="modal" data-target="#contactAddModal">
                       <img src="/AdminDashboard/assets/img/svg/menuicon.svg" alt="" class="svg">
                   </span>
                   <span data-id="${request.id}" class="contact-close" data-toggle="modal" data-target="#contactEditModal" style="margin-left: 10px;">
                      <img src="/AdminDashboard/assets/img/svg/car2.svg" alt="" class="svg">
                   </span></td>                              
             </tr>
             
         
             
             `
            }
            //name += `<td>${request.Username}</td>`
            //email += `<li>${request.text}</li>`
        });


    document.querySelector('.History-list-display').innerHTML = order;
    createEventListeners();
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
});
});
function Menudetails(id) {
    
   
    
    db.collection("Order Status").doc(id).collection('cart-items').onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        console.log(cartItems);
        generateMenudetails(cartItems);
        //getTotalCost(cartItems);
    })

}
function generateMenudetails(cartItems) {
    let itemsHTML = "";
    let number = 0;
    cartItems.forEach((item) => {
      number++;
        //document.getElementById('number').innerHTML = number;
        itemsHTML += `

        <tr>
        <td class="bold">#${number}</td>
        <td>${item.Name}</td>
        <td>${item.quantity}</td>
        <td>RM${item.Price}</td>
        <td>RM${numeral(item.Price * item.quantity).format('0,0.00')}</td>
        </tr>

        `
    })
    document.querySelector(".menudetails").innerHTML = itemsHTML;
   
}


function Carbutton(id) {
    const slot = document.querySelector(".slot");
      const plate = document.querySelector(".plate");
      const model = document.querySelector(".model");
     //const servicetax = document.querySelector(".service-tax");
    //const tax = document.querySelector(".tax");
    //const total = document.querySelector(".total-cost");

      db.collection('Order Status').doc(id).get().then(doc => {
        const slotNo = `${doc.data().slot}`
        slot.innerHTML =  slotNo;
    
        const PlateNo = `${doc.data().plate}`
        plate.innerHTML =  PlateNo;
    
        const Model = `${doc.data().model}`
        model.innerHTML =  Model;

        
    
      });
  
 
      
  }

  function Menubutton(id) {
     const subtotal = document.querySelector(".subtotal");
     const servicetax = document.querySelector(".service-tax");
    const tax = document.querySelector(".tax");
    const total = document.querySelector(".total-cost");

      db.collection('Order Status').doc(id).get().then(doc => {

        const sub = `${(doc.data().Amount-((0.05*doc.data().Amount)+(0.03*doc.data().Amount))).toFixed(2)}`
        subtotal.innerHTML =  sub;

        const service = `${(0.03*doc.data().Amount).toFixed(2)}`
        servicetax.innerHTML =  service;
    
        const totaltax = `${(0.05*doc.data().Amount).toFixed(2)}`
        tax.innerHTML =  totaltax;
    
        const totalAmount = `${doc.data().Amount}`
        total.innerHTML =  totalAmount;

        
    
      });
  
 
      
  }

function createEventListeners() {

    let MenuButtons = document.querySelectorAll(".contact-edit");
    let CarButtons = document.querySelectorAll(".contact-close");
    //let statusButtons = document.querySelectorAll(".statusbutton");

    MenuButtons.forEach((button)=>{
        button.addEventListener("click", function(){
            console.log("clicked");
            Menubutton(button.dataset.id)
            Menudetails(button.dataset.id)
            
        })
    })

    CarButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked edit " + button.dataset.id);
            Carbutton(button.dataset.id)

        })
    })

   // statusButtons.forEach((button)=>{
   //     button.addEventListener("click", function(){
   //         console.log("clicked "+ button.dataset.id);
   //         statusbutton(button.dataset.id)
   //        
   //         
   //     })
   // })

}