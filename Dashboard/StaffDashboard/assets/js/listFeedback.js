const ref = firebase.firestore().collection('Feedback');

function deleteItem(itemId) {

    function getFeedback(itemId) {
        //let name = menuform['menu-name'].value;
        db.collection("Feedback").where("id", "==", itemId).onSnapshot(snapshot => {
            console.log();
            
            let items = [];
            snapshot.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id })

            });
           
            deletepic(items)
            
            //console.log(items);
        });
        db.collection("Feedback").doc(itemId).delete();
    }

    function deletepic(items) {



        //let itemsHTML = "";
        items.forEach((item) => {

            var desertRef = storageRef.child('feedback/' + item.Name + 'profile.jpg');

           desertRef.delete()
            .then(() => {

                console.log("deleted successfully");

              }).catch((error) => {
                // Uh-oh, an error occurred!
              });
              



        })
    }

    getFeedback(itemId);
}


function EditItem(feedbackId) {
    const idfeedbackName = document.querySelector(".idfeedbackName1");
    const idfeedbackphone = document.querySelector(".idfeedbackphone1");
    const idfeedbackmyRange = document.querySelector(".idfeedbackmyRange1");
    const idfeedbackComment = document.querySelector(".idfeedbackComment1");

    db.collection('Feedback').doc(feedbackId).get().then(doc => {
        const name = `${doc.data().Name}`
        idfeedbackName.value =  name;

        const phone = `${doc.data().Phone}`
        idfeedbackphone.value =  phone;

        const Rating = `${doc.data().Rating}`
        idfeedbackmyRange.innerHTML =  Rating;

        const Comment = `${doc.data().Comment}`
        idfeedbackComment.value =  Comment;
    });
    const feedbackform = document.querySelector('#update-feedback-form');
    feedbackform.addEventListener('submit', (e) => {
        e.preventDefault();

        db.collection("Feedback").doc(feedbackId).update({
            Name: feedbackform['feedback-name'].value,
            Phone: feedbackform['feedback-phone'].value,
            Rating: feedbackform['feedback-myRange'].value,
            Comment: feedbackform['feedback-comment'].value

        }).then(() => {
            // close the signup modal & reset form
            //const modal = document.querySelector('#edit-menu-modal');
            //M.Modal.getInstance(modal).close();

            //setupPage(user);
        }).catch(err => {
            console.log;
            feedbackform.querySelector('.error').innerHTML = err.message;
        });

        // link menu pic with firestore
        let name = feedbackform['feedback-name'].value;
        firebase.storage().ref('feedback/' + name + '/profile.jpg').put(file).then(function () {
            console.log('uploaded profile image')
        }).then(() => {
            run(2000).then(() => { getFeedback(name); });
            run(3000).then(() => { window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html"; });
            //window.location.href = "/AdminDashboard/pages/maindashboard/menu-list.html";
            feedbackform.reset();
            feedbackform.querySelector('.error').innerHTML = ''
            Swal.fire({ title: "Success!", text: "Your menu have been updated", allowOutsideClick: !0, confirmButtonClass: "btn long", buttonsStyling: !1 });

        }).catch(error => {
            console.log(error.message);
        })
        //////////////////////////////////////////////////////////
        function run(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        function getFeedback(name) {
            //let name = menuform['menu-name'].value;
            db.collection("Feedback").where("Name", "==", name).onSnapshot(snapshot => {
                console.log();
                let items = [];
                snapshot.forEach((doc) => {
                    items.push({
                        id: doc.id,
                        Name: doc.data().Name,
                        Phone: doc.data().Phone,
                        Rating: doc.data().Rating,
                        Comment: doc.data().Comment

                    })

                });
                generateItems(items)
                console.log(items);
            });
        }





        function generateItems(items) {



            //let itemsHTML = "";
            items.forEach((item) => {

                firebase.storage().ref('feedback/' + item.Name + '/profile.jpg').getDownloadURL()
          .then(imgUrl => {
              db.collection("Feedback").doc(item.id).update({
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

            `
            <div>
            <div class="col-xl-2 col-md-12">
             
            <div class="contact-box mb-30">
                <div class="contact-head">
                    <div class="d-flex align-items-center">
                        
                        <div class="content pl-1">
                            <h4 class="name c2 mb-1">${request.Name}</h4>
                            <p>Customer</p>
                        </div>
                    </div>

                    <div class="dropdown-button">
                       
                        <div class="dropdown-menu dropdown-menu-right">
                           <a href="#" data-toggle="modal" data-target="#contactEditModal">Edit</a>
                           <a href="#" class="contact-close">Delete</a>
                        </div>
                     </div>
                </div>
                <div class="contact-body">
                   <p>Rate : ${request.Rating}</p><br>
                   <p><b>Comment</b><p></p>${request.Comment}</p>
                </div>
            </div>
           </div></div> `

        //name += `<td>${request.Username}</td>`
        //email += `<li>${request.text}</li>`
    });

    document.querySelector('.feedback-list').innerHTML = list;
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

