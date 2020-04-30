const dbRef = firebase.database().ref()

dbRef.child(0).once('value').then(function (snapshot) {
    console.log(snapshot.val())
});