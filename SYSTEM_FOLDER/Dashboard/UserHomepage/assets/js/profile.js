//const username4 = document.querySelector('.user-name4');
//const usernameHomepage = document.querySelector('.user-name-homepage');
//const username = document.querySelector('.user-name');
//const f_name = document.querySelector('.f_name');
//const l_name = document.querySelector('.l_name');

/*const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            
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

           //const usernameHomepagehtml = `<a>&nbsp;&nbsp;&nbsp;&nbsp;${doc.data().Username}</a>`;
           //              // ${user.email}
           //usernameHomepage.innerHTML = usernameHomepagehtml;

        });
    } else {
        // clear account info
        username.innerHTML = 'Not Logged in';
    }
};*/

/*auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
           
        });
        db.collection('guides').onSnapshot(snapshot => {
            //setupGuides(snapshot.docs);
        }, err => console.log(err.message));
    } else {
        setupUI();

    }
});*/
