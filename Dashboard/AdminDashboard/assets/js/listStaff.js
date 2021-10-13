const ref = firebase.firestore().collection('users').where("roles", "==", "staff");


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
            <img src="../../../assets/img/avatar/m16.png" class="img-40" alt="">
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
        <img src="../../../assets/img/svg/c-close.svg" alt="" class="svg">
    </span>
</td>
</tr>`

        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });
    document.querySelector('.list').innerHTML = list;
    //document.querySelector('.name').innerHTML = name;
    //document.querySelector('.email').innerHTML = email;
});