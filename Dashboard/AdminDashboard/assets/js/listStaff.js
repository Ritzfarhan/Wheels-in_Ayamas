const ref = firebase.firestore().collection('users').where("roles", "==", "staff");

function deleteItem(userId) {
    const deleteUser = functions.httpsCallable('deleteUser');
    // db.collection("cart-items").doc(itemId).delete();

    deleteUser({ uid: userId })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err.message);
        })

}


  
  function insertPicUrl(items) {
  
  
  
    //let itemsHTML = "";
    items.forEach((item) => {
  
        firebase.storage().ref('users/' + item.id + '/profile.jpg').getDownloadURL()
            .then(imgUrl => {
                db.collection("users").doc(item.id).update({
                    ImageUrl: imgUrl
  
                })
            })
  
        
  
    })
  }

ref.onSnapshot(snapshot => {
    // console.log(snapshot);

    let requests = [];
    snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
    });
    insertPicUrl(requests);
    console.log(requests);

    let list = '';
    requests.forEach(request => {
        list +=

            ` <tr>
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
        <div class="name bold">${request.Username}</div>
    </div>
</td>
<td class="email">${request.email}</td>
<td class="f_name">${request.f_name}</td>
<td class="l_name">${request.l_name}</td>
<!--<td>UX Researcher</td>
<td>June 20, 2015</td>
<td>$26253.0</td>-->
<td class="actions">
    <span class="contact-edit" data-toggle="modal" data-target="#contactEditModal">
        <img src="../../../assets/img/svg/c-edit.svg" alt="" class="svg">
    </span>
    <span class="contact-close">
        <img class="deleteStaff" data-id="${request.id}" src="../../../assets/img/svg/c-close.svg" alt="" class="svg">
    </span>
</td>
</tr>`

        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });
    createEventListeners();
    document.querySelector('.list').innerHTML = list;
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
});

function createEventListeners() {

    let deleteButtons = document.querySelectorAll(".deleteStaff");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            console.log("clicked");
            deleteItem(button.dataset.id)
        })
    })

}   