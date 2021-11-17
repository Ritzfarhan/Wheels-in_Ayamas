
const username = document.querySelector('.user-name');
const username2 = document.querySelector('.user-name2');
const f_name = document.querySelector('.f_name');
const l_name = document.querySelector('.l_name');
const roles = document.querySelector('.roles');
const roles_profile = document.querySelector('.roles-profile');
const f_nameForm = document.getElementById('.edit-fname');
const l_nameForm = document.getElementById('.edit-lname');

const setupUI = (user) => {
    if (user) {
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<br><br><center><h6>${doc.data().Username} </h6></center>`;
                          // ${user.email}
            username.innerHTML = html;

            const username2html = `<h3>${doc.data().Username}</h3>
                                    ${user.email}`;

            username2.innerHTML = username2html;

            const roles_profilehtml = `${user.admin ? 'Admin of Ayamas' : user.staff ? 'Staff of Ayamas' : ''}`;
            roles_profile.innerHTML = roles_profilehtml;

            const usernamehtml = `<br><br><h6>${doc.data().Username}<h6> `;
            username.innerHTML = usernamehtml;
            
            const roleshtml = `<h6 class='roles'><center>${user.admin ? 'Admin' : user.staff ? 'Staff' : ''}</center></h6>`;
            roles.innerHTML = roleshtml;

            //const f_nameForm_Html = `value=${doc.data().f_name}`;
            //f_nameForm.value = f_nameForm_Html;

            // const l_nameForm_Html = ` ${doc.data().l_name}`;
            //l_nameForm.innerHTML = l_nameForm_Html;

            const f_namehtml = `${doc.data().f_name}`;
            f_name.innerHTML = f_namehtml;

            const l_namehtml = `${doc.data().l_name} `;
            l_name.innerHTML = l_namehtml;

            const emailhtml = `${user.email} `;
            email.innerHTML = emailhtml;


        });
    } else {
        // clear account info
        username.innerHTML = '<br><br>Not Logged in';
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
