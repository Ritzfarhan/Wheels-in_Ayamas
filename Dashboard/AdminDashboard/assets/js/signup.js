//var messagesRef = db.collection('users');

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupGuides([]);
    }
});
firebase.auth().onAuthStateChanged(function (user) {
    user.sendEmailVerification();
});


// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
    }
})

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
            Username: signupForm['signup-username'].value
        });

    }).then(() => {
        // close the signup modal & reset form
        //const modal = document.querySelector('#modal-signup');
        //M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = ''
        window.location.href = "/AdminDashboard/index.html";
    }).catch(err => {
        console.log;
        signupForm.querySelector('.error').innerHTML = err.message;
    });
})
/////////////////////////////////////////
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
        //return db.collection('users').doc(cred.user.uid).set({
        //    username: signupForm['signup-username'].value
        var newMessageRef = messagesRef.push();

        return newMessageRef.set({
            username: signupForm['signup-username'].value
        });

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
*/
///////////////////////////////////////////////////////////////////////////

/*
function saveMessage(name, company, email, phone, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message
    });
}
*/