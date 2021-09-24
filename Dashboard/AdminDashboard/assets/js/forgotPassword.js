
const forgotForm = document.querySelector('#forgot-form');
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = forgotForm['email'].value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            // Password reset email sent!
            // ..
            //document.getElementById("send-email").id = 'type-success2';

            Swal.fire({ title: "SUCCESS", text: "Email has been sent!", type: "success", confirmButtonClass: "btn long", buttonsStyling: !1 });
            setTimeout(function () {
                window.location.href = "/AdminDashboard/pages/pages/authentication/login.html";
            }, 3000);
            forgotForm.reset();
            forgotForm.querySelector('.error').innerHTML = '';

        })
        .catch((error) => {
            console.log;
            forgotForm.querySelector('.error').innerHTML = error.message;

            // ..
        });
})

