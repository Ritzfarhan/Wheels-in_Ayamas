const ref = firebase.firestore().collection('Menu');

function deleteItem(itemId) {
    //db.collection("Menu").doc(itemId).delete();
    //firebase.storage().ref('menu/' + name + '/profile.jpg').

    function getMenu(itemId) {
        //let name = menuform['menu-name'].value;
        db.collection("Menu").where("id", "==", itemId).onSnapshot(snapshot => {
            console.log();
            
            let items = [];
            snapshot.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id })

            });
           
            deletepic(items)
            
            //console.log(items);
        });
        db.collection("Menu").doc(itemId).delete();
    }

    function deletepic(items) {



        //let itemsHTML = "";
        items.forEach((item) => {

            var desertRef = storageRef.child('menu/' + item.Name + 'profile.jpg');

           desertRef.delete()
            .then(() => {

                console.log("deleted successfully");

              }).catch((error) => {
                // Uh-oh, an error occurred!
              });
              



        })
    }

    getMenu(itemId);
}
let file = {};

function choosefile(e) {
    file = e.target.files[0];
}


function EditItem(menuId) {
    const idmenuName = document.querySelector(".idmenuName");
    const idmenuPrice = document.querySelector(".idmenuPrice");
    const idmenuDescription = document.querySelector(".idmenuDescription");

    db.collection('Menu').doc(menuId).get().then(doc => {
        const name = `${doc.data().Name}`
        idmenuName.value =  name;

        const price = `${doc.data().Price}`
        idmenuPrice.value =  price;

        const Desc = `${doc.data().Description}`
        idmenuDescription.innerHTML =  Desc;
    });
    const menuform = document.querySelector('#update-menu-form');
    menuform.addEventListener('submit', (e) => {
        e.preventDefault();

        db.collection("Menu").doc(menuId).update({
            Name: menuform['menu-name'].value,
            Category: menuform['menu-category'].value,
            Price: menuform['menu-price'].value,
            Description: menuform['menu-description'].value
        }).then(() => {
            // close the signup modal & reset form
            //const modal = document.querySelector('#edit-menu-modal');
            //M.Modal.getInstance(modal).close();

            //setupPage(user);
        }).catch(err => {
            console.log;
            menuform.querySelector('.error').innerHTML = err.message;
        });

        // link menu pic with firestore
        let name = menuform['menu-name'].value;
        firebase.storage().ref('menu/' + name + '/profile.jpg').put(file).then(function () {
            console.log('uploaded profile image')
        }).then(() => {
            run(2000).then(() => { getMenu(name); });
            run(3000).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html"; });
            //window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html";
            menuform.reset();
            menuform.querySelector('.error').innerHTML = ''
            Swal.fire({ title: "Success!", text: "Your menu have been updated", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 });

        }).catch(error => {
            console.log(error.message);
        })
        //////////////////////////////////////////////////////////
        function run(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        function getMenu(name) {
            //let name = menuform['menu-name'].value;
            db.collection("Menu").where("Name", "==", name).onSnapshot(snapshot => {
                console.log();
                let items = [];
                snapshot.forEach((doc) => {
                    items.push({
                        id: doc.id,
                        Name: doc.data().Name,
                        Category: doc.data().Category,
                        Price: doc.data().Price,
                        Description: doc.data().Description,
                        ImageUrl: doc.data().ImageUrl

                    })

                });
                generateItems(items)
                console.log(items);
            });
        }





        function generateItems(items) {



            //let itemsHTML = "";
            items.forEach((item) => {

                firebase.storage().ref('menu/' + item.Name + '/profile.jpg').getDownloadURL()
                    .then(imgUrl => {
                        db.collection("Menu").doc(item.id).update({
                            ImageUrl: imgUrl

                        })
                    })



            })
        }

    });

}
ref.onSnapshot(snapshot => {
    // console.log(snapshot);

    let requests = [];
    snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
    });
    console.log(requests);

    let list = '';
    requests.forEach(request => {

        list +=

            `                                 <tr>
<td>
     <!-- Custom Checkbox -->
     <label class="custom-checkbox">
         <input type="checkbox">
         <span class="checkmark"></span>
     </label>
     <!-- End Custom Checkbox -->

</td>
<td>
     <div class="d-flex align-items-center">
         <div class="img mr-20">
             <img src="${request.ImageUrl}" class="img-40" alt="">
         </div>
         <div class="name bold">${request.Name}</div>
     </div>
</td>
<td>${request.Category}</td>
<td>${request.Price}</td>
<!--<td>UX Researcher</td>
<td>June 20, 2015</td>
<td>$26253.0</td>-->
<td class="actions">
     <span class="edit-menu" data-id="${request.id}" class="contact-edit" data-toggle="modal" data-target="#contactEditModal">
         <img src="../../assets/img/svg/c-edit.svg" alt="" class="svg">
     </span>
     <span class="contact-close">
         <img class="delete" data-id="${request.id}" src="../../assets/img/svg/c-close.svg" alt="" class="svg">
     </span>
</td>
</tr>`

        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });

    document.querySelector('.menu-list').innerHTML = list;
    createEventListeners();
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
});

function createEventListeners() {

    let deleteButtons = document.querySelectorAll(".delete");
    let EditButtons = document.querySelectorAll(".edit-menu");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked");
            deleteItem(button.dataset.id)

        })
    })

    EditButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked edit " + button.dataset.id);
            EditItem(button.dataset.id)

        })
    })

}

