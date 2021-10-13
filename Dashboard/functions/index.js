
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firebaseConfig } = require("firebase-functions");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins" }
  }
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});

exports.addStaffRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other staff" }
  }


  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, { staff: true, })
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made as Staff.`
      }
    }).catch(err => {
      return err;
    });
});

exports.addroles = functions.https.onCall((data, context) => {

//const db = firebase.firestore().collection("users")
  return admin.auth().getUserByEmail(data.email)
    .then(user => {
      return user.uid
        

    });
});

//exports.newUserSignUp = functions.auth.user().onCreate(user => {
//  // for background triggers you must return a value/promise
//  return admin.firestore().collection('users').doc(user.uid).set({
//    email: user.email,
//    roles: customer
//  });
//});
//
exports.userDeleted = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();
});