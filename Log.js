document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(response => {
             window.location.href = "dashboard.html"
        })
        .catch(error => {
            alert(getErrorMessage(error));
        });
});
function getErrorMessage(error){
if (error.code == "auth/invalid-credential"){
    return "Usuário ou Senha inválidos";
}
    return error.message;
}
firebase.auth().onAuthStateChanged (function(user){
    if (user) {
        window.location.href = "Dashboard.html";
    }
})
