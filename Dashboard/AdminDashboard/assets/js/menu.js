
const menuform = document.querySelector('#menu-form');
menuform.addEventListener('submit', (e) => {
  e.preventDefault();

  // sign up the user & add firestore data
 
    db.collection("Menu").add({
       Name:menuform['menu-name'].value,
       Category:menuform['menu-category'].value,
       Price:menuform['menu-price'].value,
       Description:menuform['menu-description'].value

      }).then(() => {
    
        menuform.reset();
        menuform.querySelector('.error').innerHTML = ''
        Swal.fire({ title: "Success!", text: "Menu added", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 });
        //setupPage(user);
        
    }).catch(err => {
        console.log;
         menuform.querySelector('.error').innerHTML = err.message;
    });
      
});