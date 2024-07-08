

      //  .signInWithEmailAndPassword('email', 'o_password')
    //    .then(function(user) {

    //        firebase.auth().currentUser.updatePassword('n_password').then(function(){

                //Do something

     //       }).catch(function(err){
                //Do something
     //       });

 //       }).catch(function(err){
            //Do something
        
    //    });

  //  const changePassword = document.querySelector('#changepassword');
  //  changePassword.addEventListener('submit', (e) => {
  //    e.preventDefault();
    // get user info
  //  const newpassword = changePassword['newpassword'].value;

//firebase.auth().currentUser.updatePassword('newpassword')
  //  changePassword.reset();
   // changePassword.querySelector('.error').innerHTML = ''
   // Swal.fire({ title: "Success!", text: "Your Profile have been updated", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 });
    //setupPage(user);
   // window.location.href = "/AdminDashboard/pages/pages/user-profile/edit-profile.html";
//  }).catch(err => {
  //  console.log;
 //   changePassword.querySelector('.error').innerHTML = err.message;
//  })

const changepasswordform = document.querySelector('#changepassword');
const mailField = document.getElementById('.mail');
const passwordField = document.getElementById('.password');
const labels = document.getElementById('.label');
const editButton = document.getElementById('.edit');
//const auth = firebase.auth();
const newpasswordField = document.querySelector('.confirmpassword');
const oldpasswordField = document.querySelector('.oldpassword');




//const editInformation = () => {
//    //const newEmail = mailField.value;
//    const newPassword = newpasswordField.value;
//
//    //const credential = createCredential(user);
//    //changePassword(user, credential ,newPassword);
//
//    if(newPassword) { //run if the new password is filled
//      const credential = createCredential(user);
//      changePassword(user, credential, newPassword);
//  }
//} 

function createCredential(user) {
  const password = oldpasswordField.value;//use the oldpassword field
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  console.log(credential);
  return credential;
}



function changePassword(user, credential, newPassword) {
  user.reauthenticateWithCredential(credential)
  .then(() => {
    user.updatePassword(newPassword);
    console.log('Password Updated!');
    Swal.fire({ title: "Success!", text: "Password have been change !", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 }); 
    //run(3000).then(() => { window.location.href = "/Homepage/index.html"; });
   // window.location.href = "/AdminDashboard/pages/pages/authentication/login.html";
  })
  .catch(error => {
    console.error(error);
  })
}


//editButton.addEventListener('click', editInformation);




const changeform = document.querySelector('#changepassword');

changeform.addEventListener('submit', (e) => {
  e.preventDefault();
  auth.onAuthStateChanged(user => {
    console.log(user);
    const newPassword = newpasswordField.value;
  const credential = createCredential(user);
  changePassword(user, credential, newPassword);
 
  })
  
})

//let user = firebase.auth().currentUser;
////const newPassword = document.getElementById('.confirmpassword');
//const newPassword =changeform['confirmpassword'].value;
//
//const credential = promptForCredentials();
//user.reauthenticateWithCredential(credential).then(() => {
//  // User re-authenticated.
//  user.updatePassword(newPassword).then(() => {
//    console.log("successsfully changed password")
//  }).catch(function(error) {
//    // An error happened.
//    console.log(error);
//  });
//}).catch((error) => {
//  console.log(error)
//});

     