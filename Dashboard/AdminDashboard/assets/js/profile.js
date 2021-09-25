
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
            const html = `<center><h6>${doc.data().Username} </h6></center>`;
                          // ${user.email}
            username.innerHTML = html;

            const username2html = `<h3>${doc.data().Username}</h3>
                                    ${user.email}`;

            username2.innerHTML = username2html;

            const roles_profilehtml = `${user.admin ? 'Admin of Ayamas' : user.staff ? 'Staff of Ayamas' : ''}`;
            roles_profile.innerHTML = roles_profilehtml;

            const usernamehtml = `<h6>${doc.data().Username}<h6> `;
            username.innerHTML = usernamehtml;
            
            const roleshtml = `<h6 class='roles'>${user.admin ? 'Admin' : user.staff ? 'Staff' : ''}</h6>`;
            roles.innerHTML = roleshtml;

            //const f_nameForm_Html = `value=${doc.data().f_name}`;
            //f_nameForm.value = f_nameForm_Html;

            // const l_nameForm_Html = ` ${doc.data().l_name}`;
            //l_nameForm.innerHTML = l_nameForm_Html;

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
        //db.collection('guides').onSnapshot(snapshot => {
        //   setupGuides(snapshot.docs);
        // }, err => console.log(err.message));
    } else {
        setupUI();

    }
});
