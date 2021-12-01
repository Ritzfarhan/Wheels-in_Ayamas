//console.log(docRef.id);

function getParkinglots() {
    


    
    db.collection("parking slot").orderBy('slot', 'asc').onSnapshot((snapshot) => {
        let parking = [];
        snapshot.docs.forEach((doc) => {
            parking.push({
                id: doc.id, 
                ...doc.data()
            })
            

        })
        console.log(parking);
        generateSlot(parking);
        //getTotalCost(cartItems);
    })

}

function generateSlot(parking) {
    let itemsHTML = "";
    var number = 0;
    parking.forEach((item) => {
        number += 1;
        if(item.Enable == 0){
            itemsHTML += `
        <option>${item.id}</option>

        `
        }else{
            itemsHTML += `
            <option style="display: none;">${item.id}</option>
    
            `
        }
        //document.getElementById('number').innerHTML = number;
        
    })
    document.querySelector(".parkingslots").innerHTML = itemsHTML;
    //createEventListeners();
}


getParkinglots();

function updateOrder(id) {
    const slot = bookingform['slot'].value;
    console.log(id);
    id.forEach((item) => {
        if(item.model=="undefined"){
        db.collection("Order Status").doc(item.id).update({
            slot:  bookingform['slot'].value,
            plate: bookingform['plate'].value,
            model: bookingform['model'].value
        
          }).then(() => {
        
             db.collection("parking slot").doc(slot).update({
                 Enable: 1
               }).then(()=>{
                window.location.href = "/Dashmin_Light/Dashmin_Light/Dashmin_html/pages/ecommerce/order-status.html";
               })
               
          }).catch(err => {
            console.log(err);
          });
       }
    })
  
 }
const bookingform = document.querySelector('#booking-form');

bookingform.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("clicked");
    auth.onAuthStateChanged(user => {
        // db.collection('order status').where('user','==',user.uid).get().then(doc => {
        //     const id = doc.data().id;
        //     console.log(id);
        db.collection("Order Status").where("user", "==", user.uid ).onSnapshot((snapshot) => {
         let id = [];
         snapshot.docs.forEach((doc)=>{
             id.push({
                 id: doc.id, 
                 ...doc.data()
             })
             console.log(id);
             updateOrder(id);
         })
         //console.log(totalCount);
 });
 });
   // const slot = bookingform['slot'].value;
    // add menu to firestore

})







