const dbRef = firebase.database().ref()

dbRef.once('value').then(function (snapshot) {
    console.log(snapshot.val())
});
