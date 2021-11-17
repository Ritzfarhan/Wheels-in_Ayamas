




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
     v              v                          */
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        //const modal = document.querySelector('#modal-login');
        //M.Modal.getInstance(modal).close();

        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        Swal.fire({ title: "YAY!", text: "You're Logged in", type: "success", confirmButtonClass: "btn long", buttonsStyling: !1 });

        setTimeout(function () {
          setupPage(user);
        }, 1500);
        //setupPage(user);
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });

});