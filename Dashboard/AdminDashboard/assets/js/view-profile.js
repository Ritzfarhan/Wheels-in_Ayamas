
const username = document.querySelector('.user-name');
const f_name = document.querySelector('.f_name');
const l_name = document.querySelector('.l_name');

const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<center><h6>${doc.data().Username}</h6></center>
                          <p> ${user.email}</p>`;
                          username.innerHTML = html;

            //const usernamehtml = `<h6>${doc.data().Username}<h6> `;
            //username.innerHTML = usernamehtml;

            const f_namehtml = `<h2 style="display: inline;"> ${doc.data().f_name} </h2>`;
            f_name.innerHTML =  f_namehtml;

            const l_namehtml = `<h6 style="display: inline;"> ${doc.data().l_name}</h6>`;
            l_name.innerHTML = l_namehtml;

        });
    } else {
        // clear account info
        username.innerHTML = 'Not Logged in';
    }
};

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
            setupUI(user);
        });
        //db.collection('guides').onSnapshot(snapshot => {
        //   setupGuides(snapshot.docs);
        // }, err => console.log(err.message));
    } else {
        setupUI();

    }
});