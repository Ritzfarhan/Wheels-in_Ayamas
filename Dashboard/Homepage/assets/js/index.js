const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');


const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            //adminItems.forEach(item => item.style.display = 'block');
        }
        if (user.staff) {
            //staffItems.forEach(item => item.style.display = 'block');
        }
        // account info
        /*db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
          <div>Logged in as ${user.email}</div>
          <div>${doc.data().bio}</div>
          <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
          <div class="pink-text">${user.staff ? 'Staff' : ''}</div>
        `;
            //accountDetails.innerHTML = html;
        });*/
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // clear account info
        //accountDetails.innerHTML = '';
        // toggle user elements
        //adminItems.forEach(item => item.style.display = 'none');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};