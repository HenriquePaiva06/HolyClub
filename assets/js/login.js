// Espera o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona os elementos principais que vamos manipular
  const container = document.getElementById('container');
  const goToSignUpBtn = document.getElementById('goToSignUp');
  const goToSignInBtn = document.getElementById('goToSignIn');

  // Verifica se os elementos existem na página antes de adicionar os eventos
  if (container && goToSignUpBtn && goToSignInBtn) {
    // Quando o botão "Cadastre-se" for clicado...
    goToSignUpBtn.addEventListener('click', () => {
      // ...remove a classe do modo login e adiciona a do modo cadastro.
      container.classList.remove('mode-sign-in');
      container.classList.add('mode-sign-up');
    });

    // Quando o botão "Entre" for clicado...
    goToSignInBtn.addEventListener('click', () => {
      // ...remove a classe do modo cadastro e adiciona a do modo login.
      container.classList.remove('mode-sign-up');
      container.classList.add('mode-sign-in');
    });
  }
});
