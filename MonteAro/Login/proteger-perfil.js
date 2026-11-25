

(function () {
    var PAGINA_LOGIN = "../Login/login.html";


    if (typeof firebase === "undefined" || typeof auth === "undefined") {
        console.warn("Firebase não carregou: o perfil foi aberto sem verificação de login.");
        document.documentElement.style.visibility = "visible";
        return;
    }

    // Esconde a página até confirmar o login, para não "piscar" o conteúdo.
    document.documentElement.style.visibility = "hidden";

    var liberar = setTimeout(function () {
        document.documentElement.style.visibility = "visible";
    }, 10000);

    auth.onAuthStateChanged(function (usuario) {
        clearTimeout(liberar);

        if (!usuario) {
            window.location.replace(PAGINA_LOGIN);
            return;
        }

        var campoEmail = document.getElementById("usuario-email");
        if (campoEmail) campoEmail.textContent = usuario.email;

        document.documentElement.style.visibility = "visible";
    });

    var botaoSair = document.getElementById("btn-sair");
    if (botaoSair) {
        botaoSair.addEventListener("click", function (evento) {
            evento.preventDefault();
            auth.signOut().then(function () {
                window.location.replace(PAGINA_LOGIN);
            });
        });
    }
})();
