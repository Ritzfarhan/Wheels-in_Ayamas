auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            user.staff = idTokenResult.claims.staff;
        });
    } else {
        console.log('user logged out');
    }
})


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
    //window.alert("You are Logged out");
    Swal.fire({ title: "Logged out", text: " Redirecting to homepage", type: "warning", confirmButtonClass: "btn long", buttonsStyling: !1 });
    setTimeout(function () {
        window.location.href = "/Homepage/index.html";
    }, 2000);
    //window.location.href = "/AdminDashboard/pages/pages/authentication/logout.html";
});