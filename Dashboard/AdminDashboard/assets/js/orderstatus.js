var app = new Vue({
    el: '#app',
    data: {
      requests: [],
    },
    methods: {
      updateStatus(id) {
        console.log("function " + count);
        //console.log(id);
       // const update = firebase.functions().httpsCallable('updateStatus');
       // update({ id },{ count })
       // .catch(error => {
       //   console.log(error.message);
       // });

        const order = db.collection('Order Status').doc(id);
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
    },
    mounted() {
      const ref = firebase.firestore().collection('Order Status').orderBy('status', 'desc');;
      ref.onSnapshot(snapshot => {
        let requests = [];
        snapshot.forEach(doc => {
          requests.push({...doc.data(), id: doc.id});
          //var data = doc.data().Date.toDate().toDateString();
        });
        
        console.log(requests);
        this.requests = requests;
      });
    }
  });

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
      

    
    //status(count);
    
    //console.log(count);
    //  element.classList.toggle("on_hold");


 }