//===== Ready Data ===
//const Username = document.querySelector('.user-name-edit');
//const f_name = document.querySelector('.f_name-edit');
//const l_name = document.querySelector('.l_name-edit');
//
//function Ready() {
//  Username = document.getElementById('user-name-edit').value;
//  email = document.getElementById("email-edit").value;
//  f_name = document.getElementById('f_name-edit').value;
//  l_name = document.getElementById('l_name-edit').value;
//}
//
////===== Select data ===
//document.getElementById('update').onclick = function () {
//  Ready();
//  firebase.database().ref('users/' + email).update({
//    UserName: Username,
//    FirstName: f_name,
//    LastName: l_name
//  });
//}
let file = {};

function choosefile(e) {
  file = e.target.files[0];
}

const Updateform = document.querySelector('#update-form');
Updateform.addEventListener('submit', (e) => {
  e.preventDefault();

  // sign up the user & add firestore data
  auth.onAuthStateChanged(user => {
    db.collection("users").doc(user.uid).update({
      Username:Updateform['user-name-edit'].value,
        f_name:Updateform['f-name-edit'].value,
        l_name:Updateform['l-name-edit'].value
      }).then(() => {
        // close the signup modal & reset form
        //const modal = document.querySelector('#modal-signup');
        //M.Modal.getInstance(modal).close();
        Updateform.reset();
        Updateform.querySelector('.error').innerHTML = ''
        Swal.fire({ title: "Success!", text: "Your Profile have been updated", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 });
        //setupPage(user);
        window.location.href = "/StaffDashboard/pages/pages/user-profile/edit-profile.html";
    }).catch(err => {
        console.log;
        Updateform.querySelector('.error').innerHTML = err.message;
    });
      
  })
  
  auth.onAuthStateChanged(user => {
    firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(file).then( function() {
      console.log('uploaded profile image')
    }).catch(error =>{
      console.log(error.message);
    })
  })

});

auth.onAuthStateChanged(user => {

  const accountUsername = document.querySelector(".accUsername");
  const accountFname = document.querySelector(".accFname");
  const accountLname = document.querySelector(".accLname");

  db.collection('users').doc(user.uid).get().then(doc => {
    const accUsername = `${doc.data().Username}`
    accountUsername.value =  accUsername;

    const accFname = `${doc.data().f_name}`
    accountFname.value =  accFname;

    const accLname = `${doc.data().l_name}`
    accountLname.value =  accLname;


  });
})



  //email: Updateform['signup-email'].value


  //}).then(() => {
  //    // close the signup modal & reset form
  //    //const modal = document.querySelector('#modal-signup');
  //    //M.Modal.getInstance(modal).close();
  //    signupForm.reset();
  //    signupForm.querySelector('.error').innerHTML = ''
  //    //setupPage(user);
  //    window.location.href = "/Homepage/index.html";
  //}).catch(err => {
  //    console.log;
  //    signupForm.querySelector('.error').innerHTML = err.message;



