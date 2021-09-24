

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            user.staff = idTokenResult.claims.staff;
            setupUI(user);
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
    Swal.fire({ title: "Logged out", text: "You are logged out", type: "warning", confirmButtonClass: "btn long", buttonsStyling: !1 });
    window.location.href = "/Homepage/index.html";
});

