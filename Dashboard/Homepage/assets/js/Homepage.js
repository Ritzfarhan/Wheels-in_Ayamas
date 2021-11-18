const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const username4 = document.querySelector('.user-name4');
const usernameHomepage = document.querySelector('.user-name-homepage');
const username = document.querySelector('.user-name');
const f_name = document.querySelector('.f_name');
const l_name = document.querySelector('.l_name');
//const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');


const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
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
            
           
            //const usernamehtml = `<h6>${doc.data().Username}<h6> `;
            //usernameHomepage.innerHTML = usernamehtml;


            const namehtml = `<h3>${doc.data().Username}</h3>
                         <h6> ${user.email}</h6>`;
           username.innerHTML = namehtml;

            //const usernamehtml = `<h6>${doc.data().Username}<h6> `;
            //username.innerHTML = usernamehtml;

            


            const f_namehtml = `<br><h6>First Name : ${doc.data().f_name}</h6>`;
            f_name.innerHTML = f_namehtml;

            const l_namehtml = `<h6>Last Name : ${doc.data().l_name}</h6>`;
            l_name.innerHTML = l_namehtml;

            const username4html = `<a>&nbsp;&nbsp;&nbsp;&nbsp;${doc.data().Username}</a>`;
                          // ${user.email}
            username4.innerHTML = username4html;
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
        
    } else {
        // clear account info
        //accountDetails.innerHTML = '';
        // toggle user elements
        //adminItems.forEach(item => item.style.display = 'none');
        
    }
};

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        firebase.storage().ref('users/'+ user.uid + '/profile.jpg').getDownloadURL()
        .then(imgUrl => 
        {
            profilepic.src = imgUrl;
            avatar.src = imgUrl;
        })
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
        window.location.href = "/index.html";
    }, 1000);
});

