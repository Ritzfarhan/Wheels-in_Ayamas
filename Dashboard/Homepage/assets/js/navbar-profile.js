
const username4 = document.querySelector('.user-name4');

const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `&nbsp;&nbsp;&nbsp;&nbsp;${doc.data().Username}`;
                          // ${user.email}
            username4.innerHTML = html;
        });
    } else {
        // clear account info
        username4.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;Not Logged in';
    }
};

auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        //db.collection('guides').onSnapshot(snapshot => {
        //   setupGuides(snapshot.docs);
        // }, err => console.log(err.message));
    } else {
        setupUI();

    }
});
