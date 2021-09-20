
const username = document.querySelector('.user-name');
const f_name = document.querySelector('.f_name');
const l_name = document.querySelector('.l_name');

const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<h3>${doc.data().Username}</h3>
                          <p> ${user.email}</p>`;
                          username.innerHTML = html;

            //const usernamehtml = `<h6>${doc.data().Username}<h6> `;
            //username.innerHTML = usernamehtml;

            const f_namehtml = `<span>First Name :</span> ${doc.data().f_name}`;
            f_name.innerHTML = f_namehtml;

            const l_namehtml = `<span>Last Name :</span> ${doc.data().l_name}`;
            l_name.innerHTML = l_namehtml;

        });
    } else {
        // clear account info
        username.innerHTML = 'Not Logged in';
    }
};

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

    }
});
