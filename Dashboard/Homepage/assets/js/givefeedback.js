

const feedbackform = document.querySelector('#feedback-form');
feedbackform.addEventListener('submit', (e) => {
  e.preventDefault();

  // add menu to firestore

  db.collection("Feedback").add({
    Name: feedbackform['feedback-name'].value,
    Phone: feedbackform['feedback-phone'].value,
    Rating: feedbackform['feedback-myRange'].value,
    Comment: feedbackform['feedback-comment'].value

  }).then(() => {

    feedbackform.reset();
    feedbackform.querySelector('.error').innerHTML = ''
    Swal.fire({ title: "Success!", text: "Feedback added", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 }); 
    run(2000).then(() => { getFeedback(name); });
    run(3000).then(() => { window.location.href = "/Homepage/index.html"; });
 
    //setupPage(user);
    
  }).catch(err => {
    console.log;
    feedbackform.querySelector('.error').innerHTML = err.message;
  });

  // link menu pic with firestore
  let name = feedbackform['feedback-name'].value;
  firebase.storage().ref('feedback/' + name + '/profile.jpg').put(file).then(function () {
    console.log('uploaded profile image')
  }).then(() => {
    run(2000).then(() => { getFeedback(name); });
    run(5502).then(() => { window.location.href = "/Homepage/index.html"; });
  }).catch(error => {
    console.log(error.message);
  })
 

})
/////////////////////////////////////////////

function run(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getFeedback(name) {
  //let name = feedbackform['menu-name'].value;
  db.collection("Feedback").where("Name", "==", name).onSnapshot(snapshot => {
      console.log();
      let items = [];
      snapshot.forEach((doc) => {
          items.push({
              id: doc.id,
              Name: doc.data().Name,
              Phone: doc.data().Phone,
              Rating: doc.data().Rating,
              Comment: doc.data().Comment

          })

      });
      generateItems(items)
      console.log(items);
  });
}


function generateItems(items) {



  //let itemsHTML = "";
  items.forEach((item) => {

      firebase.storage().ref('feedback/' + item.Name + '/profile.jpg').getDownloadURL()
          .then(imgUrl => {
              db.collection("Feedback").doc(item.id).update({
                  ImageUrl: imgUrl

              })
          })

      

  })
}









