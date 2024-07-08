const username = document.querySelector('.user-name');
const username2 = document.querySelector('.user-name2');
const username3 = document.querySelector('.user-name3');
const f_name = document.querySelector('.f_name');
const l_name = document.querySelector('.l_name');
const roles = document.querySelector('.roles');
const roles_profile = document.querySelector('.roles-profile');
const f_nameForm = document.getElementById('edit-fname');
const l_nameForm = document.getElementById('edit-lname');
const accountUsername = document.querySelector(".accUsername");
const avatar = document.getElementById('avatar');
const profilepic = document.getElementById('profilepic');

const setupUI = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                if (username) {
                    username.innerHTML = `<br><br><center><h6>${doc.data().Username} </h6></center>`;
                }
                if (username2) {
                    username2.innerHTML = `<h3>${doc.data().Username}</h3> ${user.email}`;
                }
                if (roles_profile) {
                    roles_profile.innerHTML = `${user.admin ? 'Admin of Ayamas' : user.staff ? 'Staff of Ayamas' : ''}`;
                }
                if (username3) {
                    username3.innerHTML = `${doc.data().Username}`;
                }
                if (f_name) {
                    f_name.innerHTML = `${doc.data().f_name}`;
                }
                if (l_name) {
                    l_name.innerHTML = `${doc.data().l_name}`;
                }
                if (roles) {
                    roles.innerHTML = `<h6 class='roles'><center>${user.admin ? 'Admin' : user.staff ? 'Staff' : ''}</center></h6>`;
                }
                // If you need to set the value for form inputs, use value instead of innerHTML
                if (f_nameForm) {
                    f_nameForm.value = doc.data().f_name;
                }
                if (l_nameForm) {
                    l_nameForm.value = doc.data().l_name;
                }
            } else {
                console.error("No such document!");
            }
        }).catch(error => {
            console.error("Error getting document:", error);
        });
    } else {
        // clear account info
        if (username) {
            username.innerHTML = '<br><br>Not Logged in';
        }
    }
};

auth.onAuthStateChanged(user => {
    if (user) {
        firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL()
        .then(imgUrl => {
            if (profilepic) {
                profilepic.src = imgUrl;
            }
            if (avatar) {
                avatar.src = imgUrl;
            }
        }).catch(error => {
            console.error("Error fetching profile picture:", error);
        });

        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        }).catch(error => {
            console.error("Error fetching ID token result:", error);
        });
    } else {
        setupUI();
    }
});
