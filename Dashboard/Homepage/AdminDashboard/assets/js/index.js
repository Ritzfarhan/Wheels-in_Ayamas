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
    //Swal.fire({ title: "Logged out", text: " Redirecting to homepage", type: "warning", confirmButtonClass: "btn long", buttonsStyling: !1 });

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
    //window.location.href = "/AdminDashboard/pages/pages/authentication/logout.html";
});