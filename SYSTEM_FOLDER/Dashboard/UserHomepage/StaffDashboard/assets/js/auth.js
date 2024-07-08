// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      window.location.href = "/Admin Dashboard/Dashmin_html/index.html";
      window.alert("You are Logged in");
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
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()

    var t;
    Swal.fire({
        title: "Logged out",
        html: "Redirecting to Homepage in <strong></strong> seconds.",
        timer: 1000,
        confirmButtonClass: "btn long",
        buttonsStyling: !1,
        onBeforeOpen: function () {
            Swal.showLoading(),
                (t = setInterval(function () {
                    Swal.getContent().querySelector("strong").textContent = Swal.getTimerLeft();
                }, 100));
        },
        onClose: function () {
            clearInterval(t);
        },
    }).then(function (t) {
        t.dismiss === Swal.DismissReason.timer && console.log("I was closed by the timer");
    });
    setTimeout(function () {
        window.location.href = "/Homepage/index.html";
    }, 1000);
  });
  
  
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
  
  