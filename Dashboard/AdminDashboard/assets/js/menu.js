

let file = {};

function choosefile(e) {
  file = e.target.files[0];
}

const menuform = document.querySelector('#menu-form');
menuform.addEventListener('submit', (e) => {
  e.preventDefault();

  // add menu to firestore

  db.collection("Menu").add({
    Name: menuform['menu-name'].value,
    Category: menuform['menu-category'].value,
    Price: menuform['menu-price'].value,
    Description: menuform['menu-description'].value

  }).then(() => {

    menuform.reset();
    menuform.querySelector('.error').innerHTML = ''
    Swal.fire({ title: "Success!", text: "Menu added", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 }); 
    //setupPage(user);
    
  }).catch(err => {
    console.log;
    menuform.querySelector('.error').innerHTML = err.message;
  });

  // link menu pic with firestore
  let name = menuform['menu-name'].value;
  firebase.storage().ref('menu/' + name + '/profile.jpg').put(file).then(function () {
    console.log('uploaded profile image')
  }).then(() => {
    run(2000).then(() => { getMenu(name); });
    window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html";
  }).catch(error => {
    console.log(error.message);
  })

 

})
/////////////////////////////////////////////

function run(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getMenu(name) {
  //let name = menuform['menu-name'].value;
  db.collection("Menu").where("Name", "==", name).onSnapshot(snapshot => {
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
      generateItems(items)
      console.log(items);
  });
}

function generateItems(items) {



  //let itemsHTML = "";
  items.forEach((item) => {

      firebase.storage().ref('menu/' + item.Name + '/profile.jpg').getDownloadURL()
          .then(imgUrl => {
              db.collection("Menu").doc(item.id).update({
                  ImageUrl: imgUrl

              })
          })

      

  })
}

//getMenu();


//getMenuid(name) {
//  db.collection("Menu").where("Name", "==", name).get().then((querySnapshot) => {
//    console.log();
//    let menu = [];
//    querySnapshot.forEach((doc) => {
//      menu.push({
//        id: doc.id,
//        Name: doc.data().Name
//      })
//
//    });
//    uploadpic(menu);
//    console.log(menu);
//  });
//
//
//uploadpic(menu) {
//
//  menu.forEach((menus) => {
//    firebase.storage().ref('menu/' + menus.Name + '/profile.jpg').getDownloadURL()
//      .then(imgUrl => {
//        db.collection("Menu").doc(menus.id).update({
//          ImageUrl: imgUrl
//
//        })
//      })
//  })
//








