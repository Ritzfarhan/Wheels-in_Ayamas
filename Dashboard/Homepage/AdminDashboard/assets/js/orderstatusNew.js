const ref = firebase.firestore().collection('Order Status').orderBy('status', 'desc');
const refdisplay = firebase.firestore().collection('Order Status').where("completion", "==", "")
//function changeStatus(id,status){
//    const orderstatus = document.querySelector('.status');
//
//    if(orderstatus.value == "order_placed"){    
//        db.collection("Order Status").doc(id).update({
//            status:1,
//            order:orderstatus.value
//        }).then(()=>{
//            
//        })
//    }
//    else if(orderstatus.value == "preparing_order"){
//        db.collection("Order Status").doc(id).update({
//            status:2,
//            order:orderstatus.value
//        }).then(()=>{
//            
//        })
//    }
//    
//}
auth.onAuthStateChanged(user => {
    firebase.firestore().collection('Order Status').where("user", "==", user.uid).onSnapshot(snapshot => {
        // console.log(snapshot);
    
        let requests = [];
        snapshot.forEach(doc => {
            requests.push({ ...doc.data(), id: doc.id });
        });
        console.log(requests);
    
        let list = '';
        requests.forEach(request => {
            if(request.completion==""){
            list +=

            `                                                 <tbody id="app">
            <tr v-for="request in requests">
               <td>
                  <!-- Custom Checkbox -->
                  <label class="custom-checkbox">
                     <input type="checkbox">
                     <span class="checkmark"></span>
                  </label>
                  <!-- End Custom Checkbox -->

               </td>
               <td>RM${request.Amount}</td>
               <td>${request.Date.toDate().toDateString()}</td>
               <td>${request.Name}</td>
               <td class="actions">
                 <span class="contact-close1    " data-toggle="modal" >
                    <button  data-id="${request.id}" type="button" class="status-btn btn1 statusbutton" >${request.order}</button>
                 </span>                     
                 </td>  

               <td class="actions">
                  <span data-id="${request.id}" class="contact-edit" data-toggle="modal" data-target="#contactAddModal">
                      <img src="/AdminDashboard/assets/img/svg/menuicon.svg" alt="" class="svg">
                  </span>
                  <span data-id="${request.id}" class="contact-close" data-toggle="modal" data-target="#contactEditModal" style="margin-left: 10px;">
                     <img src="/AdminDashboard/assets/img/svg/car2.svg" alt="" class="svg">
                  </span>
              </td>
               
            </tr>
         </tbody>
         
         `
        }
        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });

    document.querySelector('.status-list-display').innerHTML = list;
    createEventListeners();
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
});
})

ref.onSnapshot(snapshot => {
    // console.log(snapshot);

    let requests = [];
    snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
    });
    console.log(requests);

    let list = '';
    requests.forEach(request => {
if(request.completion==""){
    list +=

    `                                                 <tbody id="app">
    <tr v-for="request in requests">
       <td>
          <!-- Custom Checkbox -->
          <label class="custom-checkbox">
             <input type="checkbox">
             <span class="checkmark"></span>
          </label>
          <!-- End Custom Checkbox -->

       </td>
       <td>RM${request.Amount}</td>
       <td>${request.Date.toDate().toDateString()}</td>
       <td>${request.Name}</td>
       <td class="actions">
         <span class="contact-close1    " data-toggle="modal" data-target="#contactUpdateModal">
            <button  data-id="${request.id}" type="button" class="status-btn btn1 statusbutton" >${request.order}</button>
         </span>                     
         </td>  

       <td class="actions">
          <span data-id="${request.id}" class="contact-edit" data-toggle="modal" data-target="#contactAddModal">
              <img src="/AdminDashboard/assets/img/svg/menuicon.svg" alt="" class="svg">
          </span>
          <span data-id="${request.id}" class="contact-close" data-toggle="modal" data-target="#contactEditModal" style="margin-left: 10px;">
             <img src="/AdminDashboard/assets/img/svg/car2.svg" alt="" class="svg">
          </span>
      </td>
       
    </tr>
 </tbody>
 
 `
}
        

        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });

    document.querySelector('.status-list').innerHTML = list;
    createEventListeners();
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
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

        const sub = `${(doc.data().Amount-((0.5*doc.data().Amount)+(0.3*doc.data().Amount))).toFixed(2)}`
        subtotal.innerHTML =  sub;

        const service = `${(0.3*doc.data().Amount).toFixed(2)}`
        servicetax.innerHTML =  service;
    
        const totaltax = `${(0.5*doc.data().Amount).toFixed(2)}`
        tax.innerHTML =  totaltax;
    
        const totalAmount = `${doc.data().Amount}`
        total.innerHTML =  totalAmount;

        
    
      });
  
 
      
  }

  function statusbutton(id) {
      console.log("statusbutton");
    const statusform = document.querySelector('#update-status-form');
    

    statusform.addEventListener('submit', (e) => {
       // const status = statusform['status'].value 
        e.preventDefault();

  
       if(statusform['status'].value == "order placed"){    
          db.collection("Order Status").doc(id).update({
           order: "order placed",
           status:1
          }).then(()=>{
            run(100).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/update-order-status.html"; });
          })
      }
      else if(statusform['status'].value == "preparing order"){
          db.collection("Order Status").doc(id).update({
           order: "preparing order",
           status:2
          }).then(()=>{
            run(100).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/update-order-status.html"; });
          })
      }
      else if(statusform['status'].value == "on the way"){
       db.collection("Order Status").doc(id).update({
        order: "on the way",
        status:3
       }).then(()=>{
        run(100).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/update-order-status.html"; });
      })
   }
   else{
       db.collection("Order Status").doc(id).update({
        order: "completed",
        status:4,
        completion: "true"
       }).then(()=>{
           db.collection('Order Status').doc(id).get().then(doc => {
               db.collection("parking slot").doc(doc.data().slot).update({
                   Enable: 0
               }).then(()=>{
                run(100).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/update-order-status.html"; });
              })
           });
          
       })
   }
   function run(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
    });

     
 }

function createEventListeners() {

    let MenuButtons = document.querySelectorAll(".contact-edit");
    let CarButtons = document.querySelectorAll(".contact-close");
    let statusButtons = document.querySelectorAll(".statusbutton");

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

    statusButtons.forEach((button)=>{
        button.addEventListener("click", function(){
            console.log("clicked "+ button.dataset.id);
            statusbutton(button.dataset.id)
           
            
        })
    })

}

