const ref = firebase.firestore().collection('Menu');
let file = null;  // Initialize file to null

function deleteItem(itemId) {
    function getMenu(itemId) {
        db.collection("Menu").where("id", "==", itemId).onSnapshot(snapshot => {
            let items = [];
            snapshot.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id });
            });
            deletepic(items);
        });
        db.collection("Menu").doc(itemId).delete();
    }

    function deletepic(items) {
        items.forEach((item) => {
            var desertRef = firebase.storage().ref('menu/' + item.Name + 'profile.jpg');
            desertRef.delete().then(() => {
                console.log("deleted successfully");
            }).catch((error) => {
                console.error("Error deleting picture:", error);
            });
        });
    }

    getMenu(itemId);
}

function choosefile(e) {
    file = e.target.files[0];  // Assign the selected file to the file variable
}

function EditItem(menuId) {
    const idmenuName = document.querySelector("#menu-name");
    const idmenuPrice = document.querySelector("#menu-price");
    const idmenuDescription = document.querySelector("#menu-description");
    const idmenuCategory = document.querySelector("#menu-category");

    db.collection('Menu').doc(menuId).get().then(doc => {
        if (doc.exists) {
            if (idmenuName) {
                idmenuName.value = doc.data().Name;
            }
            if (idmenuPrice) {
                idmenuPrice.value = doc.data().Price;
            }
            if (idmenuDescription) {
                idmenuDescription.value = doc.data().Description;
            }
            if (idmenuCategory) {
                idmenuCategory.value = doc.data().Category;
            }
        } else {
            console.error("No such document!");
        }
    }).catch(error => {
        console.error("Error getting document:", error);
    });

    const menuform = document.querySelector('#update-menu-form');
    if (menuform) {
        menuform.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedData = {
                Name: menuform['menu-name'].value,
                Category: menuform['menu-category'].value,
                Price: menuform['menu-price'].value,
                Description: menuform['menu-description'].value
            };

            // Update Firestore document
            db.collection("Menu").doc(menuId).update(updatedData).then(() => {
                console.log('Menu updated successfully');
                
                // Check if a new file is selected
                if (file) {
                    const name = updatedData.Name;
                    firebase.storage().ref('menu/' + name + '/profile.jpg').put(file).then(() => {
                        console.log('Uploaded profile image');
                        run(2000).then(() => { getMenu(name); });
                        run(3000).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html"; });
                    }).catch(error => {
                        console.error("Error uploading profile image:", error);
                    });
                } else {
                    // If no file is selected, just redirect
                    run(2000).then(() => { getMenu(updatedData.Name); });
                    run(3000).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html"; });
                }

                // Reset the form
                menuform.reset();
                menuform.querySelector('.error').innerHTML = '';
                Swal.fire({
                    title: "Success!",
                    text: "Your menu has been updated",
                    allowOutsideClick: true,
                    confirmButtonClass: "btn long",
                    buttonsStyling: false
                });
            }).catch(err => {
                console.error("Error updating menu:", err);
                menuform.querySelector('.error').innerHTML = err.message;
            });
        });
    } else {
        console.error("Menu form not found!");
    }

    function run(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getMenu(name) {
        db.collection("Menu").where("Name", "==", name).onSnapshot(snapshot => {
            let items = [];
            snapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    Name: doc.data().Name,
                    Category: doc.data().Category,
                    Price: doc.data().Price,
                    Description: doc.data().Description,
                    ImageUrl: doc.data().ImageUrl
                });
            });
            generateItems(items);
            console.log(items);
        });
    }

    function generateItems(items) {
        items.forEach((item) => {
            firebase.storage().ref('menu/' + item.Name + '/profile.jpg').getDownloadURL().then(imgUrl => {
                db.collection("Menu").doc(item.id).update({
                    ImageUrl: imgUrl
                });
            }).catch(error => {
                console.error("Error getting image URL:", error);
            });
        });
    }
}

ref.onSnapshot(snapshot => {
    let requests = [];
    snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
    });
    console.log(requests);

    let list = '';
    requests.forEach(request => {
        list +=
            `<tr>
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
<td class="actions">
    <span class="edit-menu" data-id="${request.id}" class="contact-edit" data-toggle="modal" data-target="#contactEditModal">
        <img src="../../assets/img/svg/c-edit.svg" alt="" class="svg">
    </span>
    <span class="contact-close">
        <img class="delete" data-id="${request.id}" src="../../assets/img/svg/c-close.svg" alt="" class="svg">
    </span>
</td>
</tr>`;
    });

    document.querySelector('.menu-list').innerHTML = list;
    createEventListeners();
});

function createEventListeners() {
    let deleteButtons = document.querySelectorAll(".delete");
    let EditButtons = document.querySelectorAll(".edit-menu");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked");
            deleteItem(button.dataset.id);
        });
    });

    EditButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked edit " + button.dataset.id);
            EditItem(button.dataset.id);
        });
    });
}
