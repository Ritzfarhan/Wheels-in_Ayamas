//firebase.auth()

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

//const changepasswordform = document.querySelector('#changepassword');
const mailField = document.getElementById('.mail');
const passwordField = document.getElementById('.password');
const labels = document.getElementById('.label');
const editButton = document.getElementById('.edit');
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  console.log(user);
})

const editInformation = () => {
    const newEmail = mailField.value;
    const newPassword = newpasswordfield.value;

    const credential = createCredential(user);
    changePassword(user, credential ,newPassword);
} 

const createCredential = user => {
  const password = prompt('Password:');
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return credential;
}

const changePassword = (user, credential, newPassword) => {
  user.reauthenticateWithCredential(credential)
  .then(() => {
    user.updatePassword(newPassword);
    console.log('Password Updated!');
  })
  .catch(error => {
    console.error(error);
  })
}

editButton.addEventListener('click', editInformation);




     