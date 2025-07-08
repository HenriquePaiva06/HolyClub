document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// ==========================================================================
// Lógica para o Sticky Header INTELIGENTE
// ==========================================================================

window.addEventListener('DOMContentLoaded', (event) => {
  // 1. Pega os elementos que vamos manipular (AGORA É O NAV)
  const navMenu = document.querySelector('.menu-principal');

  // 2. Guarda a posição inicial do MENU
  const stickyOffset = navMenu.offsetTop;

  // 3. Guarda a altura do MENU dinamicamente
  const navHeight = navMenu.offsetHeight;

  function handleScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    // 5. Compara a posição da rolagem com a posição inicial do MENU
    if (scrollPosition >= stickyOffset) {
      navMenu.classList.add('sticky');
      // Adiciona padding no topo do body para compensar a altura da NAV
      document.body.style.paddingTop = navHeight + 'px';
    } else {
      navMenu.classList.remove('sticky');
      document.body.style.paddingTop = '0';
    }
  }

  window.onscroll = () => {
    handleScroll();
  };
});

// ==========================================================================
// Lógica para Animação de Scroll (Scroll Reveal)
// ==========================================================================
window.addEventListener('DOMContentLoaded', (event) => {
  // O código do Sticky Header já está aqui dentro... pode deixar ele quieto.
  // Adicione o novo código abaixo dele.

  const elementsToReveal = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null, // Observa em relação à viewport
    threshold: 0.1 // Ativa quando 10% do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Se o elemento está visível na tela
      if (entry.isIntersecting) {
        // Adiciona a classe .visible para ativar a animação
        entry.target.classList.add('visible');
        // Para de observar este elemento para a animação não repetir
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Pede ao observador para "vigiar" cada um dos nossos elementos
  elementsToReveal.forEach((element) => {
    observer.observe(element);
  });
});
// ==========================================================================
