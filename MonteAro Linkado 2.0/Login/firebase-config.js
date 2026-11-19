
var firebaseConfig = {
    apiKey: "AIzaSyBg-FTtjRNSNDKIWZMP16aH_f5E0vPON5g",
    authDomain: "montearo.firebaseapp.com",
    projectId: "montearo",
    appId: "1:12549864312:web:0b2454d5a10ecd6ddf668d"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var auth = firebase.auth();
