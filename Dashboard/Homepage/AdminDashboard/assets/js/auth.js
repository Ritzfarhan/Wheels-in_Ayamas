const setupPage = (user) => {
  if (user.admin) {
    const admindashboard = "/AdminDashboard/pages/maindashboard/update-order-status.html";
    window.location.href = admindashboard;
  }
  else if (user.staff) {
    const staffdashboard = "/StaffDashboard/pages/maindashboard/update-order-status.html";
    window.location.href = staffdashboard;
  }
  else {
    window.location.href = "/index.html";
  }


}




// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      user.staff = idTokenResult.claims.staff;

      Swal.fire({ title: "YAY!", text: "You're Logged in", type: "success", confirmButtonClass: "btn long", buttonsStyling: !1 });

        setTimeout(function () {
          setupPage(user);
        }, 1500);
      
    });
    //window.alert("You are Logged in");
  } else {
    console.log('user logged out');
  }
})




/*
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      username: signupForm['signup-username'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
    window.location.href = "/Admin Dashboard/Dashmin_html/index.html";
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});*/


/*
// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut()
});*/


/*
// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;


  /* log the user in
   const auth     from firebase-auth
   |              |
   v              v
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    //const modal = document.querySelector('#modal-login');
    //M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    window.location.href = "/Admin Dashboard/Dashmin_html/index.html";
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

})*/

