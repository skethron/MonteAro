

// Troque aqui se a página de perfil tiver outro nome.
var PAGINA_PERFIL = "../Perfil/perfil.html";

var form = document.getElementById("form-login");
var campoEmail = document.getElementById("email");
var campoSenha = document.getElementById("senha");
var campoLembrar = document.getElementById("lembrar");
var botao = document.getElementById("btn-login");
var caixaErro = document.getElementById("erro");
var linkEsqueci = document.getElementById("esqueci-senha");

function mostrarErro(mensagem) {
    caixaErro.textContent = mensagem;
    caixaErro.classList.add("show");
}

function limparErro() {
    caixaErro.textContent = "";
    caixaErro.classList.remove("show");
}

function traduzirErro(codigo) {
    switch (codigo) {
        case "auth/invalid-email":
            return "E-mail inválido.";
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "E-mail ou senha incorretos.";
        case "auth/user-disabled":
            return "Esta conta foi desativada.";
        case "auth/too-many-requests":
            return "Muitas tentativas. Aguarde um pouco e tente de novo.";
        case "auth/network-request-failed":
            return "Sem conexão com a internet.";
        case "auth/operation-not-supported-in-this-environment":
            return "Este navegador bloqueou o login. Abra o site por um servidor local.";
        default:
            return "Não foi possível entrar. Tente novamente.";
    }
}

// Se a pessoa já está logada, vai direto para o perfil.
auth.onAuthStateChanged(function (usuario) {
    if (usuario) {
        window.location.href = PAGINA_PERFIL;
    }
});

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparErro();

    var email = campoEmail.value.trim();
    var senha = campoSenha.value;

    if (!email || !senha) {
        mostrarErro("Preencha o e-mail e a senha.");
        return;
    }

    botao.disabled = true;
    botao.textContent = "Entrando...";

    auth.setPersistence(
        campoLembrar.checked
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION
    )
        .then(function () {
            return auth.signInWithEmailAndPassword(email, senha);
        })
        .then(function () {
            window.location.href = PAGINA_PERFIL;
        })
        .catch(function (erro) {
            mostrarErro(traduzirErro(erro.code));
            botao.disabled = false;
            botao.textContent = "Login";
        });
});

// "Esqueci a senha": envia o e-mail de redefinição para o endereço digitado.
linkEsqueci.addEventListener("click", function (evento) {
    evento.preventDefault();
    limparErro();

    var email = campoEmail.value.trim();
    if (!email) {
        mostrarErro("Digite seu e-mail no campo acima para redefinir a senha.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(function () {
            mostrarErro("Se esse e-mail estiver cadastrado, enviamos um link para redefinir a senha.");
        })
        .catch(function (erro) {
            mostrarErro(traduzirErro(erro.code));
        });
});
