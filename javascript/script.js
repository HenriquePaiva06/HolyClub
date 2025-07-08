/* ==========================================================================
   EVENT LISTENER PRINCIPAL
   Garante que todo o código JavaScript só será executado após o carregamento
   completo da estrutura HTML da página (o DOM). Isso evita erros de "elemento
   não encontrado" caso o script tente manipular um elemento que ainda não existe.
   ========================================================================== */
window.addEventListener('DOMContentLoaded', (event) => {
  /* ==========================================================================
       FONTES DE DADOS (SINGLE SOURCE OF TRUTH)
       Centralizamos todas as informações dinâmicas do site em arrays de objetos.
       Isso separa os DADOS da APRESENTAÇÃO (HTML), um princípio fundamental
       do desenvolvimento web moderno que facilita a manutenção e escalabilidade.
       ========================================================================== */
  const celulasData = [
    {
      id: 1,
      nome: 'Priests',
      lider: 'Ana Clara',
      telefone: '11 95224-3776',
      instagramUser: '@priests.rlvb',
      instagramLink: 'https://www.instagram.com/priests.rlvb/',
      foto: 'img/priests.jpeg',
      paginaDetalhes: 'celula-priests.html',
      dia: 'Sábado'
    },
    {
      id: 2,
      nome: 'HopeLand',
      lider: 'Rodrigo',
      telefone: '11 99005-7554',
      instagramUser: '@hopeland.vb',
      instagramLink: 'https://www.instagram.com/hopeland.vb/',
      foto: 'img/hopeland.jpeg',
      paginaDetalhes: 'celula-hopeland.html',
      dia: 'Sábado'
    },
    {
      id: 3,
      nome: 'Burning House',
      lider: 'Jhow',
      telefone: '11 96126-4316',
      instagramUser: '@burninghouse.nc',
      instagramLink: 'https://www.instagram.com/burninghouse.nc/',
      foto: 'img/burninghouse.jpeg',
      paginaDetalhes: 'celula-burninghouse.html',
      dia: 'Sábado'
    }
  ];

  const eventosData = [
    {
      id: 1,
      data: '2025-07-11',
      titulo: 'Encontro com Deus',
      horario: '19:00',
      descricao: 'Um encontro especial para voce conhecer o amor de Deus.'
    },
    {
      id: 2,
      data: '2025-07-19',
      titulo: 'Batismo em Águas',
      horario: '18:00',
      descricao: 'Venha celebrar as novas vidas entregues para Jesus.'
    },
    {
      id: 3,
      data: '2025-07-25',
      titulo: 'Noite de Louvor',
      horario: '19:00',
      descricao: 'Uma noite dedicada ao louvor e adoração.'
    }
  ];

  /* ==========================================================================
       LÓGICA DO SMOOTH SCROLL (ROLAGEM SUAVE)
       Para links internos da página (ex: <a href="#sobre">).
       ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      // Previne o comportamento padrão do navegador de "pular" instantaneamente para a âncora.
      e.preventDefault();
      // Encontra o elemento alvo e rola a tela suavemente até ele.
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  /* ==========================================================================
       LÓGICA DO STICKY HEADER
       Faz com que a barra de navegação fixe no topo após rolar a página.
       ========================================================================== */
  const navMenu = document.querySelector('.menu-principal');
  // Verifica se o elemento de navegação existe na página antes de executar. Boa prática.
  if (navMenu) {
    const stickyOffset = navMenu.offsetTop; // Posição vertical inicial do menu.
    const navHeight = navMenu.offsetHeight; // Altura total do menu.

    function handleScroll() {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Compara a posição da rolagem com a posição inicial do menu.
      if (scrollPosition >= stickyOffset) {
        navMenu.classList.add('sticky');
        // Adiciona um padding ao corpo da página para compensar a altura do menu fixo, evitando que o conteúdo "pule" para baixo dele.
        document.body.style.paddingTop = navHeight + 'px';
      } else {
        navMenu.classList.remove('sticky');
        document.body.style.paddingTop = '0';
      }
    }
    // Atribui a função 'handleScroll' para ser executada a cada evento de rolagem da janela.
    window.onscroll = () => handleScroll();
  }

  /* ==========================================================================
       LÓGICA DA GALERIA LIGHTBOX
       Abre imagens em tela cheia ao serem clicadas.
       ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  function abrirLightbox(imageUrl) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = imageUrl; // Define a imagem a ser exibida.
      lightbox.style.display = 'flex'; // Mostra o container do lightbox.
    }
  }

  function fecharLightbox() {
    if (lightbox) {
      lightbox.style.display = 'none'; // Esconde o container do lightbox.
    }
  }

  // Adiciona os eventos de fechar apenas se os elementos existirem.
  if (closeBtn) closeBtn.addEventListener('click', fecharLightbox);
  if (lightbox) {
    // Permite fechar o lightbox clicando no fundo escuro, fora da imagem.
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        fecharLightbox();
      }
    });
  }

  /* ==========================================================================
       LÓGICA DO FILTRO E RENDERIZAÇÃO DAS CÉLULAS
       Cria o conteúdo das células dinamicamente e aplica filtros.
       ========================================================================== */
  const celulasContainer = document.querySelector('.celulas-container');
  const filtroBtns = document.querySelectorAll('.filtro-btn');

  // Função principal que recebe um array de dados e renderiza os cards na tela.
  function renderizarCelulas(arrayDeCelulas) {
    if (!celulasContainer) return; // Aborta se o container não for encontrado.

    celulasContainer.innerHTML = ''; // Limpa o conteúdo atual para evitar duplicatas.

    // Itera sobre cada objeto 'celula' no array de dados.
    arrayDeCelulas.forEach((celula) => {
      // Usa Template Literals (crases ``) para criar o bloco HTML de forma limpa e legível.
      const cardHtml = `
          <div class="celula reveal">
              <img class="foto-celula imagem-galeria" src="${celula.foto}" alt="Foto da Célula ${celula.nome}">
              <div class="conteudo-celula">
                  <div class="titulo-bloco"><h3>${celula.nome}</h3></div>
                  <div class="info-contato">
                      <p><i class="fa-solid fa-user"></i> <span>${celula.lider}</span></p>
                      <p><i class="fa-solid fa-phone"></i> <span>${celula.telefone}</span></p>
                  </div>
                  <a href="${celula.instagramLink}" target="_blank" class="link-instagram">
                      <i class="fa-brands fa-instagram"></i> <span>${celula.instagramUser}</span>
                  </a>
              </div>
              <a href="${celula.paginaDetalhes}" class="botao-vejamais">Veja Mais</a>
          </div>
        `;
      // Adiciona o card recém-criado ao container.
      celulasContainer.innerHTML += cardHtml;
    });

    // ** IMPORTANTE **: Após recriar os cards, os "ouvintes" de eventos antigos são perdidos.
    // Precisamos reconectar os eventos de Lightbox e Scroll Reveal aos novos elementos.
    conectarEventosGaleria();
    conectarObservadorScroll();
  }

  // Adiciona a lógica de clique para cada botão de filtro.
  filtroBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filtroBtns.forEach((b) => b.classList.remove('active')); // Limpa o estado ativo de todos.
      btn.classList.add('active'); // Ativa apenas o botão clicado.

      const filtro = btn.dataset.filtro; // Pega o valor do filtro (ex: "Sábado") do atributo data-filtro.

      if (filtro === 'Todos') {
        renderizarCelulas(celulasData); // Mostra todos os dados.
      } else {
        // Usa o método .filter() para criar um novo array apenas com os itens que passam no teste.
        const celulasFiltradas = celulasData.filter(
          (celula) => celula.dia === filtro
        );
        renderizarCelulas(celulasFiltradas);
      }
    });
  });

  /* ==========================================================================
       LÓGICA DO SCROLL REVEAL (ANIMAÇÃO AO ROLAR)
       Usa a Intersection Observer API para animar elementos quando eles entram na tela.
       ========================================================================== */
  // Cria uma única instância do observador para ser reutilizada.
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // 'isIntersecting' é true quando o elemento está visível.
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Adiciona a classe que dispara a animação CSS.
          observer.unobserve(entry.target); // Para de observar o elemento para não animar de novo.
        }
      });
    },
    { threshold: 0.1 } // A animação dispara quando 10% do elemento está visível.
  );

  // Função que aplica o observador aos elementos com a classe '.reveal'.
  function conectarObservadorScroll() {
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((element) => {
      observer.observe(element);
    });
  }

  /* ==========================================================================
       FUNÇÃO PARA CONECTAR EVENTOS NOS ITENS DINÂMICOS
       Essencial para garantir que o Lightbox funcione após a filtragem.
       ========================================================================== */
  function conectarEventosGaleria() {
    const galleryImages = document.querySelectorAll('.imagem-galeria');
    galleryImages.forEach((image) => {
      image.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que outros eventos de clique (como do card) sejam disparados.
        abrirLightbox(image.src);
      });
    });
  }

  // INICIALIZAÇÃO DA APLICAÇÃO
  renderizarCelulas(celulasData); // Renderiza as células pela primeira vez.

  /* ==========================================================================
       LÓGICA DO CALENDÁRIO
       ========================================================================== */
  const mesAnoTitulo = document.getElementById('mes-ano-titulo');
  const diasGrid = document.getElementById('dias-grid');
  let dataAtual = new Date(); // Inicia com a data atual.

  function renderizarCalendario() {
    if (!mesAnoTitulo || !diasGrid) return; // Aborta se os elementos do calendário não existirem.

    dataAtual.setDate(1); // Foca no primeiro dia do mês para cálculos.
    const primeiroDiaIndex = dataAtual.getDay(); // Dia da semana do dia 1 (0 = Dom).
    const diasNoMes = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth() + 1,
      0
    ).getDate();
    const ultimoDiaIndex = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      diasNoMes
    ).getDay();
    const diasProximoMes = 7 - ultimoDiaIndex - 1;

    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    mesAnoTitulo.innerHTML = `${
      meses[dataAtual.getMonth()]
    } ${dataAtual.getFullYear()}`;

    diasGrid.innerHTML = '';

    // Preenche os dias vazios no início do mês.
    for (let i = 0; i < primeiroDiaIndex; i++) {
      diasGrid.innerHTML += `<div class="dia-vazio"></div>`;
    }

    // Preenche os dias do mês.
    for (let i = 1; i <= diasNoMes; i++) {
      let classes = '';
      const hoje = new Date();
      if (
        i === hoje.getDate() &&
        dataAtual.getMonth() === hoje.getMonth() &&
        dataAtual.getFullYear() === hoje.getFullYear()
      ) {
        classes += ' hoje';
      }

      // Formata a data atual do loop como 'YYYY-MM-DD' para comparação.
      const dataFormatada = `${dataAtual.getFullYear()}-${String(
        dataAtual.getMonth() + 1
      ).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const eventoDoDia = eventosData.find(
        (evento) => evento.data === dataFormatada
      );

      if (eventoDoDia) {
        classes += ' dia-com-evento';
        // Adiciona um atributo 'data-evento-id' para sabermos qual evento mostrar ao clicar.
        diasGrid.innerHTML += `<div class="${classes.trim()}" data-evento-id="${
          eventoDoDia.id
        }">${i}</div>`;
      } else {
        diasGrid.innerHTML += `<div class="${classes.trim()}">${i}</div>`;
      }
    }

    // Preenche os dias vazios no final do mês.
    for (let i = 0; i < diasProximoMes; i++) {
      diasGrid.innerHTML += `<div class="dia-vazio"></div>`;
    }

    conectarEventosCalendario();
  }

  // Função que exibe os detalhes de um evento clicado.
  function mostrarDetalhesDoEvento(eventoId) {
    const evento = eventosData.find((e) => e.id == eventoId);
    const containerDetalhes = document.getElementById(
      'detalhes-evento-container'
    );
    if (evento && containerDetalhes) {
      containerDetalhes.innerHTML = `
          <h3>${evento.titulo}</h3>
          <p><strong>Horário:</strong> ${evento.horario}</p>
          <p>${evento.descricao}</p>
        `;
    }
  }

  // Conecta os cliques aos dias do calendário que têm eventos.
  function conectarEventosCalendario() {
    const diasComEvento = document.querySelectorAll('.dia-com-evento');
    diasComEvento.forEach((dia) => {
      dia.addEventListener('click', (e) => {
        document
          .querySelectorAll('.dia-ativo')
          .forEach((d) => d.classList.remove('dia-ativo'));
        e.currentTarget.classList.add('dia-ativo');
        mostrarDetalhesDoEvento(e.currentTarget.dataset.eventoId);
      });
    });
  }

  // Lógica dos botões de navegação do calendário.
  const btnAnterior = document.getElementById('mes-anterior');
  const btnSeguinte = document.getElementById('mes-seguinte');

  if (btnAnterior)
    btnAnterior.addEventListener('click', () => {
      dataAtual.setMonth(dataAtual.getMonth() - 1);
      renderizarCalendario();
    });

  if (btnSeguinte)
    btnSeguinte.addEventListener('click', () => {
      dataAtual.setMonth(dataAtual.getMonth() + 1);
      renderizarCalendario();
    });

  // Renderiza o calendário pela primeira vez.
  renderizarCalendario();
}); // FIM DO DOMCONTENTLOADED
