const StaffForm = document.querySelector('.staff-actions');
StaffForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const StaffEmail = document.querySelector('#staff-email').value;
    const addStaffRole = functions.httpsCallable('addStaffRole');
    //const addroles = functions.httpsCallable('addroles');

    //firebase.auth().getUserByEmail(adminEmail)
    //  .then(user => {
    //    db.collection("users").doc(user.uid).update({
    //      roles: "staff"
    //    })

    //  })

    addStaffRole({ email: StaffEmail })
        .then(result => {

            console.log(result);
        })
        .catch(err => {
            console.log(err.message);
        });


    function getUser() {
        db.collection("users").where("email", "==", StaffEmail).get().then((querySnapshot) => {
            console.log();
            let user = [];
            querySnapshot.forEach((doc) => {
                user.push({
                    id: doc.id
                })

            });
            updateroles(user);
            console.log(user);
        });
    }

    function updateroles(user) {

        user.forEach((users) => {
            db.collection("users").doc(users.id).update({
                roles: "staff"
            })
        })
    }

    getUser();

   


});