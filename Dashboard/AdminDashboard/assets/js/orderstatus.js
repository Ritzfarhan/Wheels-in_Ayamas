const ref =firebase.firestore().collection('Order Status').orderBy('status', 'desc');

function updateOrder(orderID) {
    console.log("function " + count);

    const order = db.collection('Order Status').doc(orderID);
    if(count <= 1){
      return order.update({
        status: 1,
        order : "Unpaid"
      }).then(() =>{
        console.log('status = unpaid')
      }).catch((error) => {
        console.log('Error ', error);
      });
      
    }
    else if(count===2){
      return order.update({
        status: 2,
        order : "On Hold"
      }).then(() =>{
        console.log('status = On Hold')
      }).catch((error) => {
        console.log('Error ', error);
      });
  
    }
    else if(count === 3){
      return order.update({
        status: 3,
        order : "Paid"
      }).then(() =>{
        console.log('status = Paid')
      }).catch((error) => {
        console.log('Error ', error);
      });
      
    
    }else{
      return order.update({
        status: 0,
        order : "Preparing"
      }).then(() =>{
        console.log('status = preparing')
      }).catch((error) => {
        console.log('Error ', error);
      });
    }

    
}

function updateclass(request){
    var element = document.getElementById("status");
      request.forEach((order)=>{
        if(order.status <= 1){
          element.classList.remove("paid");
          element.classList.toggle("un_paid");
          element.innerHTML= "Unpaid";
          console.log(count);
          count += 1;
          
        }
        else if(order.status===2){
          element.classList.remove("un_paid");
          element.classList.toggle("on_hold");
          element.innerHTML= "On Hold";
          console.log(count);
          count += 1;
      
        }
        else if(order.status === 3){
          element.classList.remove("on_hold");
          element.classList.toggle("paid");
          element.innerHTML= "Paid";
          console.log(count);
          //count = 1;
          
        
        }else{
          element.classList.toggle("un_paid");
          element.innerHTML= "Unpaid";
        }
      })
  
  }

ref.onSnapshot(snapshot => {
    // console.log(snapshot);

    let requests = [];
    snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
    });
    console.log(requests);

    let list = '';
    requests.forEach(request => {

        list +=

            `  <tr>
            <td>
               <!-- Custom Checkbox -->
               <label class="custom-checkbox">
                  <input type="checkbox">
                  <span class="checkmark"></span>
               </label>
               <!-- End Custom Checkbox -->

            </td>
            <td>${request.Amount}</td>
            <td>${request.Date.toDate().toDateString()}</td>
            <td>${request.Name}</td>
            <td><button id="status" data-id="${request.id}" onclick="updateorder()" type="button" class="status-btn un_paid" >Unpaid</button></td>
            <td><a href="invoice-details.html" class="details-btn">Details <i
                     class="icofont-arrow-right"></i></a></td>
         </tr>`

        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });
    updateclass(requests)
    createEventListeners();
    document.getElementById('app').innerHTML = list;
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
});

function createEventListeners() {

    let UpdateButtons = document.querySelectorAll(".status-btn");

    UpdateButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked");
            updateOrder(button.dataset.id)
        })
    })

}   

var count = 1 ;
  function updateorder() {
    console.log(count);
    var element = document.getElementById("status");
    count += 1;

    if(count > 3){
      count = 1;
      status(1);
    }else{
      status(count);
    }
       
    function status(count){
     
      if(count <= 1){
        element.classList.remove("paid");
        element.classList.toggle("un_paid");
        element.innerHTML= "Unpaid";
        console.log(count);
        count += 1;
        
      }
      else if(count===2){
        element.classList.remove("un_paid");
        element.classList.toggle("on_hold");
        element.innerHTML= "On Hold";
        console.log(count);
        count += 1;
    
      }
      else if(count === 3){
        element.classList.remove("on_hold");
        element.classList.toggle("paid");
        element.innerHTML= "Paid";
        console.log(count);
        //count = 1;
        
      
      }else{
        element.classList.toggle("un_paid");
        element.innerHTML= "Unpaid";
      }
    }

}
