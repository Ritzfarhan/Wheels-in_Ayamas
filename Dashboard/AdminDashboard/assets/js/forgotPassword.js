
const forgotForm = document.querySelector('#forgot-form');
forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = forgotForm['email'].value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            // Password reset email sent!
            // ..
            window.location.href = "/AdminDashboard/pages/pages/authentication/login.html";
            forgotForm.reset();
            forgotForm.querySelector('.error').innerHTML = '';

        })
        .catch((error) => {
            console.log;
            forgotForm.querySelector('.error').innerHTML = error.message;

            // ..
        });
})

