document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    let timeoutId;

    // Mostrar o menu ao passar o mouse
    menuIcon.addEventListener('mouseover', function () {
        clearTimeout(timeoutId);
        sidebar.style.left = '0';
    });

    // Esconder o menu ao tirar o mouse
    menuIcon.addEventListener('mouseout', function () {
        timeoutId = setTimeout(function () {
            if (!sidebar.matches(':hover') && !menuIcon.matches(':hover')) {
                sidebar.style.left = '-250px';
            }
        }, 500);
    });

    sidebar.addEventListener('mouseover', function () {
        clearTimeout(timeoutId);
        sidebar.style.left = '0';
    });

    sidebar.addEventListener('mouseout', function () {
        timeoutId = setTimeout(function () {
            if (!sidebar.matches(':hover') && !menuIcon.matches(':hover')) {
                sidebar.style.left = '-250px';
            }
        }, 500);
    });
});

// Firebase authentication
const firebaseConfig = {
    apiKey: "AIzaSyDW_dJWIYWbA_YfbC7xUp-0aqxmWXuKEQg",
    authDomain: "controle-de-epi-a1928.firebaseapp.com",
    projectId: "controle-de-epi-a1928",
    storageBucket: "controle-de-epi-a1928.appspot.com",
    messagingSenderId: "232965550074",
    appId: "1:232965550074:web:439dcba994af5733a87e43"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html";  
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        alert('Logout realizado com sucesso!');
        window.location.href = "login.html";
    }).catch((error) => {
        alert('Erro ao fazer logout: ' + error.message);
    });
}
