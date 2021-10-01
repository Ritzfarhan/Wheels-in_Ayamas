const setupUsername = (user) => {
    if (user) {
        if (user.admin) {
            //adminItems.forEach(item => item.style.display = 'block');
        }
        if (user.staff) {
            //staffItems.forEach(item => item.style.display = 'block');
        }
        // account info
        /*db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
          <div>Logged in as ${user.email}</div>
          <div>${doc.data().bio}</div>
          <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
          <div class="pink-text">${user.staff ? 'Staff' : ''}</div>
        `;
            //accountDetails.innerHTML = html;
        });*/
        db.collection('users').doc(user.uid).get().then(doc => {
            
           
            const usernamehtml = `<a>${doc.data().Username}<a> `;
            usernameHomepage.innerHTML = usernamehtml;
        });
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // clear account info
        //accountDetails.innerHTML = '';
        // toggle user elements
        //adminItems.forEach(item => item.style.display = 'none');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            user.staff = idTokenResult.claims.staff;
            setupUI(user);
            setupUsername(user);
            
        });
    } else {
        setupUI();
        //setupGuides([]);
    }
});


// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
    }
})

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

