/*const setupPage = (user) => {
    if (user.admin) {
        const admindashboard = "/AdminDashboard/index.html";
        window.location.href = admindashboard;
    }
    else if (user.staff) {
        const admindashboard = "/AdminDashboard/index.html";
        window.location.href = admindashboard;
    }
    else {
        window.location.href = "/Homepage/index.html";
    }


}




// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            user.staff = idTokenResult.claims.staff;
            //setupPage(user);
        });
        window.alert("You are Logged in");
    } else {
        console.log('user logged out');
    }
})*/

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
            Username: signupForm['signup-username'].value,
            f_name: signupForm['signup-Firstname'].value,
            l_name: signupForm['signup-Lastname'].value,
            email: signupForm['signup-email'].value
        });

    }).then(() => {
        // close the signup modal & reset form
        //const modal = document.querySelector('#modal-signup');
        //M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = ''
        //setupPage(user);
        window.location.href = "/Homepage/index.html";
    }).catch(err => {
        console.log;
        signupForm.querySelector('.error').innerHTML = err.message;
    });
})

auth.onAuthStateChanged(function (user) {
    user.sendEmailVerification();
});
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