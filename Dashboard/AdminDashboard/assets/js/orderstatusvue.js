// const { request } = require("express");

var app = new Vue({
  el: '#app',
  data: {
    requests: [],
  },
  methods: {
    updateStatus(id, count) {
      console.log(id)
      //updateorder(count);
      console.log("function " + count);
      //console.log(id);
      // const update = firebase.functions().httpsCallable('updateStatus');
      // update({ id },{ count })
      // .catch(error => {
      //   console.log(error.message);
      // });

      for (let i = count; i < 4; i++) {
        if (i > 3) { i = 1; }


        var element = document.getElementById("status");
        const order = db.collection('Order Status').doc(id);
        if (count <= 1) {
          return order.update({
            status: 1,
            order: "Unpaid"
          }).then(() => {
            count += 1;
            element.classList.remove("paid");
            element.classList.toggle("un_paid");
            element.innerHTML = "Unpaid";
            console.log('status = unpaid')
          }).catch((error) => {
            console.log('Error ', error);
          });

        }
        else if (count === 2) {
          return order.update({
            status: 2,
            order: "On Hold"
          }).then(() => {
            count += 1;
            element.classList.remove("un_paid");
            element.classList.toggle("on_hold");
            element.innerHTML = "On Hold";
            console.log('status = On Hold')
          }).catch((error) => {
            console.log('Error ', error);
          });

        }
        else if (count === 3) {
          return order.update({
            status: 3,
            order: "Paid"
          }).then(() => {
            count += 1;
            element.classList.remove("on_hold");
            element.classList.toggle("paid");
            element.innerHTML = "Paid";
            console.log('status = Paid')
          }).catch((error) => {
            console.log('Error ', error);
          });


        } else {
          return order.update({
            status: 0,
            order: "Preparing"
          }).then(() => {
            element.classList.toggle("un_paid");
            element.innerHTML = "Prepairing";
            console.log('status = preparing')
          }).catch((error) => {
            console.log('Error ', error);
          });
        }
      }
    }
  },
  mounted() {
    const ref = firebase.firestore().collection('Order Status');
    ref.onSnapshot(snapshot => {
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
        //var count = doc.data().status;
        //var data = doc.data().Date.toDate().toDateString();
      });

      // updateclass(requests)
      console.log(requests);
      this.requests = requests;
    });
  }
});


function updateorder(count) {
  //const order = db.collection('Order Status').doc(id);
  console.log(count);
  //var element = document.getElementById("status");
  // count += 1;

  if (count > 3) {
    count = 1;
    status(1);
  } else {
    status(count);
  }

  function status(count) {

    if (count <= 1) {

      console.log(count);
      count += 1;

    }
    else if (count === 2) {

      console.log(count);
      count++;

    }
    else if (count === 3) {

      console.log(count);
      count++;


    } else {
      count = 1;
    }
  }



  //status(count);

  //console.log(count);
  //  element.classList.toggle("on_hold");


}